import React from "react";
import useFetch from "../hooks/useFetch";
import Category from "./Category";

function CategoriesList() {
    const [categories, isError, isLoading] = useFetch(
        "https://sandbox.academiadevelopers.com/infosphere/categories/");
    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar categorielist</p>;

    return (
        <div>
          <h2>Lista de Categorías</h2>
          <ul>
            {categories.results.map((category) => (
              <li key={category.id}>
                <Category name={category.name} description={category.description} />
              </li>
            ))}
          </ul>
        </div>
      );
                }
export default CategoriesList;
