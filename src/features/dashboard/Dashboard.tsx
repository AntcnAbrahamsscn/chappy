import { useEffect, useState } from "react";
import "./dashboard.css";
import useStore from "../../data/store.js";
import { ChannelInterface } from "../../models/ChannelInterface.js";
import { IoLockClosed, IoLockOpenOutline } from "react-icons/io5";
import { WithId } from "mongodb";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../models/UserInterface.js";

const Dashboard = () => {
    // TODO: Lägg till detta i zustand
    const [channels, setChannels] = useState<ChannelInterface[]>([]);
    const [usersList, setUsersList] = useState<UserInterface[]>([]);
    const { user } = useStore();
    const navigate = useNavigate();

    // TODO: Lyfta ut denna i egen fil
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

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("JWT-TOKEN");

            try {
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user ? `Bearer ${token}` : "",
                    },
                };

                const response = await fetch("/api/user", options);

                if (!response.ok) {
                    throw new Error("Failed to fetch channels");
                }

                const data = await response.json();
                const filteredUsers = user
                    ? data.filter(
                          (u: UserInterface) => u.username !== user.username
                      )
                    : data;
                setUsersList(filteredUsers);
            } catch (error) {
                console.error("Error fetching channels", error);
            }
        };

        fetchUsers();
    }, [user]);

    const goToDirectMessage = (username: string) => {
        navigate(`/message/${username}`);
    };

    const goToChannel = (channel: WithId<ChannelInterface>) => {
        if (channel.canAccess) {
            navigate(`/channel/${channel._id}`);
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
                    <div className="dm-container">
                        <h3>Private Messages</h3>
                        {usersList.length > 0 ? (
                            usersList.map((user) => (
                                <p
                                    className="list-container"
                                    onClick={() =>
                                        goToDirectMessage(user.username)
                                    }
                                    key={user._id.toString()}
                                >
                                    {user.username}
                                </p>
                            ))
                        ) : (
                            <p>No users available for messaging</p>
                        )}
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
