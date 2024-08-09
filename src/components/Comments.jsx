import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Spinner, Alert } from 'react-bootstrap';
import commentService from '../services/commentService';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const data = await commentService.getCommentsByArticleId(articleId);
      setComments(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleCommentAdded = () => {
    fetchComments();
  };

  const handleCommentUpdated = () => {
    fetchComments();
  };

  const handleCommentDeleted = () => {
    fetchComments();
  };

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" role="status" style={{ color: '#3a415a' }}>
          <span className="visually-hidden">Cargando comentarios...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger" style={{ color: '#fff', backgroundColor: '#566981', borderColor: '#3a415a' }}>
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Row>
        <Col md={8} className="mx-auto">
          <h2 style={{ color: '#34344e' }}>Comentarios</h2>
          <AddComment articleId={articleId} onCommentAdded={handleCommentAdded} />
          <ListGroup variant="flush" className="mt-3">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id} style={{ backgroundColor: '#cbdad5', color: '#3a415a' }}>
                <CommentItem
                  comment={comment}
                  onCommentUpdated={handleCommentUpdated}
                  onCommentDeleted={handleCommentDeleted}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Comments;
