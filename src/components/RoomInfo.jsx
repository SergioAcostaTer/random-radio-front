import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import getContrastColor from "../services/getContrastColor";
import "../styles/RoomInfo.css";

function RoomInfo({ roomInfo, refreshDeleteChat }) {
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(0); // Progress state
    const [currentTime, setCurrentTime] = useState(0); // Current time state
    const navigate = useNavigate();

    useEffect(() => {
        // const socket = io("http://localhost:3000/" + roomInfo.roomName);
        const socket = io("https://random-radio-back.onrender.com/" + roomInfo.roomName);

        const handleSongDetails = (song) => {
            setData(song);
            setCurrentTime(song.currentTime);
            console.log(song.currentTime);
        };

        socket.on("songDetails", handleSongDetails);

        return () => {
            socket.off("songDetails", handleSongDetails);
        };


    }, [roomInfo]);

    // Calculate progress when data changes

    // Update progress every second
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((currentTime / data?.duration) * 100);
            setCurrentTime(currentTime + 0.05);
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, [data, currentTime]);

    

    return (
        <>
            {data ? (
                <div onClick={() => {
                    refreshDeleteChat();
                    if (window.location.pathname !== `/${roomInfo?.roomName}`) {
                        navigate(`/${roomInfo?.roomName}`);
                    }
                }} className="infoContainer" style={{ backgroundColor: data?.colors[0]?.hex }}>
                    <h1 className="roomTitle"
                        style={{
                            color: getContrastColor(data?.colors[0]?.hex)[0]
                        }}
                    
                    >{roomInfo?.title}</h1>

                    <div className="titlesCont noselect">
                        <img className="noselect" src={data?.cover} alt={data?.name} />
                        <div className="text">
                            <p className="title noselect" style={{ color: getContrastColor(data?.colors[0]?.hex)[0] }}>{data?.name}</p>
                            <p className="author noselect" style={{ color: getContrastColor(data?.colors[0]?.hex)[0] }}>{data?.artists ? data.artists[0] : null}</p>
                        </div>
                    </div>

                    <div className="progressCont" style={{ backgroundColor: getContrastColor(data?.colors[0]?.hex)[1] }}>
                        <div className="progressBar" style={{ width: `${progress}%`, backgroundColor: getContrastColor(data?.colors[0]?.hex)[0] }}>
                        </div>
                    </div>

                </div>
            ) : (
                <p>No song currently playing.</p>
            )}

            {/* {data && (
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            )} */}
        </>
    );
}

export default RoomInfo;
