import { useEffect, useState } from "react";
import socket from "../services/socket";


function useConnections() {
  const [connections, setConnections] = useState(0);

  useEffect(() => {

    // Listen for the "updateTotalConnections" event and update the state
    socket.on("updateTotalConnections", (updatedTotalConnections) => {
      setConnections(updatedTotalConnections);
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);

  return connections;
}

export default useConnections;
