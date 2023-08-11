import { useEffect, useState } from "react";

function useVisible() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setVisible(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return visible;
}

export default useVisible;