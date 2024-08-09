import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function NuevaCategoria() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirige si no está autenticado
    }
  }, [token, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!submitting) {
      setSubmitting(true);
      try {
        const response = await fetch('https://sandbox.academiadevelopers.com/infosphere/categories/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
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
  }

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ color: '#34344e' }}>Agregar Nueva Categoría</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
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
                disabled={!token}
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
                disabled={!token}
                style={{ backgroundColor: '#89a7b1', borderColor: '#566981', color: '#34344e' }}
              />
            </div>
            <div className="text-center d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting || !token}
                style={{ backgroundColor: '#3a415a', borderColor: '#34344e' }}
              >
                Agregar Categoría
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

export default NuevaCategoria;
