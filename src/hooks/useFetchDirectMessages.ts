import { useEffect, useState, useCallback } from "react";
import useStore from "../data/store.js";
import { MessageInterface } from "../models/MessageInterface.js";

const useFetchDirectMessages = (receiver: string, triggerRefresh: boolean) => {
    const { user } = useStore();
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    const fetchDirectMessages = useCallback(async () => {
        if (!user || !receiver) {
            return;
        }

        try {
            const response = await fetch(
                `/api/message/direct/${user.username}/${receiver}`
            );

            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages);
            } else {
                console.error(
                    "Failed to fetch direct messages:",
                    response.statusText
                );
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [user, receiver]);

    useEffect(() => {
        fetchDirectMessages();
    }, [fetchDirectMessages, triggerRefresh]);

    return { messages, fetchDirectMessages };
};

export default useFetchDirectMessages;
