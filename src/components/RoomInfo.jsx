import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "../styles/RoomInfo.css";
import postToast from "../services/postToast";
import useProgress from "../hooks/useProgress";
import useVisible from "../hooks/useVisible";
import useContrast from "../hooks/useContrast";


function RoomInfo({ roomInfo }) {
    const { title, roomName } = roomInfo;
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const visible = useVisible();
    const progress = useProgress({ songDuration: data?.duration, currentTime: data?.currentTime });
    const contrast = useContrast({ color: data?.colors[0]?.hex });

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
            postToast({ song, visible, trueAfter5seconds, roomName });
        };

        socket.on("songDetails", handleSongDetails);

        return () => {
            socket.disconnect();
        };

    }, [socketURL]);


    const handleRoomNavigation = useCallback(() => {
        if (window.location.pathname !== `/${roomName}`) {
            navigate(`/${roomName}`);
        }
    }, [roomName, navigate]);

    return (
        <>
                <div onClick={handleRoomNavigation} className={` ${data ? "" : "load"} infoContainer`} style={{ backgroundColor: data?.colors[0]?.hex, }}>
                    <h1 className="roomTitle"
                        style={{
                            color: contrast[0]
                        }}

                    >{title}</h1>

                    <div className="titlesCont noselect">
                        <img className="noselect" src={data?.cover} alt={data?.name} />
                        <div className="text">
                            <p className="title noselect" style={{ color: contrast[0] }}>{data?.name}</p>
                            <p className="author noselect" style={{ color: contrast[0] }}>{data?.artists ? data.artists[0] : null}</p>
                        </div>
                    </div>

                    <div className="progressCont" style={{ backgroundColor: contrast[1] }}>
                        <div className="progressBar" style={{ width: `${progress}%`, backgroundColor: contrast[0] }}>
                        </div>
                    </div>
                </div>
           

            <div className="infoContainerMobile" onClick={handleRoomNavigation}>
                <div className={!data ? "load" : ""}>
                    <img className="noselect" src={data?.cover} alt={data?.name} />
                </div>
            </div>
        </>
    );
}

export default RoomInfo;
