import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ReactPlayer from "react-player";

import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";
import MusicPlayer from "../components/MusicPlayer";
import Background from "../components/Background";

import "../styles/layout.css";

function Room() {
    const { room } = useParams();
    const socketURL = "https://random-radio-back.onrender.com/" + room;
    // const socketURL = "http://localhost:3000/" + room;

    const [playerLoaded, setPlayerLoaded] = useState(false);
    const [volume, setVolume] = useState(50); // Volume state
    const [data, setData] = useState([]);
    const {
        colors,
        currentTime,
        duration,
        cover,
        name,
        artists,
        url
    } = data || {};

    useEffect(() => {
        const socket = io(socketURL);

        const handleSongDetails = (data) => {
            setData(data);
        };

        socket.on("songDetails", (song) => handleSongDetails(song));

        return () => {
            socket.off("songDetails", handleSongDetails);
            socket.disconnect();
        };
    }, [room, socketURL]);


    return (
        <>
            <div className="full-container" style={{
                backgroundColor: colors?.[1]?.hex,
            }}>
                <div className="roomInfo__cont">
                    <RoomsInfo />
                </div>
                <div className="main__cont"
                    style={{
                        backgroundColor: colors?.[1]?.hex
                    }}
                >
                    <Background color={colors?.[0]?.hex} />

                    <MusicPlayer
                        volume={[volume, setVolume]}
                        loading={!playerLoaded}
                        currentTime={currentTime}
                        duration={duration}
                        cover={cover}
                        title={name}
                        artists={artists}
                        colors={colors}
                    />

                    <ReactPlayer
                        url={url + `?start=${currentTime + 3}`}
                        playing={true}
                        volume={volume / 100}
                        width={0}
                        height={0}
                        onStart={() => setPlayerLoaded(true)}
                        style={{ display: "none" }}
                    />

                </div>
                <>
                    <Chat />
                </>
            </div>
        </>
    );
}

export default Room;
