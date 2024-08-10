import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { getProfileData, getUserStates } from "../services/authService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import defaultProfileImage from "../assets/default-profile.jpg";

// Paleta de colores
const colors = {
    color1: "#cbdad5",
    color2: "#89a7b1",
    color3: "#566981",
    color4: "#3a415a",
    color5: "#34344e",
};

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentState, setCurrentState] = useState(null);
    const [userStates, setUserStates] = useState([]);
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    const [profileData, statesData] = await Promise.all([
                        getProfileData(token),
                        getUserStates(token),
                    ]);
                    setProfile(profileData);
                    setUserStates(statesData.results);
                    const userState = statesData.results.find(
                        (state) => state.id === profileData.state
                    );
                    setCurrentState(userState || null);
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            } else {
                navigate("/login");
            }
        };

        fetchData();
    }, [token, navigate]);

    useEffect(() => {
        const handlePopState = (event) => {
            const storedToken = localStorage.getItem("token");
            if (!storedToken) {
                navigate("/login");
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        Swal.fire({
            title: '¡Éxito!',
            text: 'Perfil guardado correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfile((prevProfile) => ({
            ...prevProfile,
            image: URL.createObjectURL(file),
        }));
    };

    const handleStateChange = (e) => {
        const selectedStateId = parseInt(e.target.value);
        const selectedState = userStates.find(
            (state) => state.id === selectedStateId
        );
        setCurrentState(selectedState);
        setProfile((prevProfile) => ({
            ...prevProfile,
            state: selectedStateId,
        }));
    };

    const handleLogoutClick = () => {
        Swal.fire({
            title: '¿Está seguro?',
            text: '¿Desea cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
                navigate("/login");
            }
        });
    };

    const handleContinueClick = () => {
        navigate("/#Home");
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{backgroundColor: colors.color2, minHeight: '100vh', padding: '20px' }}>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm" style={{ backgroundColor: colors.color1 }}>
                            <div className="card-body d-flex align-items-center">
                                {isEditing ? (
                                    <form className="w-100">
                                        <div className="mb-3">
                                            <label className="form-label">Nombre:</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={profile.first_name}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Apellido:</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={profile.last_name}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Username:</label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={profile.username}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Email:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profile.email}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha de nacimiento:</label>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={profile.dob}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Biografía:</label>
                                            <textarea
                                                name="bio"
                                                value={profile.bio}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Imagen de perfil:</label>
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Estado:</label>
                                            <select
                                                name="state"
                                                value={profile.state || ""}
                                                onChange={handleStateChange}
                                                className="form-select"
                                            >
                                                <option value="">Seleccione un estado</option>
                                                {userStates.map((state) => (
                                                    <option key={state.id} value={state.id}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                style={{ backgroundColor: colors.color4, borderColor: colors.color4 }}
                                                onClick={handleSaveClick}
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                style={{ backgroundColor: colors.color3, borderColor: colors.color3 }}
                                                onClick={() => setIsEditing(false)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <img
                                            src={profile.image || defaultProfileImage}
                                            alt="Profile"
                                            className="img-thumbnail"
                                            style={{ width: "150px", marginRight: "20px", borderRadius: "50%" }}
                                        />
                                        <div>
                                            <h2 className="card-title" style={{ color: colors.color4 }}>
                                                {profile.first_name} {profile.last_name}
                                            </h2>
                                            <h4 className="card-subtitle mb-2 text-muted">@{profile.username}</h4>
                                            <p className="card-text">{profile.bio}</p>
                                            <ul className="list-unstyled">
                                                <li>
                                                    <strong>Fecha de nacimiento:</strong> {profile.dob}
                                                </li>
                                                <li>
                                                    <strong>Email:</strong> {profile.email}
                                                </li>
                                                <li>
                                                    <strong>Estado:</strong> {currentState ? currentState.name : 'En Línea'}
                                                    {currentState && currentState.icon && (
                                                        <img
                                                            src={currentState.icon}
                                                            alt={currentState.name}
                                                            style={{ width: "30px", marginLeft: "10px" }}
                                                        />
                                                    )}
                                                </li>
                                            </ul>
                                            <div className="d-flex gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{ backgroundColor: colors.color4, borderColor: colors.color4 }}
                                                    onClick={handleEditClick}
                                                >
                                                    Editar Perfil
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={handleLogoutClick}
                                                >
                                                    Salir
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"
                                                    style={{ backgroundColor: '#458d44', borderColor: '#458d44'}}
                                                    onClick={handleContinueClick}
                                                >
                                                    Continuar
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
