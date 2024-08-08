import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function EditArticleForm() {
  const { articleId } = useParams(); // Obtén el ID del artículo desde los parámetros de la URL
  const [articleData, setArticleData] = useState({ title: "", content: "" });
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // Para las categorías disponibles
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState(""); // Para la nueva categoría
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(null); // Para controlar qué categoría se está editando
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    // Cargar artículo
    fetch(
      `https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setArticleData({ title: data.title, content: data.content });
      })
      .catch((error) => console.error("Error al cargar artículo", error))
      .finally(() => setLoading(false));

    // Llamar a la API para obtener las categorías asociadas al artículo
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
        setCategories(categoriesWithNames); // Guardar las categorías con nombres en el estado
      })
      .catch((error) => console.error("Error al obtener categorías", error));

    // Cargar todas las categorías disponibles para la selección
    fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setAllCategories(data.results))
      .catch((error) =>
        console.error("Error al cargar todas las categorías", error)
      );
  }, [articleId, token]);

  function handleInputChange(event) {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  }

  function handleEditCategory(category) {
    setEditMode(category.id); // Activar el modo de edición para la categoría seleccionada
    setSelectedCategory(category.categoryId); // Preseleccionar la categoría actual
  }

  function handleCategorySelection(event) {
    setSelectedCategory(event.target.value);
  }

  function handleNewCategoryChange(event) {
    setNewCategory(event.target.value);
  }

  function handleSaveCategory() {
    if (editMode !== null && selectedCategory) {
      // Actualizar la categoría asociada al artículo
      fetch(
        `https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/categories/${editMode}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            article: Number(articleId),
            category: Number(selectedCategory),
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo actualizar la categoría");
          }
          return response.json();
        })
        .then(() => {
          // Actualizar la lista de categorías después de la modificación
          setCategories((prevCategories) =>
            prevCategories.map((cat) =>
              cat.id === editMode
                ? {
                    ...cat,
                    categoryId: selectedCategory,
                    categoryName: allCategories.find(
                      (c) => c.id === Number(selectedCategory)
                    ).name,
                  }
                : cat
            )
          );
          setEditMode(null);
          setSelectedCategory(null);
        })
        .catch((error) =>
          console.error("Error al actualizar la categoría:", error)
        );
    }
  }

  function handleAddCategory() {
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
    // Aquí hacemos la llamada a la API para eliminar la categoría
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

  function handleSubmit(event) {
    event.preventDefault();
    if (!submitting && !loading) {
      setSubmitting(true);
  
      fetch(
        `https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            title: articleData.title,
            content: articleData.content,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No se pudo actualizar el artículo");
          }
          return response.json();
        })
        .then(() => {
          console.log("Artículo actualizado correctamente");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error al actualizar el artículo:", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  }
  

  return (
    <div>
      <form
        className={`box m-4 p-4 has-background-dark`}
        onSubmit={handleSubmit}
      >
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
          <div className="control">
            <button
              className="button is-primary"
              type="submit"
              disabled={submitting || loading}
            >
              Actualizar Artículo
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2>Categorías Asociadas</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              ID: {category.id}, Article ID: {category.article}, Categoria ID:{" "}
              {category.categoryId}, Nombre: {category.categoryName}
              <button onClick={() => handleEditCategory(category)}>
                Editar
              </button>
              <button onClick={() => handleDeleteCategory(category)}>
                Eliminar
              </button>
              {editMode === category.id && (
                <div className="select is-fullwidth is-multiple">
                  <select
                    value={selectedCategory || ""}
                    onChange={handleCategorySelection}
                  >
                    <option value="">Selecciona una categoría</option>
                    {allCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleSaveCategory}>Guardar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
          <h3>Agregar Nueva Categoría</h3>
          <div className="select is-fullwidth">
            <select
              value={newCategory || ""}
              onChange={handleNewCategoryChange}
            >
              <option value="">Selecciona una categoría</option>
              {allCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddCategory}>Agregar Categoría</button>
        </div>
      </div>
    </div>
  );
}
