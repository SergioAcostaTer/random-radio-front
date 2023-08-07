import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

function RoomInfo({ room, audio }) {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    // const socket = io("http://192.168.1.133:4000/" + room); // Replace with your room name
    const socket = io("https://random-radio-back.onrender.com/" + room); // Replace with your room name
    // const socket = io("http://192.168.0.30:4000/" + room); // Replace with your room name


    useEffect(() => {
        socket.emit("getUsers")

        const handleSongDetails = (song) => {
            setData(song);
        };

        socket.on("songDetails", handleSongDetails);

        return () => {
            socket.off("songDetails", handleSongDetails);
        };
    }, [room]);

    return (
        <div onClick={() => {
            if (audio && window.location.pathname !== `/${room}`) {
                audio.pause();
            }
            if (window.location.pathname !== `/${room}`) {
                navigate(`/${room}`);
            }

        }}>
            {data ? (
                <div>
                    <h2>Now Playing:</h2>
                    <p>Song: {data.name}</p>
                    <p>Artist: {data.artists[0]}</p>
                </div>
            ) : (
                <p>No song currently playing.</p>
            )}
        </div>
    );
}

export default RoomInfo;
