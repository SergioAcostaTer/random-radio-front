import { useState, useEffect } from 'react';


function useLoading() {
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);


    useEffect(() => {
        const loaderTimeout = setTimeout(() => {

            if (!loading) {
                setShowLoader(false);
            }

        }, 300); // 0.5 seconds delay

        return () => {
            clearTimeout(loaderTimeout); // Clear the timeout if the component unmounts
        };
    }, [loading]);

    return [loading, showLoader, setLoading];
}

export default useLoading;