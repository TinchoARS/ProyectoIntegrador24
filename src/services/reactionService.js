// src/services/reactionService.js
const API_URL = 'https://sandbox.academiadevelopers.com/infosphere/reactions/';

const getReactions = async (page = 1, pageSize = 10) => {
  const response = await fetch(`${API_URL}?page=${page}&page_size=${pageSize}`);
  if (!response.ok) {
    throw new Error('Failed to fetch reactions');
  }
  return response.json();
};

const addReaction = async (token, name, description = '', fontAwesomeIcon = '') => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify({ name, description, font_awesome_icon: fontAwesomeIcon }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Fallo al agregar reacción');
  }

  return response.json();
};

const updateReaction = async (token, reactionId, name, description = '', fontAwesomeIcon = '') => {
  const response = await fetch(`${API_URL}${reactionId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify({ name, description, font_awesome_icon: fontAwesomeIcon }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Fallo al actualizar reacción');
  }

  return response.json();
};

const deleteReaction = async (token, reactionId) => {
  const response = await fetch(`${API_URL}${reactionId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Fallo al eliminar reacción');
  }
};

export default {
  getReactions,
  addReaction,
  updateReaction,
  deleteReaction,
};
