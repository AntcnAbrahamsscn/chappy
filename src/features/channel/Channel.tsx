import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../data/store.js";
import "./channel.css";

import { MessageInterface } from "../../models/MessageInterface";
import ChatInputField from "./ChatInputField.js";

const Channel = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useStore();

    // TODO: Lägg till i zustand
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/message/${id}`);
                if (response.ok) {
                    const data: MessageInterface[] = await response.json();
                    setMessages(data);
                    console.log(data);
                } else {
                    console.error(
                        "Failed to fetch messages:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [id]);

    return (
        <div className="channel-container">
            {/* TODO: Gör ett API anrop som hämtar namnet på kanalen! */}
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-section ${
                            user?.username === msg.sender
                                ? "own-message"
                                : "other-message"
                        }`}
                    >
                        <p
                            className={
                                user?.username === msg.sender
                                    ? "user-message-container"
                                    : "message-container"
                            }
                        >
                            {msg.content}
                            <div className="message-details">
                                <p>{msg.sender}</p>
                                <p>{new Date(msg.sentAt).toLocaleString()} </p>
                            </div>
                        </p>
                    </div>
                ))}
            </div>
            {/* TODO: Lägg till inputfield */}
            <ChatInputField />

        
        </div>
    );
};

export default Channel;
