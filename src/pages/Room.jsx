import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";

function Room() {
    const { room } = useParams();
    const iframeRef = useRef(null);
    const [sockett, setSocket] = useState(null);
    const [users, setUsers] = useState([]);

    // State to store users, chat messages, and current song details
    const [data, setData] = useState(null);

    useEffect(() => {
        // Wait for the iframe to be loaded
        const iframe = iframeRef.current;
    
        if (iframe) {
          iframe.onload = () => {
            // The iframe (YouTube player) is now loaded
            console.log('Player is loaded');
            
            // You can interact with the player here, for example, play the video
            iframe.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
          };
        }
      }, [data]);

    useEffect(() => {
        const socket = io("https://random-radio-back.onrender.com/" + room); // Replace with your room name
        // const socket = io("http://localhost:3000/" + room); // Replace with your room name

        setSocket(socket);


        const handleSongDetails = (data) => {
            console.log(data);
            setData(data);
        };

        socket.emit("joinRoom");

        socket.on("userCount", (users) => {
            setUsers(users);
        });

        socket.on("songDetails", (song) => handleSongDetails(song));

        return () => {
            socket.emit("leaveRoom");
            socket.off("songDetails", handleSongDetails);
            socket.disconnect();
        };
    }, [room]);



    return (
        <>
            <div className="h-full w-full relative">
                <div className="bg-blue-500 w-[280px] absolute top-0 left-0 h-full">
                    <RoomsInfo />
                </div>
                <div className="ml-[280px] mr-[360px]">
                    <h1>Now Playing: {data?.name} - {data?.artists[0]}</h1>
                    <h2>Users in room: {users}</h2>

                    {
                        data?.url ?
                            <iframe
                                width="1"
                                height="1"
                                src={`https://www.youtube.com/embed/${data?.url?.split("=")[1]}?start=${data?.currentTime}&autoplay=1`}
                                title="YouTube video player"
                                style={{display: "none" }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                ref={iframeRef}
                            ></iframe>

                            : null
                    }
                </div>

                {sockett ? <Chat socket={sockett} /> : null}

            </div>
        </>
    );
}

export default Room;
