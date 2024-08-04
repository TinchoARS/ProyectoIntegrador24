import React, {  useState } from 'react';
import useAuth from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom';

function NuevaCategoria(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { token } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!submitting) {
      setSubmitting(true);
    try {
      const response = await fetch('https://sandbox.academiadevelopers.com/infosphere/categories/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Token ${token}`
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        alert('Categoría agregada con éxito');
        setName('');
        setDescription('');
        navigate('/');
      } else {
        alert('Error al agregar categoría');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
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
            //se dispara cada que el valor del campo cambia 
            //el estado descripcion se actualizara con el valor actual del
            //campo de entrada
            required
          />
        </label>
        <button type="submit" disabled={submitting}>Agregar Categoría</button>
      </form>
    </div>
  );
};

export default NuevaCategoria;
