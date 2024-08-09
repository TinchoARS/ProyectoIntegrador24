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

  const handleCancel = () => {
    navigate('/');
  };

  if (!token) return <p>No estás autenticado. Redirigiendo a login...</p>;
  if (isLoadingCategories) return <p>Cargando categorías...</p>;
  if (isErrorCategories) return <p>Error al cargar categorías</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#34344e' }}>Editar Categoría</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="category" className="form-label" style={{ color: '#3a415a' }}>Seleccionar Categoría:</label>
            <select
              id="category"
              className="form-select"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              style={{ backgroundColor: '#89a7b1', borderColor: '#566981', color: '#34344e' }}
            >
              <option value="">Seleccionar una categoría</option>
              {categories.results.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCategoryId && (
            <form onSubmit={handleSubmit} className="p-4 shadow-sm rounded" style={{ backgroundColor: '#cbdad5' }}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label" style={{ color: '#3a415a' }}>Nombre:</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ backgroundColor: '#89a7b1', borderColor: '#566981', color: '#34344e' }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label" style={{ color: '#3a415a' }}>Descripción:</label>
                <textarea
                  id="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{ backgroundColor: '#89a7b1', borderColor: '#566981', color: '#34344e' }}
                />
              </div>
              <div className="text-center d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ backgroundColor: '#3a415a', borderColor: '#34344e' }}
                >
                  Actualizar Categoría
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  style={{ backgroundColor: '#566981', borderColor: '#3a415a' }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
