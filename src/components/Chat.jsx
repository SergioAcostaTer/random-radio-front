//Chat.js
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "../styles/Chat.css"
import socketIO from "socket.io-client";
import Draggable from 'react-draggable';
import generateFunnyName from "../services/nameGenerator";
import randomColor from "../services/randomColor";


const Chat = () => {
  const [user, setUser] = useState({}); // [user, setUser]
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const list = useRef(null);

  const [showChat, setShowChat] = useState(false);
  const [users, setUsers] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    setUser({
      user: generateFunnyName(),
      color: randomColor(),
    });

    // const socket = socketIO("http://localhost:3000/")
    const socket = socketIO("https://random-radio-back.onrender.com/")

    setSocket(socket);

    socket.on("users", (data) => {
      setUsers(data);
    });

    socket.on("newMessage", (data) => {
      setMessages((messages) => [...messages, data]);
      list.current.scrollTop = list.current.scrollHeight;
    });

    return () => {
      socket.off("newMessage");
      socket.off("users");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("newMessage", {
      message: message,
      id: socket.id,
      user: user.user,
      color: user.color,
    });

    setMessage("");
  };

  return (
    <>
     <Draggable>
       <div className="user__counter">
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
           <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
         </svg>
         <p className="">Users: {users}</p>
       </div>
     </Draggable>

      <div className="chat__cont">
        <div className="chat__header">
          <h1 className="noselect">Chat del stream</h1>
        </div>


        <ul className="messages__cont" ref={list}>
          {messages.map((messageData, index) => (
            <Message key={index} user={messageData.user} color={messageData.color} message={messageData.message} />
          ))}
        </ul>

        <form onSubmit={sendMessage} className="form">
          <input
            className="input-tx"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="button_container noselect">
            <button type="submit">Send</button>
          </div>
        </form>

      </div>



      <div className="chat__cont-mobile" style={showChat ? { bottom: 0 } : { bottom: "calc(-100vh + 120px)" }}>
        <div className="chat__header" style={showChat ? { alignItems: "center", height: 60, padding: 0 } : { alignItems: "start", height: 120, paddingTop: 20 }} onClick={() => setShowChat(!showChat)}>
          <p>up</p>
          <h1 className="noselect">Chat del stream</h1>
          <p>up</p>
        </div>

        <ul className="messages__cont" ref={list}>
          {messages.map((messageData, index) => (
            <Message key={index} user={messageData.id} message={messageData.message} />
          ))}
        </ul>

        <form onSubmit={sendMessage} className="form">
          <input

            className="input-tx"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="button_container noselect">
            <button type="submit">Send</button>
          </div>
        </form>

      </div>



    </>
  );
};

export default Chat;
