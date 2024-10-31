import { useParams } from "react-router-dom";
import useFetchChannelMessages from "../../hooks/useFetchChannelMessages.js";
import useFetchChannel from "../../hooks/useFetchChannel.js"; // Import the new hook
import useStore from "../../data/store.js";
import "./chat-styles.css";
import ChatInputField from "./ChatInputField.js";


const Channel = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useStore();
    // TODO: Lägg till fungerande loading etc.
    const {
        messages,

    } = useFetchChannelMessages(id!);
    
    // TODO: Lägg till fungerande loading etc.
    const {
        channel,
    } = useFetchChannel(id!);

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
            <div className="messages-container">
                {
                    messages.map((msg, index) => (
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
                                    <p>
                                        {new Date(msg.sentAt).toLocaleString()}{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <ChatInputField />
        </div>
    );
};

export default Channel;
