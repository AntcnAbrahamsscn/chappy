import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MessageInterface } from "../../models/MessageInterface";

const Channel = () => {
    const { id } = useParams<{ id: string }>();
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
        <div>
            {/* TODO: Gör ett API anrop som hämtar namnet på kanalen! */}
            <h2>Name: </h2>
            <div>
                {messages.map((msg) => (
                    <div>
                        <p>
                            <strong>{msg.sender}:</strong> {msg.content}{" "}
                        </p>
                        <p>Sent at: {new Date(msg.sentAt).toLocaleString()} </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channel;
