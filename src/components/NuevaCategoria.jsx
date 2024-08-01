import React, { useState } from 'react';

const NuevaCategoria = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://sandbox.academiadevelopers.com/infosphere/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        alert('Categoría agregada con éxito');
        setName('');
        setDescription('');
      } else {
        alert('Error al agregar categoría');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Agregar Nueva Categoría</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar Categoría</button>
      </form>
    </div>
  );
};

export default NuevaCategoria;
