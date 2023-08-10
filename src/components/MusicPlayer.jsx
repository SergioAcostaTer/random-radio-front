import '../styles/MusicPlayer.css';
import { useEffect, useRef, useState } from 'react';
import getContrastColor from "../services/getContrastColor";

const MusicPlayer = ({ cover, title, artists, colors, currentTime, duration, loading, volume }) => {
    const [progress, setProgress] = useState(0);
    const [actualTime, setActualTime] = useState(0);
    const cardRef = useRef(null);
    const [contrast, setContrast] = useState(""); // Contrast color
    const [volumen, setVolumen] = volume;

    useEffect(() => {
        setActualTime(currentTime);

        const interval = setInterval(() => {
            setActualTime(prevTime => prevTime + 0.05); // Increment the actualTime
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [currentTime, duration]);

    useEffect(() => {
        setProgress((actualTime / duration) * 100); // Calculate the progress based on updated actualTime
    }, [actualTime, duration]);

    useEffect(() => {
        setContrast(getContrastColor(colors ? colors[0].hex : "")); // Get the contrast color
    }, [colors]);

    return (
        <div className="musicPlayer__cont" ref={cardRef} style={{
            backgroundColor: colors ? colors[0].hex : null,
            boxShadow: colors ? `0 0 200px ${colors[0].hex}` : null,
        }}>
            <div className="musicPlayer__cover noselect">
                <div className='img load'>
                    <img className='noselect' src={cover} alt={title} />
                </div>
                <div className='wave-ani'>
                    <div className={loading ? "loading-off" : "loading"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="musicPlayer__info">
                <p style={{
                    color: contrast ? contrast[0] : null,
                }} className="musicPlayer__title">{title}</p>
                <p style={{
                    color: contrast ? contrast[0] : null,
                }} className="musicPlayer__author">
                    {
                        artists ? artists.map((artist, index) => {
                            return index === artists.length - 1 ? artist : artist + ", ";
                        }) : null
                    }
                    .
                </p>

                <div className="wrapper">
                    <p className='menos'>-</p>
                    <input type="range"
                        min="0"
                        max="100"
                        value={volumen}
                        style={{
                            zIndex: 100000,
                        }}
                        onChange={(e) => {
                            const newVolume = e.target.value;
                            setVolumen(newVolume);
                            console.log(newVolume);
                        }} />
                    <p className='mas'>+</p>
                </div>

                <div className="musicPlayer__progress" style={{
                    backgroundColor: contrast ? contrast[0] : "",
                }}>
                    <div className="musicPlayer__progress__bar" style={{ width: `${progress}%`, backgroundColor: contrast ? contrast[1] : null }}></div>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
