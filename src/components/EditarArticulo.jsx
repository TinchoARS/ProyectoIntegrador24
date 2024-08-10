import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

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

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres guardar los cambios en el artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        setSubmitting(true);

        if (!token) {
          alert("Debes estar autenticado para guardar el artículo.");
          setSubmitting(false);
          return;
        }

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
            Swal.fire({
              title: '¡Éxito!',
              text: 'El artículo ha sido actualizado.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              navigate(`/articles/${articleId}/`);
            });
          })
          .catch((error) => console.error("Error al actualizar el artículo", error))
          .finally(() => setSubmitting(false));
      }
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4" style={{ color: "#3a415a" }}>Editar Artículo</h2>
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
        <div className="mt-4">
          <Button variant="primary" type="submit" disabled={submitting || !token} style={{ backgroundColor: "#566981", borderColor: "#566981" }}>
            {submitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Guardar Artículo"}
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2" style={{ backgroundColor: "#89a7b1", borderColor: "#89a7b1" }}>
            Cancelar
          </Button>
        </div>
      </Form>
      {token && (
        <Button variant="link" onClick={() => navigate(`/articles/${articleId}/edit-categories`)} className="mt-3" style={{ color: "#34344e" }}>
          Editar categoría asociada
        </Button>
      )}
    </div>
  );
}
