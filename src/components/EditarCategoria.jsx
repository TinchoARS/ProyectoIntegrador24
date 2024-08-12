import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditarCategoria() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories
  const [categories, isLoadingCategories, isErrorCategories] = useFetch(
    'https://sandbox.academiadevelopers.com/infosphere/categories/?page_size=50'
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

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los cambios realizados en la categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3a415a',
      cancelButtonColor: '#566981',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
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
          Swal.fire({
            icon: 'success',
            title: '¡Categoría actualizada!',
            text: 'La categoría se ha actualizado con éxito.',
            confirmButtonColor: '#3a415a',
          }).then(() => {
            navigate('/');
          });
        } else {
          const errorText = await response.text();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Error al actualizar la categoría: ${errorText}`,
            confirmButtonColor: '#3a415a',
          });
        }
      } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al intentar actualizar la categoría.',
          confirmButtonColor: '#3a415a',
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Los cambios no guardados se perderán.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3a415a',
      cancelButtonColor: '#566981',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, continuar editando',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  if (!token) return <p>No estás autenticado. Redirigiendo a login...</p>;
  if (isLoadingCategories) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>Cargando categorías...</p>
      </div>
    </div>
  );
  if (isErrorCategories) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Spinner animation="border" role="status" />
        <p>Error al cargar categorías...</p>
      </div>
    </div>
  );

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
