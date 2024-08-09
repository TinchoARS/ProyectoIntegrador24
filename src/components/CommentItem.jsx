import React, { useState } from 'react';
import useAuth from '../hooks/useAuth'; // Asegúrate de tener el hook useAuth
import commentService from '../services/commentService';

function CommentItem({ comment, onCommentUpdated, onCommentDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Obtén el token de autenticación desde el contexto

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
    <li>
      {isEditing ? (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
          <small>Por {comment.author} el {new Date(comment.created_at).toLocaleString()}</small>
          {token && (
            <>
              <button onClick={() => setIsEditing(true)}>Editar</button>
              <button onClick={handleDelete}>Eliminar</button>
            </>
          )}
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </li>
  );
}

export default CommentItem;
