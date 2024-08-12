import React from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Category from "./Category";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import '../assets/CategorieList.css';
import useAuth from '../hooks/useAuth';

function CategoriesList() {
  const [categories, isError, isLoading] = useFetch(
    "https://sandbox.academiadevelopers.com/infosphere/categories/?page_size=50"
  );
  const { token } = useAuth();

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar categorías</p>;

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <h2 className="mb-4 text-center text-white">Lista de Categorías</h2>
        {categories.results.map((category) => (
          <Col key={category.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Link to={`/seccion/${category.name}`} className="category-link">
              <Category name={category.name} description={category.description} />
            </Link>
          </Col>
        ))}
        {token && (
          <>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Link to="/categories/new" className="btn btn-success w-50">
                Agregar Categoría
              </Link>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Link to="/categories/edit" className="btn btn-warning w-50">
                Editar Categoría
              </Link>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Link to="/categories/delete" className="btn btn-danger w-50">
                Eliminar Categoría
              </Link>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default CategoriesList;
