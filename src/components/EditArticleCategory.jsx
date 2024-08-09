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
      navigate("/login"); // Redirige si no está autenticado
      return;
    }

    // Cargar categorías asociadas al artículo
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

    // Cargar todas las categorías disponibles
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
          // Actualizar la lista de categorías después de agregar
          setCategories((prevCategories) => [
            ...prevCategories,
            {
              id: Date.now(), // Generar un ID temporal hasta que se confirme la creación
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
        // Actualizar la lista de categorías después de eliminar
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== category.id)
        );
      })
      .catch((error) =>
        console.error("Error al eliminar la categoría:", error)
      );
  }

  return (
    <div>
      <h2>Editar Categorías Asociadas</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.categoryName}
            <button
              onClick={() => handleDeleteCategory(category)}
              disabled={!token}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Agregar Nueva Categoría</h3>
        <select
          value={newCategory}
          onChange={handleCategorySelection}
          disabled={!token}
        >
          <option value="">Selecciona una categoría</option>
          {allCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCategory}
          disabled={!token}
        >
          Agregar Categoría
        </button>
      </div>
    </div>
  );
}
