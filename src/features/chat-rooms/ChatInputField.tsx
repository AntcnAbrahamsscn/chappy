import { useState } from "react"; // Import useState for managing state
import { useParams } from "react-router-dom";

import { MessageInterface } from "../../models/MessageInterface";
import "./chat-styles.css";
import { CiLocationArrow1 } from "react-icons/ci";
import useStore from "../../data/store.js";

const ChatInputField = () => {
    const [message, setMessage] = useState("");
    const { id, receiver } = useParams<{ id?: string; receiver?: string }>();

    const { user } = useStore();

    // API Request:
    async function postMessage() {
        const messageData: MessageInterface = {
            sender: user ? user.username : "Guest",
            content: message,
            channel: id ? id : null,
            directTo: receiver ? receiver : null,
            sentAt: new Date(),
        };

        try {
            // Log the data before sending
            console.log("Posting message data:", messageData);

            const response = await fetch("/api/message/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData),
            });

            const data = await response.json();
            console.log("Message posted successfully:", data);

            setMessage("");
        } catch (error) {
            console.log("This is an errro");
        }
    }

    return (
        <div className="input-container">
            <input
                type="text"
                placeholder="Type something fun!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={postMessage}>
                <CiLocationArrow1 size={20} />
            </button>
        </div>
    );
};

export default ChatInputField;
