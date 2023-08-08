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
    const [irefLoaded, setIrefLoaded] = useState(false);
    const [deleteChat, setDeleteChat] = useState(false); // Delete chat messages when the song changes

    const refreshDeleteChat = () => {
        setDeleteChat(!deleteChat);
    };

    // State to store users, chat messages, and current song details
    const [data, setData] = useState(null);

    useEffect(() => {
        // Wait for the iframe to be loaded
        const iframe = iframeRef.current;
        console.log(iframe);

        if (iframe) {
            iframe.onload = () => {
                // The iframe (YouTube player) is now loaded
                console.log('Player is loaded');

                setIrefLoaded(true);

                //same volume as the player
                iframe.contentWindow.postMessage('{"event":"command","func":"' + 'setVolume' + '","args":[' + 100 + ']}', '*');
            };
        }

        //when something starts playing audio setIrefLoaded to true

       
    }, [data]);

    useEffect(() => {
        const socket = io("https://random-radio-back.onrender.com/" + room); // Replace with your room name
        // const socket = io("http://localhost:3000/" + room); // Replace with your room name

        setSocket(socket);


        const handleSongDetails = (data) => {
            console.log(data);
            setIrefLoaded(false)
            setData(data);
        };

        socket.emit("joinRoom");

        socket.on("userCount", (users) => {
            setUsers(users);
        });

        socket.on("songDetails", (song) => handleSongDetails(song));

        return () => {
            setIrefLoaded(false);
            socket.emit("leaveRoom");
            socket.off("songDetails", handleSongDetails);
            socket.disconnect();
        };
    }, [room]);


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
        <>
            <div className="h-full w-full relative flex flex-col lg:flex-row">
                <div className="bg-blue-500 w-full h-full grid grid-cols-3 grid-rows-2 lg:block lg:w-[300px] h-[200px]">
                    <RoomsInfo refreshDeleteChat={refreshDeleteChat} />
                </div>
                <div className="h-full flex-1" style={{ backgroundColor: data?.colors[1]?.hex }}>
                    <h1 style={{ color: "black" }}>{data?.name} - {data?.artists[0]}</h1>
                    <h2>Users in room: {users}</h2>
                    {
                        irefLoaded ? null : <h1>Loading...</h1>
                    }

                    {
                        data?.url ?
                            <iframe
                                width={ 400}
                                height={400}
                                src={`https://www.youtube.com/embed/${data?.url?.split("=")[1]}?start=${data?.currentTime+3}&autoplay=1`}
                                title="YouTube video player"
                                style={{display: "none" }}
                                allow="autoplay;"
                                ref={iframeRef}
                            ></iframe>
                            : null
                    }

                    
                </div>

                {sockett ? <Chat deleteChat={deleteChat} socket={sockett} /> : null}

            </div>
        </>
    );
}

export default Room;
