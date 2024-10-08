// src/services/commentService.js
const API_URL = 'https://sandbox.academiadevelopers.com/infosphere/comments/';
const USERS_API_URL = 'https://sandbox.academiadevelopers.com/infosphere/users/';

const getComments = async (page = 3, pageSize = 10) => {
  const response = await fetch(`${API_URL}?page=${page}&page_size=${pageSize}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

const getCommentsByArticleId = async (articleId) => {
  const response = await fetch(`${API_URL}?article=${articleId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments for this article');
  }
  return response.json();
};

const addComment = async (token, content, article) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify({ content, article }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to add comment');
  }

  return response.json();
};

const updateComment = async (token, commentId, content, article) => {
  const response = await fetch(`${API_URL}${commentId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    },
    body: JSON.stringify({ content, article }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update comment');
  }

  return response.json();
};

const deleteComment = async (token, commentId) => {
  const response = await fetch(`${API_URL}${commentId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete comment');
  }
};

const getUserProfile = async (userId, token) => {
  const response = await fetch(`https://sandbox.academiadevelopers.com/users/profiles/${userId}/`, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};


export default {
  getComments,
  getCommentsByArticleId,
  addComment,
  updateComment,
  deleteComment,
  getUserProfile,
};
