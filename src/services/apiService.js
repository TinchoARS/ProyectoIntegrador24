const API_URL = 'https://sandbox.academiadevelopers.com';

const apiService = {
  listProfiles: async (state = null) => {
    const token = localStorage.getItem('token');
    let url = `${API_URL}/users/profiles/`;
    if (state) {
      url += `?state=${state}`;
    }
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error listing profiles:', error);
      throw error;
    }
  },

  getProfile: async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/users/profiles/${id}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },

  updateProfile: async (id, profileData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/users/profiles/${id}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  partialUpdateProfile: async (id, profileData) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/users/profiles/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error partially updating profile:', error);
      throw error;
    }
  }
};

export default apiService;
