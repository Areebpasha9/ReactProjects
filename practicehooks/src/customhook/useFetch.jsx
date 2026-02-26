import React, { useEffect, useState } from 'react'

export default function useFetch(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(url).then(res => {
            if (!res.ok) {
                throw new Error("Failed to load ata from url")
            }
            return res.json();
        }).then(result => setData(result));
    }, [url])

    return (
        { data }

    )
}
