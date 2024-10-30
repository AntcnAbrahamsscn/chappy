import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../data/store.js";
import "../channel/channel.css";
import { MessageInterface } from "../../models/MessageInterface";
import ChatInputField from "../channel/ChatInputField.js";

const DirectMessage = () => {
    const { receiver } = useParams<{ receiver: string }>();
    const { user } = useStore();
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    useEffect(() => {
        console.log(receiver);
        console.log(user?.username);

        const fetchDirectMessages = async () => {
            if (!user || !receiver) return;

            try {
                const response = await fetch(
                    `/api/message/direct/${user.username}/${receiver}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }

                const data = await response.json();
                console.log(data);
                setMessages(data.messages);
                console.log(messages);
                
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchDirectMessages();
    }, [user, receiver]);

    return (
        <div className="channel-container">
            <div className="messages-display">
                {user && messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            
                        >
                            <p>{message.content}</p>
                            
                        </div>
                    ))
                ) : (
                    <p>No messages available.</p> 
                )}
            </div>
            <ChatInputField />
        </div>
    );
};

export default DirectMessage;
