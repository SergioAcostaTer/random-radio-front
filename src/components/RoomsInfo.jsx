//RoomInfo component

import RoomInfo from "./RoomInfo"


const RoomsInfo = ({ audio }) => {
  return (
    <>

      <RoomInfo audio={audio} room={"room1"} />
      <RoomInfo audio={audio} room={"room2"} />
      <RoomInfo audio={audio} room={"room3"} />
      <RoomInfo audio={audio} room={"room4"} />
      <RoomInfo audio={audio} room={"room5"} />
      <RoomInfo audio={audio} room={"room6"} />


    </>
  )
}

export default RoomsInfo