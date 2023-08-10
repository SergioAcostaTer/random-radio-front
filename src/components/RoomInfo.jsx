import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getContrastColor from "../services/getContrastColor";
import "../styles/RoomInfo.css";


function RoomInfo({ roomInfo }) {
    const { title, roomName } = roomInfo;
    const [data, setData] = useState(null);
    const [progress, setProgress] = useState(0); // Progress state
    const [currentTime, setCurrentTime] = useState(0); // Current time state
    const navigate = useNavigate();
    const [pageVisible, setPageVisible] = useState(true);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setPageVisible(!document.hidden);

            if (!document.hidden) {
                toast.dismiss();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const socketURL = "https://random-radio-back.onrender.com/" + roomName;
    // const socketURL = "http://localhost:3000/" + roomName;

    useEffect(() => {
        const socket = io(socketURL);

        let trueAfter5seconds = false

        setTimeout(() => {
            trueAfter5seconds = true
        }, 5000);

        const handleSongDetails = (song) => {
            setData(song);
            setCurrentTime(song.currentTime);

            //10% of probability of changing the song
            if (trueAfter5seconds && window.location.pathname !== `/${roomName}` && pageVisible) {
                const toastId = toast.info(
                    <div
                        className={`custom-toast`} // Add the custom CSS class
                        style={{
                            backgroundColor: song.colors[0].hex,
                        }}
                    >
                        <div className="info-cont">
                            <p style={{ color: getContrastColor(song.colors[0].hex)[0] }} className="playlist">Wanna change of room?</p>
                            <div className="song-details">
                                <img src={song.cover} alt={song.name} />
                                <div className="text">
                                    <p style={{ color: getContrastColor(song.colors[0].hex)[0] }} className="song-title">{song.name}</p>
                                    <p style={{ color: getContrastColor(song.colors[0].hex)[0] }} className="song-author">{song.artists[0]}</p>
                                </div>
                                <div className="buttons">
                                    <button className="toast-button" onClick={() => {
                                        navigate(`/${roomName}`)
                                        toast.dismiss()
                                    }}
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                        </svg></button>
                                    <button className="toast-button-no" onClick={() => {
                                        toast.dismiss(toastId)
                                    }}
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg></button>
                                </div>
                            </div>
                        </div>
                    </div>,
                    {
                        position: "bottom-left",
                        autoClose: 5000,
                        closeButton: false,
                        icon: false,
                        style: {
                            backgroundColor: "transparent",
                            color: "transparent",
                            boxShadow: "none",
                            width: "100%",
                            height: "100%",
                            padding: "0",
                            margin: "0",
                            borderRadius: "0",
                            border: "none",
                            fontSize: "0",
                        },
                        progressStyle: {
                            backgroundColor: "#40C057",
                            bottom: 13,
                            width: "90%",
                            left: 0,
                            right: 0,
                            margin: "0 auto",
                        },
                        draggablePercent: 40,
                        pauseOnFocusLoss: false,
                        pauseOnHover: true,
                    }
                );

            }
        };

        socket.on("songDetails", handleSongDetails);

        return () => {
            socket.disconnect();
        };

    }, [socketURL]);


    const songDuration = data?.duration || 1; // To avoid division by zero

    useEffect(() => {
        if (data) {
            const interval = setInterval(() => {
                setProgress((currentTime / songDuration) * 100);
                setCurrentTime((prevTime) => prevTime + 0.05);
            }, (songDuration / 100) * 50); // Update every 0.5% of song duration

            return () => {
                clearInterval(interval);
            };
        }
    }, [data, currentTime, songDuration]);

    const handleRoomNavigation = useCallback(() => {
        if (window.location.pathname !== `/${roomName}`) {
            navigate(`/${roomName}`);
        }
    }, [roomName, navigate]);

    return (
        <>
            {data ? (
                <div onClick={handleRoomNavigation} className="infoContainer" style={{ backgroundColor: data?.colors[0]?.hex }}>
                    <h1 className="roomTitle"
                        style={{
                            color: getContrastColor(data?.colors[0]?.hex)[0]
                        }}

                    >{title}</h1>

                    <div className="titlesCont noselect">
                        <img className="noselect" src={data?.cover} alt={data?.name} />
                        <div className="text">
                            <p className="title noselect" style={{ color: getContrastColor(data?.colors[0]?.hex)[0] }}>{data?.name}</p>
                            <p className="author noselect" style={{ color: getContrastColor(data?.colors[0]?.hex)[0] }}>{data?.artists ? data.artists[0] : null}</p>
                        </div>
                    </div>

                    <div className="progressCont" style={{ backgroundColor: getContrastColor(data?.colors[0]?.hex)[1] }}>
                        <div className="progressBar" style={{ width: `${progress}%`, backgroundColor: getContrastColor(data?.colors[0]?.hex)[0] }}>
                        </div>
                    </div>

                </div>
            ) : (
                <p>No song currently playing.</p>
            )}

            <div className="infoContainerMobile" onClick={handleRoomNavigation}>
                <img className="noselect" src={data?.cover} alt={data?.name} />
            </div>
        </>
    );
}

export default RoomInfo;
