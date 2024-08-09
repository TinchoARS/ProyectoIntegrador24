import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { Container, Row, Col, Image } from 'react-bootstrap';

function ArticleDetails() {
  const { id } = useParams(); // Obtiene el ID del artículo desde la URL
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar el artículo');
        }
        return response.json();
      })
      .then(data => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setIsError('Error al cargar el artículo');
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <p>Cargando artículo...</p>;
  if (isError) return <p>{isError}</p>;

  return (
    <Container>
      <Row className="my-4">
        <Col md={8} className="mx-auto">
          <h1>{article.title}</h1>
          <p><strong>Fecha de creación:</strong> {new Date(article.created_at).toLocaleDateString()}</p>
          <p><strong>Fecha de actualización:</strong> {new Date(article.updated_at).toLocaleDateString()}</p>
          {article.image && <Image src={article.image} alt={article.title} fluid />}
          <h3 className="mt-4">Copete</h3>
          <p>{article.abstract}</p>
          <h3>Contenido</h3>
          <p>{article.content}</p>
          {article.caption && (
            <>
              <h5>Epígrafe:</h5>
              <p>{article.caption}</p>
            </>
          )}
          <p><strong>Cantidad de vistas:</strong> {article.view_count}</p>
          <Comments articleId={article.id} />
        </Col>
      </Row>
    </Container>
  );
}

export default ArticleDetails;
