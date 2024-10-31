import { useState, useEffect } from "react";
import { ChannelInterface } from "../models/ChannelInterface";

const useFetchChannel = (id: string) => {
    const [channel, setChannel] = useState<ChannelInterface | null>(null);

    useEffect(() => {
        const fetchChannel = async () => {
            const token = localStorage.getItem("JWT-TOKEN");

            try {
                const response = await fetch(`/api/channel/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token ? `Bearer ${token}` : "",
                    },
                });

                if (response.ok) {
                    const data: ChannelInterface = await response.json();
                    setChannel(data);
                }
            } catch (error) {
                console.error("Failed to fetch channel:", error);
            }
        };

        fetchChannel();
    }, [id]);

    return { channel };
};

export default useFetchChannel;
