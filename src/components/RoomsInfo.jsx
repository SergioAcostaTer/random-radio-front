import RoomInfo from "./RoomInfo";

// RoomsInfo.js

const roomsInfo = [
  {
    roomName: "room1",
    spotifyPlaylistID: "37i9dQZF1DXcBWIGoYBM5M",
    title: "Today's Top Hits 🎧"
  },
  {
    roomName: "room2",
    spotifyPlaylistID: "37i9dQZF1DX0XUsuxWHRQd",
    title: "RapCaviar 🎤"
  },
  {
    roomName: "room3",
    spotifyPlaylistID: "37i9dQZF1DX10zKzsJ2jva",
    title: "Viva Latino! 🎉"
  },
  {
    roomName: "room4",
    spotifyPlaylistID: "37i9dQZF1DX4o1oenSJRJd",
    title: "All Out 00s 🎧"
  },
  {
    roomName: "room5",
    spotifyPlaylistID: "37i9dQZEVXbMDoHDwVN2tF",  
    title: "Top 50 Global 🌍"
  },
  {
    roomName: "room6",
    spotifyPlaylistID: "37i9dQZEVXbLRQDuF5jeBp",
    title: "Top 50 EE.UU 🔫"
  },
  {
    roomName: "room7",
    spotifyPlaylistID: "37i9dQZEVXbNFJfN1Vw8d9",
    title: "Top 50 España 🇪🇸🇪🇸"
  },
  {
    roomName: "room8",
    spotifyPlaylistID: "37i9dQZF1DX6XNIZUM3SKi",
    title: "Barça Tour 2023⚽",
  },
  {
    roomName: "room9",    
    spotifyPlaylistID: "07MBp1t71mTJfuJvQpkGbN",
    title: "Full Latinos",
  },
  {
    roomName: "room10",
    spotifyPlaylistID: "0IepDN73Y0GDNBycm63Ewx",
    title: "RULETA ESCOPETA 🔫🥖",
  },
  {
    roomName: "room11",
    spotifyPlaylistID: "37i9dQZF1DWWMOmoXKqHTD",
    title: "Songs to Sing in the Car 🚗🎶",
  },
  {
    roomName: "room12",
    spotifyPlaylistID: "37i9dQZF1DX0BcQWzuB7ZO",
    title: "Dance Hits 🕺",
  }
];





const RoomsInfo = ({refreshDeleteChat}) => {
    return (
        <>

        {
            roomsInfo.map((roomInfo) => (
                <RoomInfo key={roomInfo.roomName} roomInfo={roomInfo} refreshDeleteChat={refreshDeleteChat}/>
            ))
            
        }
            
        </>
    );
};

export default RoomsInfo;
