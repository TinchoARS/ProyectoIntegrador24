import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';
import Swal from 'sweetalert2'; // Importa SweetAlert

export default function EliminarCategoria() {
  const { token } = useAuth();
  const navigate = useNavigate();
  
  // Fetch categories
  const [categories, isLoading, isError] = useFetch(
    'https://sandbox.academiadevelopers.com/infosphere/categories/?page_size=50'
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

        // Mostrar confirmación con SweetAlert
        Swal.fire({
          title: '¡Éxito!',
          text: 'Categoría eliminada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          setSelectedCategoryId('');
          navigate('/');
        });
      } catch (error) {
        console.error('Error:', error);
        // Mostrar error con SweetAlert
        Swal.fire({
          title: 'Error',
          text: `Error: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } finally {
        setDeleting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (!token) return <p>No estás autenticado. Redirigiendo a login...</p>;
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar categorías</p>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#34344e' }}>Eliminar Categoría</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="p-4 shadow-sm rounded" style={{ backgroundColor: '#cbdad5' }}>
            <div className="mb-3">
              <label htmlFor="category" className="form-label" style={{ color: '#3a415a' }}>
                Selecciona una categoría para eliminar:
              </label>
              <select
                id="category"
                className="form-select"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                style={{ backgroundColor: '#89a7b1', borderColor: '#566981', color: '#34344e' }}
              >
                <option value="" disabled>Selecciona una categoría</option>
                {categories.results.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting || !selectedCategoryId}
                style={{ backgroundColor: '#566981', borderColor: '#3a415a' }}
              >
                Eliminar Categoría
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
        </div>
      </div>
    </div>
  );
}
