import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { Form, Button, Spinner, Alert } from "react-bootstrap";

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
        fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/`, {})
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
        <div className="container mt-4">
            <h2 className="mb-4" style={{ color: "#3a415a" }}>Agregar nuevo artículo</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label style={{ color: "#566981" }}>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={articleData.title}
                        onChange={handleInputChange}
                        style={{ backgroundColor: "#cbdad5", color: "#3a415a" }}
                    />
                </Form.Group>
                <Form.Group controlId="formContent" className="mt-3">
                    <Form.Label style={{ color: "#566981" }}>Contenido</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                        style={{ backgroundColor: "#cbdad5", color: "#3a415a" }}
                    />
                </Form.Group>
                <Form.Group controlId="formImage" className="mt-3">
                    <Form.Label style={{ color: "#566981" }}>Imagen</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ backgroundColor: "#cbdad5", color: "#3a415a" }}
                    />
                </Form.Group>
                <Form.Group controlId="formCategories" className="mt-3">
                    <Form.Label style={{ color: "#566981" }}>Categorías</Form.Label>
                    <Form.Control
                        as="select"
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        style={{ backgroundColor: "#cbdad5", color: "#3a415a" }}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <div className="mt-4">
                    <Button variant="primary" type="submit" disabled={submitting || loadingCategories} style={{ backgroundColor: "#566981", borderColor: "#566981" }}>
                        {submitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Crear Artículo"}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2" style={{ backgroundColor: "#89a7b1", borderColor: "#89a7b1" }}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </div>
    );
}
