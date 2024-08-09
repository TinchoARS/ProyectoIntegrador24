import React, { useEffect, useState } from 'react';
import commentService from '../services/commentService';
import AddComment from './AddComment';
import CommentItem from './CommentItem';

function Comments({ articleId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = async () => {
    try {
      const data = await commentService.getCommentsByArticleId(articleId); // obtener comentarios por articulo
      setComments(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]); // actualizar los comentarios cuando cambie el id del articulo

  const handleCommentAdded = () => {
    fetchComments(); // refrescar los comentarios despues de añadir uno nuevo
  };

  const handleCommentUpdated = () => {
    fetchComments(); // refrescar los comentarios dspues de actualizar uno
  };

  const handleCommentDeleted = () => {
    fetchComments(); // refrescar los comentarios despues de eliminar uno
  };

  if (loading) {
    return <div>Cargando comentarios...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Comentarios</h2>
      <AddComment articleId={articleId} onCommentAdded={handleCommentAdded} />
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onCommentUpdated={handleCommentUpdated}
            onCommentDeleted={handleCommentDeleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default Comments;
