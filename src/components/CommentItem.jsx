// src/components/CommentItem.jsx
import React, { useState } from 'react';
import commentService from '../services/commentService';

function CommentItem({ comment, onCommentUpdated, onCommentDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to edit a comment.');
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
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to delete a comment.');
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
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
          <small>By {comment.author} on {new Date(comment.created_at).toLocaleString()}</small>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </li>
  );
}

export default CommentItem;
