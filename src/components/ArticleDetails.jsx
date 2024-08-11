import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import { Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import backArrow from '../assets/back.png';
import Reactions from './Reactions';  
import useAuth from "../hooks/useAuth";
function ArticleDetails() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [localReactions, setLocalReactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        // Fetch the article data
        const articleResponse = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${id}/`);
        if (!articleResponse.ok) {
          throw new Error('Error al cargar el artículo');
        }
        const articleData = await articleResponse.json();
        setArticle(articleData);
        const reactionsResponse = await fetch('https://sandbox.academiadevelopers.com/infosphere/reactions/');
        if (!reactionsResponse.ok) {
          throw new Error('Error al cargar las reacciones');
        }
        const reactionsData = await reactionsResponse.json();
        setLocalReactions(reactionsData.results);
        //hardcodeo
        const reactionsArticles = {
          count: 3,
          next: null,
          previous: null,
          results: [
            { id: 1, created_at: "2023-08-11T12:34:56Z", updated_at: "2023-08-11T12:34:56Z", article: 142, reaction: 1 },
            { id: 2, created_at: "2023-08-11T12:40:00Z", updated_at: "2023-08-11T12:40:00Z", article: 142, reaction: 2 },
            { id: 3, created_at: "2023-08-11T12:42:00Z", updated_at: "2023-08-11T12:42:00Z", article: 142, reaction: 2 }
          ]
        };

        // calculo suma de likes,dislikes
        const reactionCounts = reactionsArticles.results.reduce((acc, curr) => {
          const reactionType = curr.reaction;
          acc[reactionType] = (acc[reactionType] || 0) + 1;
          return acc;
        }, {});

        // añadir reacciones al estado
        setReactions(reactionCounts);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError('Error al cargar el artículo');
        setIsLoading(false);
      }
    };

    fetchArticleData();
  }, [id]);

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>Cargando artículo...</p>
      </div>
    </div>
  );

  if (isError) return <p>{isError}</p>;

  return (
    <div style={{ backgroundColor: '#566981', minHeight: '100vh', padding: '20px' }}>
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
            <div className="d-flex justify-content-around mt-4">
              {localReactions.map(reaction => (
                <Button key={reaction.id} variant="outline-primary" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={reaction.icon} alt={reaction.name} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                  {reactions[reaction.id] || 0} {reaction.name} 
                </Button>
              ))}
            </div>
            {token && (
            <Reactions articleId={article.id} />)}
            <Comments articleId={article.id} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ArticleDetails;
