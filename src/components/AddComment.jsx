import React, { useState } from 'react';
import commentService from '../services/commentService';
import useAuth from '../hooks/useAuth'; // Asegúrate de tener el hook useAuth

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
    return <p>Debes iniciar sesión para agregar un comentario.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Agrega tu comentario"
          required
        />
        <button type="submit">Agregar Comentario</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AddComment;
