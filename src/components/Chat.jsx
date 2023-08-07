//Chat.js
import { useEffect, useState } from "react";


const Chat = ({ socket }) => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit("newMessage", {
      message: message,
      id: socket.id,
    });

    setMessage("");
  };

  return (
    <>
      <div className="w-[360px] bg-blue-500 absolute top-0 right-0">
        <h1>Chat</h1>

        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>


        <ul>
          {messages.map((messageData, index) => (
            <li key={index}>{messageData.message}</li>
          ))}
        </ul>
      </div>


    </>
  );
};

export default Chat;
