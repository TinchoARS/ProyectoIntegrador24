import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import commentService from '../services/commentService';
import { Button, Form, Alert } from 'react-bootstrap';

function CommentItem({ comment, onCommentUpdated, onCommentDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchAuthorName = async () => {
      try {
        const profile = await commentService.getUserProfile(comment.author, token);
        setAuthorName(`${profile.first_name} `);
      } catch (error) {
        setError('Failed to fetch author name');
      }
    };

    fetchAuthorName();
  }, [comment.author, token]);

  const handleUpdate = async () => {
    if (!token) {
      setError('Debes iniciar sesión para editar un comentario.');
      return;
    }

    try {
      await commentService.updateComment(token, comment.id, content, comment.article);
      setIsEditing(false);
      onCommentUpdated();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (!token) {
      setError('Debes iniciar sesión para eliminar un comentario.');
      return;
    }

    try {
      await commentService.deleteComment(token, comment.id);
      onCommentDeleted();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{backgroundColor:'white', borderRadius: '10px', padding: '10px'}}>
      <li style={{ listStyleType: 'none', padding: '10px 0', borderBottom: '1px solid #89a7b1' }}>
        {isEditing ? (
          <div>
            <Form.Control
              as="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ marginBottom: '10px', backgroundColor: '#cbdad5', color: '#3a415a' }}
            />
            <Button variant="primary" onClick={handleUpdate} style={{ marginRight: '5px', backgroundColor: '#566981', borderColor: '#566981' }}>
              Guardar
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)} style={{ backgroundColor: '#89a7b1', borderColor: '#89a7b1' }}>
              Cancelar
            </Button>
          </div>
        ) : (
          <div>
            <p style={{ color: '#3a415a' }}>{content}</p>
            <small style={{ color: '#566981' }}>
              Por {authorName || 'Cargando...'} el {new Date(comment.created_at).toLocaleString()}
            </small>
            {token && (
              <div className="mt-2">
                <Button variant="link" onClick={() => setIsEditing(true)} style={{ color: '#34344e', marginRight: '10px' }}>
                  Editar
                </Button>
                <Button variant="link" onClick={handleDelete} style={{ color: '#34344e' }}>
                  Eliminar
                </Button>
              </div>
            )}
          </div>
        )}
        {error && <Alert variant="danger" style={{ marginTop: '10px', backgroundColor: '#34344e', color: '#fff' }}>{error}</Alert>}
      </li>
    </div>
  );
}

export default CommentItem;
