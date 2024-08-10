import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function EditArticleCategory() {
  const { articleId } = useParams();
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(
      `https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/categories/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then(async (data) => {
        const categoryPromises = data.results.map(async (category) => {
          const categoryResponse = await fetch(
            `https://sandbox.academiadevelopers.com/infosphere/categories/${category.category}/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          const categoryData = await categoryResponse.json();
          return {
            id: category.id,
            article: category.article,
            categoryId: category.category,
            categoryName: categoryData.name,
          };
        });

        const categoriesWithNames = await Promise.all(categoryPromises);
        setCategories(categoriesWithNames);
      })
      .catch((error) => console.error("Error al obtener categorías", error));

    fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAllCategories(data.results))
      .catch((error) => console.error("Error al cargar todas las categorías", error));
  }, [articleId, token, navigate]);

  function handleCategorySelection(event) {
    setNewCategory(event.target.value);
  }

  function handleAddCategory() {
    if (!token) {
      alert("Debes iniciar sesión para agregar una categoría.");
      return;
    }

    if (newCategory) {
      fetch(
        `https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/categories/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            article: Number(articleId),
            category: Number(newCategory),
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo agregar la categoría");
          }
          return response.json();
        })
        .then(() => {
          setCategories((prevCategories) => [
            ...prevCategories,
            {
              id: Date.now(),
              article: articleId,
              categoryId: newCategory,
              categoryName: allCategories.find(
                (c) => c.id === Number(newCategory)
              ).name,
            },
          ]);
          setNewCategory("");
        })
        .catch((error) =>
          console.error("Error al agregar la categoría:", error)
        );
    }
  }

  function handleDeleteCategory(category) {
    if (!token) {
      alert("Debes iniciar sesión para eliminar una categoría.");
      return;
    }

    fetch(
      `https://sandbox.academiadevelopers.com/infosphere/articles/${category.article}/categories/${category.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo eliminar la categoría");
        }
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== category.id)
        );
      })
      .catch((error) =>
        console.error("Error al eliminar la categoría:", error)
      );
  }

  function handleAccept() {
    // Aquí puedes realizar cualquier acción adicional antes de navegar
    navigate(-1); // Volver a la pestaña anterior
  }

  return (
    <div
      className="container mt-4"
      style={{ backgroundColor: "#cbdad5", padding: "20px", borderRadius: "8px" }}
    >
      <h2 className="mb-4" style={{ color: "#3a415a" }}>
        Editar Categorías Asociadas
      </h2>
      <ul className="list-group mb-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#89a7b1", color: "#3a415a" }}
          >
            {category.categoryName}
            <button
              className="btn btn-danger btn-sm"
              style={{ backgroundColor: "#34344e", color: "#ffffff" }}
              onClick={() => handleDeleteCategory(category)}
              disabled={!token}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <h3 style={{ color: "#3a415a" }}>Agregar Nueva Categoría</h3>
        <div className="input-group mb-3">
          <select
            className="form-select"
            value={newCategory}
            onChange={handleCategorySelection}
            disabled={!token}
            style={{ backgroundColor: "#566981", color: "#ffffff" }}
          >
            <option value="">Selecciona una categoría</option>
            {allCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary"
            onClick={handleAddCategory}
            disabled={!token}
            style={{ backgroundColor: "#3a415a", color: "#ffffff" }}
          >
            Agregar Categoría
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary me-2"
          onClick={() => navigate(-1)}
          style={{ backgroundColor: "#34344e", color: "#ffffff" }}
        >
          Cancelar
        </button>
        <button
          className="btn btn-primary"
          onClick={handleAccept}
          style={{ backgroundColor: "#3a415a", color: "#ffffff" }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
