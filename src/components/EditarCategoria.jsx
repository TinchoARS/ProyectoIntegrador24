import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function EditarCategoria() {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingCategory, setLoadingCategory] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch('https://sandbox.academiadevelopers.com/infosphere/categories/')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.results);
                setLoadingCategories(false);
            })
            .catch((error) => console.error('Error al cargar las categorías:', error));
    }, []);

    useEffect(() => {
        if (selectedCategoryId) {
            setLoadingCategory(true);
            fetch(`https://sandbox.academiadevelopers.com/infosphere/categories/${selectedCategoryId}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setSelectedCategory(data);
                    setName(data.name);
                    setDescription(data.description);
                    setLoadingCategory(false);
                })
                .catch((error) => console.error('Error al cargar la categoría:', error));
        }
    }, [selectedCategoryId, token]);

    async function handleSubmit(e) {
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
                alert('Error al actualizar la categoría');
            }
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
        } finally {
            setSubmitting(false);
        }
    }

    if (loadingCategories) return <p>Cargando categorías...</p>;
    if (loadingCategory) return <p>Cargando categoría...</p>;

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
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>

            {selectedCategory && (
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
