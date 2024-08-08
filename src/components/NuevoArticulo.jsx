import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

export default function ArticleForm() {
    const [articleData, setArticleData] = useState({ title: "", content: "" });
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [articleImage, setArticleImage] = useState(null);
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudieron cargar las categorías");
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data.results);
            })
            .catch((error) => {
                console.error("Error al realizar la petición", error);
            })
            .finally(() => {
                setLoadingCategories(false);
            });
    }, []);

    function handleInputChange(event) {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    }

    function handleCategoryChange(event) {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);
    }

    function handleImageChange(event) {
        setArticleImage(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting && !loadingCategories) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", articleData.title);
            newForm.append("content", articleData.content);
            if (articleImage) {
                newForm.append("image", articleImage);
            }

            fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo crear el artículo");
                    }
                    return response.json();
                })
                .then((data) => {
                    const categoryPromises = selectedCategories.map((categoryId) =>
                        fetch(`https://sandbox.academiadevelopers.com/infosphere/article-categories/`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Token ${token}`,
                            },
                            body: JSON.stringify({
                                article: data.id,
                                category: Number(categoryId),
                            }),
                        })
                    );

                    return Promise.all(categoryPromises);
                })
                .then((responses) => {
                    responses.forEach((response) => {
                        if (!response.ok) {
                            throw new Error("Error al asociar una categoría");
                        }
                    });
                    console.log("Categorías asociadas correctamente");
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error al crear el artículo:", error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    }

    return (
        <form className={`box m-4 p-4 has-background-dark`} onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Título</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        name="title"
                        value={articleData.title}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Contenido</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Imagen:</label>
                <div className="control">
                    <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Categorías:</label>
                <div className="select is-fullwidth is-multiple">
                    <select
                        multiple
                        size="5"
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-primary"
                        type="submit"
                        disabled={submitting || loadingCategories}
                    >
                        Crear Artículo
                    </button>
                </div>
            </div>
        </form>
    );
}