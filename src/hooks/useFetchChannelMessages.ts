import { useEffect, useState, useCallback } from "react";
import { MessageInterface } from "../models/MessageInterface.js";

const useFetchChannelMessages = (id: string, triggerRefresh: boolean) => {
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch(`/api/message/${id}`);
            if (response.ok) {
                const data: MessageInterface[] = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages, triggerRefresh]);
    return { messages, fetchMessages };
};

export default useFetchChannelMessages;
