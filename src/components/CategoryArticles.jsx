import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import Header from './Header';
import SubHeader from './SubHeader';
import '../assets/CategoryArticles.css';
import useAuth from '../hooks/useAuth';
import defaultImage from '../assets/default-image.jpg';

function CategoryArticles() {
  const { categoriaNombre } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [isSubheaderVisible, setSubheaderVisible] = useState(false);
  const { token } = useAuth(); // Obtener el token para verificar autenticación

  const handleMouseEnter = () => setSubheaderVisible(true);
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!document.querySelector('.subHeader:hover')) {
        setSubheaderVisible(false);
      }
    }, 100);
  };

  const [categories, isErrorCategories, isLoadingCategories] = useFetch(
    "https://sandbox.academiadevelopers.com/infosphere/categories/?page_size=50"
  );

  useEffect(() => {
    if (categories && categories.results) {
      const category = categories.results.find(
        cat => cat.name.toLowerCase() === categoriaNombre.toLowerCase()
      );
      if (category) {
        setCategory(category);
        const articlePromises = category.articles.map(articleId =>
          fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}`).then(response =>
            response.json()
          )
        );
        Promise.all(articlePromises)
          .then(articles => {
            setArticles(articles);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching articles:', error);
            setIsError('Error al cargar los artículos');
            setIsLoading(false);
          });
      } else {
        setIsError('Categoría no encontrada');
        setIsLoading(false);
      }
    }
  }, [categories, categoriaNombre]);

  if (isLoadingCategories) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <Spinner animation="border" role="status" />
    <p>Cargando categorías...</p>
    </div>
  </div>
  )
  if (isErrorCategories) return <p>Error al cargar las categorías</p>;
  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <Spinner animation="border" role="status" />
      <p>Cargando artículos...</p>
      </div>
    </div>
  );
  if (isError) return <p>{isError}</p>;

  return (
    <div>
      <div className="home-container">
        <Header 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        />
        <SubHeader 
          isVisible={isSubheaderVisible} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        />
        <Container>
          <h1 className="text-center my-4 color3">Artículos de la categoría {categoriaNombre}</h1>
          {token && ( // Mostrar el botón "Agregar Artículo" solo si el usuario está autenticado
            <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3">
              <li className="add-category bg-warning text-center rounded p-2">
                <Link to={`/articles/new`}>
                  Agregar Artículo
                </Link>
              </li>
            </ul>
          )}
          <Row className="article-list">
            {articles.length > 0 ? (
              articles.map(article => (
                <Col key={article.id} md={6} lg={4} className="mb-4">
                  <div className="article-card bg-light p-3 border rounded">
                    <Image
                      src={article.image || defaultImage}
                      alt={article.title}
                      className="article-image mb-2"
                      fluid
                    />
                    <Link to={`/articles/${article.id}`}>
                      <h5 className="color4">{article.title}</h5>
                    </Link>
                    {token && ( // Mostrar los botones "Editar" y "Eliminar" solo si el usuario está autenticado
                      <div>
                        <Link to={`/articles/edit/${article.id}`} className="btn btn-primary mx-1">
                          Editar
                        </Link>
                        <Link to={`/articles/delete/${article.id}`} className="btn btn-danger mx-1">
                          Eliminar
                        </Link>
                      </div>
                    )}
                  </div>
                </Col>
              ))
            ) : (
              <p className="text-center">No hay artículos para esta categoría.</p>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CategoryArticles;
