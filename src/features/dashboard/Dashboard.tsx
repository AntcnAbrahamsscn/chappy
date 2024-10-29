import { useEffect, useState } from "react";
import "./dashboard.css";
import useStore from "../../data/store.js";
import { ChannelInterface } from "../../models/ChannelInterface.js";
import { IoLockClosed, IoLockOpenOutline } from "react-icons/io5";
import { WithId } from "mongodb";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    // TODO: Lägg till detta i zustand
    const [channels, setChannels] = useState<ChannelInterface[]>([]);
    const { user } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChannels = async () => {
            const token = localStorage.getItem("JWT-TOKEN");

            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user ? `Bearer ${token}` : "",
                    },
                };

                const response = await fetch("/api/channel", options);

                if (!response.ok) {
                    throw new Error("Failed to fetch channels");
                }

                const data = await response.json();

                // Sorterar channels
                const sortedChannels = data.channels.sort(
                    (
                        a: WithId<ChannelInterface>,
                        b: WithId<ChannelInterface>
                    ) => Number(a.isPrivate) - Number(b.isPrivate)
                );

                setChannels(sortedChannels);
            } catch (error) {
                console.error("Error fetching channels", error);
            }
        };

        fetchChannels();
    }, [user]);

    const goToChannel = (channel: WithId<ChannelInterface>) => {
        if (channel.canAccess) {
            navigate(`/dashboard/${channel._id}`);
        } else {
            alert("Create an account to get all channels");
        }
    };

    return (
        <div className="dashboard-container">
            <h2 id="user-header">
                Signed in as{" "}
                <strong className="gradient-text">
                    {user?.username || "Guest"}
                </strong>
            </h2>
            {user && (
                <div>
                    <h3>Private Messages</h3>
                    <div className="dm-container">
                        <div className="dm-header-time">
                            <p>Johanna Kassler</p>
                            <p className="message-preview">08:13</p>
                        </div>
                        <p className="message-preview">
                            Hello! Wanna eat food someday soon?
                        </p>
                    </div>
                    <div className="dm-container">
                        <div className="dm-header-time">
                            <p>Frank Burger</p>
                            <p className="message-preview">Tue</p>
                        </div>
                        <p className="message-preview">
                            Have you heard about the burger place around the
                            corner?
                        </p>
                    </div>
                    <div className="dm-container">
                        <div className="dm-header-time">
                            <p>Dejan Calzone</p>
                            <p className="message-preview">Sun</p>
                        </div>
                        <p className="message-preview">
                            Whats your favorite pizza?
                        </p>
                    </div>
                </div>
            )}

            <ul className="channel-list">
                <h3>Channels</h3>
                {channels.length > 0 ? (
                    channels.map((channel) => (
                        <p
                            onClick={() => goToChannel(channel)}
                            className="list-container"
                            key={channel._id.toString()}
                        >
                            {channel.name}
                            {!user && channel.isPrivate ? (
                                <IoLockClosed />
                            ) : (
                                <IoLockOpenOutline />
                            )}
                        </p>
                    ))
                ) : (
                    <p>No channels available</p>
                )}
            </ul>
        </div>
    );
};

export default Dashboard;
