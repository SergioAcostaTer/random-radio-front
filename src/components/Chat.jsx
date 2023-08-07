//Chat.js
import { useEffect, useState } from "react";


const Chat = ({ socket }) => {

  console.log(socket);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessages((messages) => [...messages, data]);
      console.log(data);
    });
    

    return () => {
      socket.off("newMessage");
    };
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);



  const sendMessage = (e) => {
    e.preventDefault();

    console.log(message);

    socket.emit("newMessage", {
      message: message,
      id: socket.id,
    });

    setMessage("");
  };



  return (
    <>
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


    </>
  );
};

export default Chat;
