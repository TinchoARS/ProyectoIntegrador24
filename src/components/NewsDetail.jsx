// NewsDetail.jsx
import React, { useEffect, useState } from 'react';
import { getNewsDetail } from '../services/api'; // Importar de manera nombrada
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNewsDetail(id) // Usar la función importada de manera nombrada
      .then(setArticle)
      .catch(setError);
  }, [id]);

  if (error) return <div>Error: {error.message}</div>;
  if (!article) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{article.title}</h1>
      <img src={article.imageUrl} alt={article.title} className="img-fluid" />
      <p>{article.content}</p>
    </div>
  );
};

export default NewsDetail;