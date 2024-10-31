import { useEffect, useState } from "react";
import useStore from "../data/store.js";
import { MessageInterface } from "../models/MessageInterface.js";

const useFetchDirectMessages = (receiver: string) => {
    const { user } = useStore();
    const [messages, setMessages] = useState<MessageInterface[]>([]);

    useEffect(() => {
        const fetchDirectMessages = async () => {
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
                }
            } catch (error) {
                console.error("errror fetching messages:", error);
            }
        };

        fetchDirectMessages();
    }, [user, receiver]);

    return { messages };
};

export default useFetchDirectMessages;
