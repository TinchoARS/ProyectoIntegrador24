import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

export default function EditarCategoria() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories
  const [categories, isLoadingCategories, isErrorCategories] = useFetch(
    'https://sandbox.academiadevelopers.com/infosphere/categories/?page=3'
  );

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirige a login si no hay token
      return;
    }

    const fetchCategory = async () => {
      if (selectedCategoryId) {
        const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${selectedCategoryId}/`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setDescription(data.description);
        } else {
          console.error('Error al cargar la categoría');
        }
      }
    };
    fetchCategory();
  }, [selectedCategoryId, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting || !selectedCategoryId) return;

    setSubmitting(true);
    try {
      const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${selectedCategoryId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        alert('Categoría actualizada con éxito');
        navigate('/');
      } else {
        const errorText = await response.text();
        alert(`Error al actualizar la categoría: ${errorText}`);
      }
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) return <p>No estás autenticado. Redirigiendo a login...</p>;
  if (isLoadingCategories) return <p>Cargando categorías...</p>;
  if (isErrorCategories) return <p>Error al cargar categorías</p>;

  return (
    <div>
      <h1>Editar Categoría</h1>
      <label>
        Seleccionar Categoría:
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Seleccionar una categoría</option>
          {categories.results.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      {selectedCategoryId && (
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
          <button type="submit" disabled={submitting}>
            Actualizar Categoría
          </button>
        </form>
      )}
    </div>
  );
}
