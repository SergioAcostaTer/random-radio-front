import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";
import "../styles/layout.css";
import MusicPlayer from "../components/MusicPlayer";
import Background from "../components/Background";


function Room() {
    const { room } = useParams();
    const iframeRef = useRef(null);
    const [sockett, setSocket] = useState(null);
    const [irefLoaded, setIrefLoaded] = useState(false);
    const [deleteChat, setDeleteChat] = useState(false); // Delete chat messages when the song changes
    const [volume, setVolume] = useState(50); // Volume state

    const refreshDeleteChat = () => {
        setDeleteChat(!deleteChat);
    };

    // State to store users, chat messages, and current song details
    const [data, setData] = useState(null);

    useEffect(() => {
        // Wait for the iframe to be loaded
        let iframe = iframeRef.current;
        console.log(iframe);


        if (iframe) {
            iframe.onload = () => {
                const player = iframe.contentWindow;
                player.postMessage({
                    event: 'command',
                    func: 'setVolume',
                    args: [volume],
                }, '*');
            
                // The iframe (YouTube player) is now loaded
                console.log('Player is loaded');
                setIrefLoaded(true);
            };
        }

        //when something starts playing audio setIrefLoaded to true

        return () => {
            //destroy the iframe
            setIrefLoaded(false);
            iframe = null;
        }


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

                    <MusicPlayer loading={!irefLoaded} currentTime={data?.currentTime} duration={data?.duration} cover={data?.cover} title={data?.name} artists={data?.artists} colors={data?.colors} />

                    {/* <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        style={{
                            zIndex: 100000,
                        }}
                        onChange={(e) => {
                            const newVolume = e.target.value;
                            setVolume(newVolume);
                            console.log(newVolume);
                            const player = iframeRef.current.contentWindow;
                            player.postMessage({
                                event: 'command',
                                func: 'setVolume',
                                args: [newVolume],
                            }, '*');
                        }}
                    /> */}

                    {
                        data?.url ?
                            <iframe
                                width={400}
                                height={400}
                                src={`https://www.youtube.com/embed/${data?.url?.split("=")[1]}?start=${data?.currentTime + 3}&autoplay=1`}
                                title="YouTube video player"
                                style={{ display: "none" }}
                                allow="autoplay;"
                                ref={iframeRef}
                            ></iframe>
                            : null
                    }


                </div>
                <>
                    {sockett ? <Chat deleteChat={deleteChat} socket={sockett} /> : null}
                </>
            </div>
        </>
    );
}

export default Room;
