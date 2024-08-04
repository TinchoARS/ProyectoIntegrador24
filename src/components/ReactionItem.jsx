// src/components/ReactionItem.jsx
import React, { useState } from 'react';
import reactionService from '../services/reactionService';

function ReactionItem({ reaction, onReactionUpdated, onReactionDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(reaction.name);
  const [description, setDescription] = useState(reaction.description);
  const [fontAwesomeIcon, setFontAwesomeIcon] = useState(reaction.font_awesome_icon);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Debes iniciar sesión para editar una reacción.');
      return;
    }

    try {
      await reactionService.updateReaction(token, reaction.id, name, description, fontAwesomeIcon);
      setIsEditing(false);
      onReactionUpdated();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Debes iniciar sesión para eliminar una reacción.');
      return;
    }

    try {
      await reactionService.deleteReaction(token, reaction.id);
      onReactionDeleted();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={fontAwesomeIcon}
            onChange={(e) => setFontAwesomeIcon(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{reaction.name} <i className={reaction.font_awesome_icon}></i></p>
          <p>{reaction.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {error && <div className="error">{error}</div>}
    </li>
  );
}

export default ReactionItem;
