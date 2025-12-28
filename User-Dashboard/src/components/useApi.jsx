import React, { useEffect, useState } from 'react'

function useApi(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Http error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
                setError(null)
            } catch (err) {
                setError(err.message)
                setData(null) 
            }
            finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url])

    return { data, loading, error }
}

export default useApi