import { toast } from "react-toastify";
import getContrastColor from "./getContrastColor";
import { Link } from "react-router-dom";

const postToast = ({ trueAfter5seconds, roomName, visible, song }) => {

  const toastContent = (
    <div
      className={`custom-toast`} // Add the custom CSS class
      style={{
        backgroundColor: song.colors[0].hex,
      }}
    >
      <div className="info-cont">
        <p
          style={{ color: getContrastColor(song.colors[0].hex)[0] }}
          className="playlist"
        >
          Wanna change of room?
        </p>
        <div className="song-details">
          <img src={song.cover} alt={song.name} />
          <div className="text">
            <p
              style={{ color: getContrastColor(song.colors[0].hex)[0] }}
              className="song-title"
            >
              {song.name}
            </p>
            <p
              style={{ color: getContrastColor(song.colors[0].hex)[0] }}
              className="song-author"
            >
              {song.artists[0]}
            </p>
          </div>
          <div className="buttons">
            <Link
              to={`/${roomName}`}
              onClick={() => {
                toast.dismiss();
              }}
            >
              <button className="toast-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </button>
            </Link>

            <button
              className="toast-button-no"
              onClick={() => {
                toast.dismiss();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const toastOptions = {
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
    pauseOnFocusLoss: true,
    pauseOnHover: true,
  };


  if (
    trueAfter5seconds &&
    window.location.pathname !== `/${roomName}` &&
    visible
  ) {
    toast.info(toastContent, toastOptions);
  }
  else {
    console.log("toast not posted");
  }
};

export default postToast;