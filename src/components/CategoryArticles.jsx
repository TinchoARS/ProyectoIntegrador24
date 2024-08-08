import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Link } from "react-router-dom";
import Comments from './Comments';

function CategoryArticles() {
    const { categoriaNombre } = useParams();
    const [category, setCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    const [categories, isErrorCategories, isLoadingCategories] = useFetch(
        "https://sandbox.academiadevelopers.com/infosphere/categories/?page=1"
    );

    useEffect(() => {
        if (categories && categories.results) {
            const category = categories.results.find(cat => cat.name.toLowerCase() === categoriaNombre.toLowerCase());
            if (category) {
                setCategory(category);
                const articlePromises = category.articles.map(articleId =>
                    fetch(`https://sandbox.academiadevelopers.com/infosphere/articles/${articleId}`)
                        .then(response => response.json())
                );
                Promise.all(articlePromises)
                    .then(articles => {
                        setArticles(articles);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching articles:', error);
                        setIsError('Error al cargar los artículos');
                        setIsLoading(false);
                    });
            } else {
                setIsError('Categoría no encontrada');
                setIsLoading(false);
            }
        }
    }, [categories, categoriaNombre]);

    if (isLoadingCategories) return <p>Cargando categorías...</p>;
    if (isErrorCategories) return <p>Error al cargar las categorías</p>;
    if (isLoading) return <p>Cargando artículos...</p>;
    if (isError) return <p>{isError}</p>;

    return (
        <div>
            <h1>Artículos de la categoría {categoriaNombre}</h1>
            <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-3">
            <li className="add-category bg-warning text-center rounded p-2">
                  <Link to={`/articles/new`}>
                      Agregar Articulo
                  </Link>
              </li>
            </ul>
             <ul>
                {articles.length > 0 ? (
                    articles.map(article => (
                        <li key={article.id}>
                            <li> {article.image && (
                               <img 
                               src={article.image} 
                               alt={article.title} 
                               style={{ width: '250px', height: '250px', objectFit: 'cover' }} 
                           />
                            )}</li>
                            {article.title}
                            <div>
                                <Link to={`/articles/edit/${article.id}`} className="btn btn-primary mx-1">
                                    Editar
                                </Link>
                                <Link to={`/articles/delete/${article.id}`} className="btn btn-danger mx-1">
                                    Eliminar
                                </Link>
                            </div>
                            <Comments articleId={article.id} />
                        </li>
                    ))
                ) : (
                    <p>No hay artículos para esta categoría.</p>
                )}
            </ul>
        </div>
    );
}

export default CategoryArticles;
