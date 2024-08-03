// src/components/Comments.jsx
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
      const data = await commentService.getComments();
      setComments(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Comments</h2>
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
