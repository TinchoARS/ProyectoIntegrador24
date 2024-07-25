const API_URL = 'https://sandbox.academiadevelopers.com/api-auth/';

const login = async (username, password) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar sesion');
  }

  const data = await response.json();

  if (data.token) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  return data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};
