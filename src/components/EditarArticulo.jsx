import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function EditarArticulo() {
  const { articleId } = useParams();
  const [articleData, setArticleData] = useState({ title: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setArticleData({ title: data.title, content: data.content });
      })
      .catch((error) => console.error("Error al cargar artículo", error));
  }, [articleId]);

  function handleInputChange(event) {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        title: articleData.title,
        content: articleData.content,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo actualizar el artículo");
        }
        navigate("/articles");
      })
      .catch((error) => console.error("Error al actualizar el artículo", error))
      .finally(() => setSubmitting(false));
  }

  return (
    <div>
      <h2>Editar Artículo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={articleData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contenido</label>
          <textarea
            name="content"
            value={articleData.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={submitting}>
          Guardar Artículo
        </button>
      </form>

      {/* Botón para redirigir a la edición de categorías */}
      <button onClick={() => navigate(`/articles/${articleId}/edit-categories`)}>
        Editar categoría asociada
      </button>
    </div>
  );
}
