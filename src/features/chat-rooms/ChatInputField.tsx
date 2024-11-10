import { useState } from "react"; // Import useState for managing state
import { useParams } from "react-router-dom";

import { MessageInterface } from "../../models/MessageInterface";
import "./chat-styles.css";
import { CiLocationArrow1 } from "react-icons/ci";
import useStore from "../../data/store.js";
import messageSchema from "../../validation/messageSchema.js";

const ChatInputField = () => {
    const [message, setMessage] = useState("");
    const { id, receiver } = useParams<{ id?: string; receiver?: string }>();
    const { user, toggleMessageRefresh } = useStore();

    // const { user } = useStore();

    const validateMessage = (messageData: MessageInterface) => {
        const { error } = messageSchema.validate(messageData);
        return error;
    };

    // API Request: TODO: Lyft ut detta till egen hook-fil
    async function postMessage() {
        const messageData: MessageInterface = {
            sender: user ? user.username : "Guest",
            content: message,
            channel: id ? id : null,
            directTo: receiver ? receiver : null,
            sentAt: new Date(),
        };

        const validationError = validateMessage(messageData);
        if (validationError) {
            console.error("Validation error:", validationError.details);
            return; // Do not proceed if validation fails
        }
        setMessage("");

        try {
            console.log("Posting message data:", messageData);

            const response = await fetch("/api/message/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Message posted successfully:", data);
                toggleMessageRefresh();
            } else {
                const error = await response.json();
                console.error("Error posting message:", error);
            }
        } catch (error) {
            console.error("Error posting message:", error);
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
