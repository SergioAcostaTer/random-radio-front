import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";
import "../styles/layout.css";
import MusicPlayer from "../components/MusicPlayer";
import Background from "../components/Background";
import ReactPlayer from "react-player";



function Room() {
    const { room } = useParams();
    const [sockett, setSocket] = useState(null);
    const [playerLoaded, setPlayerLoaded] = useState(false);
    const [deleteChat, setDeleteChat] = useState(false); // Delete chat messages when the song changes
    const [volume, setVolume] = useState(50); // Volume state

    const refreshDeleteChat = () => {
        setDeleteChat(!deleteChat);
    };

    // State to store users, chat messages, and current song details
    const [data, setData] = useState(null);

    useEffect(() => {
        const socket = io("https://random-radio-back.onrender.com/" + room); // Replace with your room name
        // const socket = io("http://localhost:3000/" + room); // Replace with your room name

        setSocket(socket);

        const handleSongDetails = (data) => {
            console.log(data);
            setData(data);
        };

        socket.on("songDetails", (song) => handleSongDetails(song));

        return () => {
            socket.emit("leaveRoom");
            socket.off("songDetails", handleSongDetails);
            socket.disconnect();
        };
    }, [room]);



    return (
        <>
            <div className="full-container" style={{
                backgroundColor: data?.colors[1].hex,
            }}>
                <div className="roomInfo__cont">
                    <RoomsInfo refreshDeleteChat={refreshDeleteChat} />
                </div>

                <div className="main__cont"
                    style={{
                        backgroundColor: data?.colors[1].hex
                    }}
                >
                    <Background color={data?.colors[0].hex} />

                    <MusicPlayer volume={[volume, setVolume]} loading={!playerLoaded} currentTime={data?.currentTime} duration={data?.duration} cover={data?.cover} title={data?.name} artists={data?.artists} colors={data?.colors} />

                    

                    <ReactPlayer url={data?.url+`?start=${data?.currentTime + 3}`} playing={true} volume={volume / 100} width={0} height={0} onStart={() => {
                        console.log("started");
                        setPlayerLoaded(true)
                    }}/>


                </div>
                <>
                    {sockett ? <Chat /> : null}
                </>
            </div>
        </>
    );
}

export default Room;
