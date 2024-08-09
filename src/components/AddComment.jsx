import React, { useState } from 'react';
import commentService from '../services/commentService';
import useAuth from '../hooks/useAuth'; // Asegúrate de tener el hook useAuth
import { Form, Button, Alert } from 'react-bootstrap';

function AddComment({ articleId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Obtén el token de autenticación desde el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Debes iniciar sesión para agregar un comentario.');
      return;
    }

    try {
      await commentService.addComment(token, content, articleId);
      setContent('');
      onCommentAdded();
    } catch (error) {
      setError(error.message);
    }
  };

  if (!token) {
    return <p style={{ color: '#3a415a' }}>Debes iniciar sesión para agregar un comentario.</p>;
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="commentContent">
          <Form.Control
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Agrega tu comentario"
            required
            style={{ backgroundColor: '#cbdad5', color: '#3a415a' }}
          />
        </Form.Group>
        <Button type="submit" style={{ marginTop: '10px', backgroundColor: '#566981', borderColor: '#566981' }}>
          Agregar Comentario
        </Button>
      </Form>
      {error && <Alert variant="danger" style={{ marginTop: '10px', backgroundColor: '#34344e', color: '#fff' }}>{error}</Alert>}
    </div>
  );
}

export default AddComment;
