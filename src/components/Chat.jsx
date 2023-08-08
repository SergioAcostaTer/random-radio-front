//Chat.js
import { useEffect, useState } from "react";
import Message from "./Message";


const Chat = ({ socket, deleteChat }) => {

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
      <div className="w-[360px] top-0 right-0 h-[100vh] flex flex-col justify-between border-[1px]">
        <div>
          <div className="w-full h-[50px] text-xs bg-[#18181B30] border-[1px]">
            <h1>Chat del stream</h1>
          </div>

          <ul className="p-2">
            {messages.map((messageData, index) => (
              <Message key={index} user={messageData.id} message={messageData.message} />
            ))}
          </ul>
        </div>

        <form onSubmit={sendMessage} className="h-[100px] flex flex-col items-center gap-2">
          <input
            className="w-[95%] h-[40px] border-[1px] rounded-lg"
            type="text"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="w-full flex justify-end p-2">
            <button type="submit" className="bg-blue-500 p-1">Send</button>
          </div>
        </form>
      </div>




    </>
  );
};

export default Chat;
