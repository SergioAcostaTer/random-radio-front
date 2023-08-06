//RoomInfo component

import RoomInfo from "./RoomInfo"


const RoomsInfo = ({ audio }) => {
  return (
    <>

      <RoomInfo audio={audio} room={"room1"} />
      <RoomInfo audio={audio} room={"room2"} />
      <RoomInfo audio={audio} room={"room3"} />


    </>
  )
}

export default RoomsInfo