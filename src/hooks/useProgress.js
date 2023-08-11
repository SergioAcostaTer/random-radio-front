import { useEffect, useState } from "react";

const useProgress = ({ songDuration, currentTime }) => {
    const [progress, setProgress] = useState(0); // Initialize progress to 0
    const [songCurrentTime, setSongCurrentTime] = useState(currentTime);

    useEffect(() => {
        // Reset progress and songCurrentTime when either songDuration or currentTime changes
        setProgress(0);
        setSongCurrentTime(currentTime);
    }, [songDuration, currentTime]);

    useEffect(() => {
        if (songDuration > 0) { // Ensure songDuration is positive before starting the interval
            const interval = setInterval(() => {
                const calculatedProgress = (songCurrentTime / songDuration) * 100;
                setProgress(calculatedProgress);

                // Increment songCurrentTime only if it's less than the songDuration
                if (songCurrentTime < songDuration) {
                    setSongCurrentTime(prevTime => prevTime + .01);
                }
            }, 10);

            return () => {
                clearInterval(interval);
            };
        }
    }, [songDuration, songCurrentTime]);

    return progress;
};

export default useProgress;