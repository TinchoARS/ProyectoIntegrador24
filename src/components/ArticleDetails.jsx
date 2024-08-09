import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import  backArrow  from '../assets/back.png';

function ArticleDetails() {
  const { id } = useParams(); // Obtiene el ID del artículo desde la URL
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

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
  <div style={{backgroundColor: '#566981', minHeight: '100vh', padding: '20px'}}>
    <Container className="mt-4" style={{ backgroundColor: '#cbdad5', padding: '20px', borderRadius: '8px' }}>
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
        <Button variant="link" className="text-decoration-none" onClick={() => navigate(-1)} style={{ color: '#566981' }}>
          <img src={backArrow} alt="Back" style={{ width: '20px', height: '20px' }} /> Volver
        </Button>
          <h1 style={{ color: '#34344e' }}>{article.title}</h1>
          <p style={{ color: '#3a415a' }}>
            <strong>Fecha de creación:</strong> {new Date(article.created_at).toLocaleDateString()}
          </p>
          <p style={{ color: '#3a415a' }}>
            <strong>Fecha de actualización:</strong> {new Date(article.updated_at).toLocaleDateString()}
          </p>
          {article.image && <Image src={article.image} alt={article.title} fluid className="mb-4" />}
          <h3 className="mt-4" style={{ color: '#34344e' }}>Copete</h3>
          <p style={{ color: '#566981' }}>{article.abstract}</p>
          <h3 style={{ color: '#34344e' }}>Contenido</h3>
          <p style={{ color: '#566981' }}>{article.content}</p>
          {article.caption && (
            <>
              <h5 style={{ color: '#34344e' }}>Epígrafe:</h5>
              <p style={{ color: '#566981' }}>{article.caption}</p>
            </>
          )}
          <p style={{ color: '#3a415a' }}>
            <strong>Cantidad de vistas:</strong> {article.view_count}
          </p>
          <Comments articleId={article.id} />
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default ArticleDetails;
