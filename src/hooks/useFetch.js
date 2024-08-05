import { useEffect, useState } from "react";

function useFetch(url, options = {}) {
    const [data, setData] = useState();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
//prevenir logica innecesaria cuando no hay url valida
    useEffect(() => {
        if (!url) {
            setData(null);
            setIsLoading(false);
            return;
        }

        setData(null);
        setIsError(false);
        setIsLoading(true);
        fetch(url, { ...options })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error en la petición");
                }
                return res.json();
            })
            .then(setData)
            .catch((error) => {
                console.error("Error al realizar la petición:", error);
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url]);

    return [data, isError, isLoading];
}

export default useFetch;
