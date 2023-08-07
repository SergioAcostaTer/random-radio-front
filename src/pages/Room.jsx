import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";

function Room() {
    const { room } = useParams();

    // const socket = io("http://192.168.1.133:4000/" + room); // Replace with your room name
    const socket = io("https://random-radio-back.onrender.com/" + room); // Replace with your room name
    // const socket = io("http://192.168.0.30:4000/" + room); // Replace with your room name

    // State to store users, chat messages, and current song details
    const [data, setData] = useState(null);
    const [audioElement, setAudioElement] = useState(null);

    console.log(socket);


    useEffect(() => {
        // Set the socket state

        const handleSongDetails = (data) => {
            console.log(data);
            setData(data);

            // Create an audio element and set its source to the provided URL
            const audio = new Audio(data.url);
            setAudioElement(audio);

            // Set the current time of the audio and play it
            audio.currentTime = data.currentTime;
            audio.play();
        };

        


        socket.on("songDetails", (song) => handleSongDetails(song));

        // Clean up on unmount
        return () => {
            socket.off("songDetails", handleSongDetails);
            if (audioElement) {
                audioElement.pause();
                setAudioElement(null);
            }
            socket.disconnect();
        };
    }, [room]);


    return (
        <>
            <div className="flex h-full">
                <div>
                    <RoomsInfo audio={audioElement} />
                </div>
                <div>
                    <h1>Now Playing: {data?.name} - {data?.artists[0]}</h1>
                </div>
                <div>
                    <Chat socket={socket} />
                </div>
            </div>

        </>
    );
}

export default Room;
