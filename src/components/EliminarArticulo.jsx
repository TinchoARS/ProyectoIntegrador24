import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';

export default function EliminarArticulo() {
    const { articleId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth(); // Correctly using the hook

    const handleDelete = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}/`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el artículo');
            }

            console.log("Artículo eliminado correctamente");
            navigate("/"); // Redirigir a la página principal o donde sea necesario
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Eliminar Artículo</h1>
            <p>¿Estás seguro de que quieres eliminar este artículo?</p>
            <button
                className="button is-danger"
                onClick={handleDelete}
                disabled={loading}
            >
                {loading ? 'Eliminando...' : 'Eliminar Artículo'}
            </button>
            {error && <p className="has-text-danger">{error}</p>}
        </div>
    );
}
