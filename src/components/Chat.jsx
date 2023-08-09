//Chat.js
import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "../styles/Chat.css"


const Chat = ({ socket, deleteChat }) => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const list = useRef(null);
  
  const [showChat, setShowChat] = useState(false);


  useEffect(() => {
    socket.on("newMessage", (data) => {
      setMessages((messages) => [...messages, data]);
      list.current.scrollTop = list.current.scrollHeight;
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("newMessage", {
      message: message,
      id: socket.id,
    });

    setMessage("");
  };

  useEffect(() => {
    if (deleteChat) {
      setMessages([]);
    }
  }, [deleteChat]);

  return (
    <>
      <div className="chat__cont">
        <div className="chat__header">
          <h1 className="noselect">Chat del stream</h1>
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



      <div className="chat__cont-mobile" style={showChat? {top: 0} : {bottom:"-90vh"}}>
        <div className="chat__header" onClick={() => setShowChat(!showChat)}>
          <h1 className="noselect">Chat del stream</h1>
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
