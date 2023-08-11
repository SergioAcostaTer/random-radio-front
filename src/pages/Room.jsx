import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ReactPlayer from "react-player";

import Chat from "../components/Chat";
import RoomsInfo from "../components/RoomsInfo";
import MusicPlayer from "../components/MusicPlayer";
import Background from "../components/Background";
import Cookies from "../components/Cookies";

import "../styles/layout.css";
import Header from "../components/Header";
import PageLoader from "../components/PageLoader";
import useLoading from "../hooks/useLoading";


function Room() {
    const { room } = useParams();
    const [loading, showLoader, setLoading] = useLoading();

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
            <Cookies />
            <Header backColor={colors?.[0]?.hex} />
            <PageLoader
                styles={{
                    backgroundColor: colors?.[1]?.hex,
                    opacity: loading ? 1 : 0,
                    transition: "all 0.3s",
                }}
                className={showLoader ? "" : "none"}
            />
            <div className="full-container" style={{
                backgroundColor: colors?.[1]?.hex,
            }}>
                {/* <div style={{ padding: 7 }}> */}

                <div className="roomInfo__cont">
                    <RoomsInfo />
                </div>
                {/* </div> */}
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
                        onStart={() => {
                            setPlayerLoaded(true)
                            setLoading(false);
                        }}
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
