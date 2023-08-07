import RoomInfo from "./RoomInfo";

// RoomsInfo.js
const roomNames = ["room1", "room2", "room3", "room4", "room5", "room6"];



const RoomsInfo = ({ audio }) => {
    return (
        <>
            {roomNames.map(roomName => (
                <RoomInfo key={roomName} audio={audio} room={roomName} />
            ))}
        </>
    );
};

export default RoomsInfo;
