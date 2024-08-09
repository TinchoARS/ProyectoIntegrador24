// api.js
const API_URL = 'https://sandbox.academiadevelopers.com/api-auth/';



// Función para obtener noticias
const getNews = async () => {
  try {
    const response = await fetch(API_URL, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        //'X-CSRFToken': 'CEhz45mnR9JkSSryhfoUHapyNfh6vL3dnQRlTSzmx6DymTk2doC2DmWoGvwzSyqv',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener las noticias');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

const getNewsDetail = async (articleId) => {
    try {
      const response = await fetch(`${API_URL}${articleId}/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': 'CEhz45mnR9JkSSryhfoUHapyNfh6vL3dnQRlTSzmx6DymTk2doC2DmWoGvwzSyqv',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el detalle de la noticia');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching news detail:', error);
      throw error;
    }
  };
  

// Exportar las funciones
export{
  getNews,
  getNewsDetail,
};