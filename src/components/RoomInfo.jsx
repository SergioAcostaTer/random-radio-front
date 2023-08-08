import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function RoomInfo({ roomInfo }) {
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(0); // Progress state
    const [currentTime, setCurrentTime] = useState(0); // Current time state
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io("http://localhost:3000/" + roomInfo.roomName);

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

    function getContrastColor(background) {
        // Remove the "#" symbol if present
        if (background.charAt(0) === "#") {
          background = background.slice(1);
        }
      
        // Convert the hexadecimal color to RGB components
        const r = parseInt(background.substr(0, 2), 16);
        const g = parseInt(background.substr(2, 2), 16);
        const b = parseInt(background.substr(4, 2), 16);
      
        // Calculate relative luminance using the formula for sRGB colors
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      
        // Determine whether to use white or black text based on luminance
        return luminance > 0.5 ? ["#000000", "#ffffff"] : ["#ffffff", "#000000"];
      }

    return (
        <div onClick={() => {
            if (window.location.pathname !== `/${roomInfo?.roomName}`) {
                navigate(`/${roomInfo?.roomName}`);
            }
        }}>
            {data ? (
                <div className="flex flex-col min-h-[100px] justify-between" style={{ backgroundColor: data?.colors[0]?.hex }}>
                    <h1 className="text-xs font-bold mt-2 mr-2 text-end">{roomInfo?.title}</h1>

                    <div className="flex align-items w-full p-2 pb-0 pt-1">
                        <img className="w-[60px] h-[60px]" src={data?.cover} alt={data?.name} />
                        <div className="pop pl-2">
                            <p style={{color: getContrastColor(data?.colors[0]?.hex)[0]}}>{data?.name}</p>
                            <p style={{color: getContrastColor(data?.colors[0]?.hex)[0]}}>{data?.artists ? data.artists[0] : null}</p>
                        </div>
                    </div>
                    <div className="h-[3px] m-2" style={{backgroundColor: getContrastColor(data?.colors[0]?.hex)[1]}}>
                        <div className="bg-black h-full " style={{ width: `${progress}%`, backgroundColor: getContrastColor(data?.colors[0]?.hex)[0] }}>

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
        </div>
    );
}

export default RoomInfo;
