import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { Button, Spinner, Alert } from "react-bootstrap";

export default function EliminarArticulo() {
    const { articleId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { token } = useAuth();

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
            navigate("/"); 
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1 style={{ color: "#3a415a" }}>Eliminar Artículo</h1>
            <p style={{ color: "#566981" }}>¿Estás seguro de que quieres eliminar este artículo?</p>
            <div className="mt-4">
                <Button variant="danger" onClick={handleDelete} disabled={loading} style={{ backgroundColor: "#34344e", borderColor: "#34344e" }}>
                    {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Eliminar Artículo"}
                </Button>
                <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2" style={{ backgroundColor: "#89a7b1", borderColor: "#89a7b1" }}>
                    Cancelar
                </Button>
            </div>
            {error && <Alert variant="danger" className="mt-3" style={{ backgroundColor: "#34344e", color: "#fff" }}>{error}</Alert>}
        </div>
    );
}
