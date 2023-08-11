import '../styles/MusicPlayer.css';
import { useRef } from 'react';
import useProgress from '../hooks/useProgress';
import useContrast from "../hooks/useContrast"

const MusicPlayer = ({ cover, title, artists, colors, currentTime, duration, loading, volume }) => {
    const cardRef = useRef(null);
    const [volumen, setVolumen] = volume;
    const contrast = useContrast({ color: colors?.[0]?.hex });
    const progress = useProgress({ songDuration: duration, currentTime });


    return (
        <div className="musicPlayer__cont" ref={cardRef} style={{
            backgroundColor: colors ? colors[0].hex : null,
            boxShadow: colors ? `0 0 200px ${colors[0].hex}` : null,
        }}>
            <div className="musicPlayer__cover noselect">
                <div className='img load'>

                    <img
                        src={cover} alt={title}
                        className="noselect"
                    />

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
