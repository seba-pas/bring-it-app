import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";


function Chat() {

    const socket = io("http://localhost:3001");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const user = useSelector((state) => state.user.email);
    //
    const destino = "alejandro@gmail.com"
    useEffect(() => {
        const receiveMessage = (message) => {
            setMessages([message, ...messages]);
        };
        socket.on(`${user}`, receiveMessage);
        return () => {
            socket.off(`${user}`, receiveMessage);
        };
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", `${destino}/${message}`);
        const newMessage = {
            body: message,
            from: `${user}`,
        };
        setMessages([newMessage, ...messages]);
        setMessage("");
    };
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}>
                            <p>
                                {message.from}: {message.body}
                            </p>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    );
}

export default Chat
