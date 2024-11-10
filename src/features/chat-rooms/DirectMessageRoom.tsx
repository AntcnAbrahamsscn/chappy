// DirectMessage.js
import { useParams } from "react-router-dom";
import useFetchDirectMessages from "../../hooks/useFetchDirectMessages.js";
import "./chat-styles.css";
// import ChatInputField from "./ChatInputField.js";
import useStore from "../../data/store.js";
import { useEffect } from "react";
import ChatInputField from "./ChatInputField.js";

const DirectMessage = () => {
    const { receiver } = useParams<{ receiver: string }>();
    const { user, messageRefreshTrigger } = useStore();
    const { messages, fetchDirectMessages } = useFetchDirectMessages(
        receiver!,
        messageRefreshTrigger
    );

    useEffect(() => {
        fetchDirectMessages();
    }, [fetchDirectMessages, messageRefreshTrigger]);

    return (
        <div className="channel-container">
            {receiver ? (
                <div className="message-header-container">
                    <div className="profile-image"></div>
                    <div>
                        <p className="direct-message-header">{receiver}</p>
                    </div>
                </div>
            ) : (
                <p>No channel found.</p>
            )}{" "}
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
                        <div
                            className={
                                user?.username === msg.sender
                                    ? "user-message-container"
                                    : "message-container"
                            }
                        >
                            {msg.content}
                            <div className="message-details">
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

export default DirectMessage;
