import RoomInfo from "./RoomInfo";

// RoomsInfo.js

const roomsInfo = [
  {
    roomName: "room1",
    spotifyPlaylistID: "37i9dQZF1DX6XNIZUM3SKi",
    title: "Barça Tour 2023⚽",
  },
  {
    roomName: "room2",    
    spotifyPlaylistID: "07MBp1t71mTJfuJvQpkGbN",
    title: "Full Latinos",
  },
  {
    roomName: "room3",
    spotifyPlaylistID: "0IepDN73Y0GDNBycm63Ewx",
    title: "RULETA ESCOPETA 🔫🥖",
  },
  {
    roomName: "room4",
    spotifyPlaylistID: "37i9dQZEVXbLRQDuF5jeBp",
    title: "Top 50 EE.UU 🔫"
  },
  {
    roomName: "room5",
    spotifyPlaylistID: "37i9dQZEVXbMDoHDwVN2tF",  
    title: "Top 50 Global 🌍"
  },
  {
    roomName: "room6",
    spotifyPlaylistID: "37i9dQZEVXbNFJfN1Vw8d9",
    title: "Top 50 España 🇪🇸🇪🇸"
  },
];






const RoomsInfo = ({refreshDeleteChat}) => {
    return (
        <>

        {
            roomsInfo.map((roomInfo) => (
                <RoomInfo key={roomInfo.roomName} roomInfo={roomInfo} refreshDeleteChat={refreshDeleteChat} />
            ))
            
        }
            
        </>
    );
};

export default RoomsInfo;
