// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'https://sandbox.academiadevelopers.com';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/api-auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Login failed');
  }

  const data = await response.json();
  return data.token;
};

export const getProfileData = async (token) => {
  const response = await fetch(`${API_URL}/users/profiles/profile_data/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile data');
  }

  return await response.json();
};

export const updateProfile = async (token, profileData, userId) => {
  const formData = new FormData();
  for (const key in profileData) {
    formData.append(key, profileData[key]);
  }

  const response = await fetch(`${API_URL}/users/profiles/${userId}/`, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return await response.json();
};
