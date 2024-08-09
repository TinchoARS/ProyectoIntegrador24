import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

export default function EliminarCategoria() {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  // Fetch categories
  const [categories, isLoading, isError] = useFetch(
    'https://sandbox.academiadevelopers.com/infosphere/categories/?page=3'
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (selectedCategoryId && !deleting) {
      setDeleting(true);
      try {
        const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${selectedCategoryId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Error al eliminar la categoría');
        }

        alert('Categoría eliminada con éxito');
        setSelectedCategoryId('');
        navigate('/');
      } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      } finally {
        setDeleting(false);
      }
    }
  };

  if (!token) return <p>No estás autenticado. Redirigiendo a login...</p>;
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar categorías</p>;

  return (
    <div>
      <h1>Eliminar Categoría</h1>
      <form>
        <label>
          Selecciona una categoría para eliminar:
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="" disabled>Selecciona una categoría</option>
            {categories.results.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting || !selectedCategoryId}
        >
          Eliminar Categoría
        </button>
      </form>
    </div>
  );
}
