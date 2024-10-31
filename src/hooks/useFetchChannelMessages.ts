import { useEffect, useState } from "react";
import { MessageInterface } from "../models/MessageInterface.js";

const useFetchChannelMessages = (id: string) => {
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/message/${id}`);
                if (response.ok) {
                    const data: MessageInterface[] = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, [id]);

    return { messages };
};

export default useFetchChannelMessages;
