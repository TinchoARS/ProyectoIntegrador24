// src/components/AddComment.jsx
import React, { useState } from 'react';
import commentService from '../services/commentService';



function AddComment({ articleId = 80, onCommentAdded }) { // articleId = 80 cambiar cuando se agregue componente de articulos
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to add a comment.');
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
          placeholder="Add your comment"
          required
        />
        <button type="submit">Add Comment</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AddComment;
