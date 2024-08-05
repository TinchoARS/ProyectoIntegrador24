import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Category from "./Category";
import 'bootstrap/dist/css/bootstrap.min.css';

function CategoriesList() {
  const [categories, isError, isLoading] = useFetch(
      "https://sandbox.academiadevelopers.com/infosphere/categories/?page=1");
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar categorielist</p>;

  return (
      <div className="categories-list text-white p-3" style={{ backgroundColor: '#89a7b1' }}>
          <h2 className="text-center">Lista de Categorías</h2>
          <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3">
              {categories.results.map((category) => (
                  <li key={category.id} className="category-item bg-light border rounded p-2">
                      <Link to={`/seccion/${category.name}`} className="text-decoration-none" style={{color: 'black'}}>
                          <Category name={category.name} description={category.description} />
                      </Link>
                  </li>
              ))}
              <li className="add-category bg-warning text-center rounded p-2">
                  <Link to="/categories/new" className="text-decoration-none text-dark">
                      Agregar Categoría
                  </Link>
              </li>
              <li className="add-category bg-warning text-center rounded p-2">
                  <Link to="/categories/edit" className="text-decoration-none text-dark">
                      Editar Categoría
                  </Link>
              </li>
              <li className="add-category bg-warning text-center rounded p-2">
                  <Link to="/categories/delete" className="text-decoration-none text-dark">
                      Eliminar Categoría
                  </Link>
              </li>
          </ul>
      </div>
  );
}

export default CategoriesList;