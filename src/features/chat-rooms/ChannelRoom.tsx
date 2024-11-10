import { useParams } from "react-router-dom";
import useFetchChannelMessages from "../../hooks/useFetchChannelMessages.js";
import useFetchChannel from "../../hooks/useFetchChannel.js";
import useStore from "../../data/store.js";
import "./chat-styles.css";
import ChatInputField from "./ChatInputField.js";
import { useEffect, useRef } from "react";
// import { useState } from "react";

const Channel = () => {
    const { id } = useParams<{ id: string }>();
    // const { user } = useStore();
    // TODO: Lägg till fungerande loading etc.
    // TODO: Lägg till fungerande loading etc.
    const { channel } = useFetchChannel(id!);
    // För att ladda om när nytt meddelande är skrivet
    // const [refreshToggle, setRefreshToggle] = useState(false);
    // const refreshMessages = () => setRefreshToggle(!refreshToggle);
    const { user, messageRefreshTrigger } = useStore();
    const { messages, fetchMessages } = useFetchChannelMessages(
        id!,
        messageRefreshTrigger
    );

    const scrollableRef = useRef<HTMLDivElement>(null);

    // const { messages, fetchMessages } = useFetchChannelMessages(id!);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages, messageRefreshTrigger]);

    useEffect(() => {
        if (scrollableRef.current) {
            scrollableRef.current.scrollTop =
                scrollableRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="channel-container">
            {channel ? (
                <div className="message-header-container">
                    <div className="profile-image"></div>
                    <p className="direct-message-header">{channel.name}</p>
                </div>
            ) : (
                <p>No channel found.</p>
            )}
            <div className="messages-container" ref={scrollableRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message-section ${
                            user?.username === msg.sender
                                ? "own-message"
                                : "other-message"
                        }`}
                    >
                        <div
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
                        </div>
                    </div>
                ))}
            </div>
            <ChatInputField />
        </div>
    );
};

export default Channel;
