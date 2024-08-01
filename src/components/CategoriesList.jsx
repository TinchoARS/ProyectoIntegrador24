import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
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
                <Link to={`/seccion/${category.name}`}>
                            <Category name={category.name} description={category.description} />
                        </Link></li>
            ))}
            <li className="add-category">
              <Link to="/categories/new">
                Agregar Categoría
              </Link>
            </li>
          </ul>
        </div>
      );
                }
export default CategoriesList;
