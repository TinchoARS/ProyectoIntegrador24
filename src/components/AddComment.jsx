import React, { useState } from 'react';
import commentService from '../services/commentService';

function AddComment({ articleId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

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
