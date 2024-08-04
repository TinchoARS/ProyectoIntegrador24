// src/components/AddReaction.jsx
import React, { useState } from 'react';
import reactionService from '../services/reactionService';

function AddReaction({ onReactionAdded }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fontAwesomeIcon, setFontAwesomeIcon] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Debes iniciar sesión para agregar una reacción.');
      return;
    }

    try {
      await reactionService.addReaction(token, name, description, fontAwesomeIcon);
      setName('');
      setDescription('');
      setFontAwesomeIcon('');
      onReactionAdded();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
        />
        <input
          type="text"
          value={fontAwesomeIcon}
          onChange={(e) => setFontAwesomeIcon(e.target.value)}
          placeholder="Font Awesome Icon"
        />
        <button type="submit">Agregar</button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default AddReaction;
