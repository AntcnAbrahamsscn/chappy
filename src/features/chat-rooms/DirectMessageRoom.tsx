// DirectMessage.js
import { useParams } from "react-router-dom";
import useFetchDirectMessages from "../../hooks/useFetchDirectMessages.js";
import "./chat-styles.css";
import ChatInputField from "./ChatInputField.js";

const DirectMessage = () => {
    const { receiver } = useParams<{ receiver: string }>();
    // TODO: Lägg till Loading etc!
    const { messages } = useFetchDirectMessages(receiver!);

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
                { messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-section ${
                                msg.sender === receiver
                                    ? "own-message"
                                    : "other-message"
                            }`}
                        >
                            <p
                                className={
                                    msg.sender === receiver
                                        ? "user-message-container"
                                        : "message-container"
                                }
                            >
                                {msg.content}
                                <div className="message-details">
                                    <p>
                                        {new Date(msg.sentAt).toLocaleString()}{" "}
                                    </p>
                                </div>
                            </p>
                        </div>
                    ))
                }
            </div>
            <ChatInputField />
        </div>
    );
};

export default DirectMessage;
