import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";

function Room() {
    const { room } = useParams();
    const [sockett, setSocket] = useState(null);
    const [users, setUsers] = useState([]);




    // State to store users, chat messages, and current song details
    const [data, setData] = useState(null);
    const [audioElement, setAudioElement] = useState(null);



    useEffect(() => {
        // const socket = io("http://192.168.1.133:4000/" + room); // Replace with your room name
        const socket = io("https://random-radio-back.onrender.com/" + room); // Replace with your room name
        // const socket = io("http://192.168.0.30:4000/" + room); // Replace with your room name
        setSocket(socket);

        const handleSongDetails = async (data) => {
            console.log(data);
            setData(data);
        
            try {
                // Make a fetch request to the URL to check its status
                const response = await fetch(data.url);
        
                // Check if the status code is 403 Forbidden
                if (response.status === 403) {
                    console.log("URL returned a 403 status code. Skipping song...");
                    socket.emit("skipSong", data);
                    return;
                }
        
                // Create an audio element and set its source to the provided URL
                const audio = new Audio(data.url);
                setAudioElement(audio);
        
                // Set the current time of the audio and play it
                audio.currentTime = data.currentTime;
                audio.play();
            } catch (err) {
                console.log(err);
                socket.emit("skipSong", data);
            }
        };
        

        socket.emit("joinRoom")

        socket.on("userCount", (users) => {
            setUsers(users);
        });



        socket.on("songDetails", (song) => handleSongDetails(song));

        // Clean up on unmount
        return () => {
            socket.emit("leaveRoom")
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
            <div className="h-full w-full relative">
                <div className="bg-blue-500 w-[280px] absolute top-0 left-0 h-full">
                    <RoomsInfo audio={audioElement} />
                </div>
                <div className="ml-[280px] mr-[360px]">
                    <h1>Now Playing: {data?.name} - {data?.artists[0]}</h1>
                    <h2>Users in room: {users}</h2>
                </div>

                {
                    sockett
                        ? <Chat socket={sockett} />
                        : null
                }
            </div>

        </>
    );
}

export default Room;
