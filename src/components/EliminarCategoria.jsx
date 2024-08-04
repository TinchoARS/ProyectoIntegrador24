import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function EliminarCategoria() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    fetch('https://sandbox.academiadevelopers.com/infosphere/categories/')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.results);
        setLoadingCategories(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoadingCategories(false);
      });
  }, []);

  function handleDelete() {
    if (selectedCategoryId && !deleting) {
      setDeleting(true);
      fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${selectedCategoryId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error borrando category');
          }
          alert('Categoría eliminada con éxito');
          setCategories(categories.filter((cat) => cat.id !== selectedCategoryId));
          setSelectedCategoryId('');
        })
        .catch((error) => {
          console.error('Error:', error);
        })
        .finally(() => {
          setDeleting(false);
        });
    }
  }

  if (loadingCategories) return <p>Cargando...</p>;

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
            {categories.map((category) => (
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
