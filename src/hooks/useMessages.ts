// // src/hooks/useMessages.ts

// import { useEffect, useState } from "react";
// import { MessageInterface } from "../models/MessageInterface";

// interface UseMessagesReturn {
//     messages: MessageInterface[];
//     loading: boolean;
//     error: string | null;
// }

// const useMessages = (channelId: string): UseMessagesReturn => {
//     const [messages, setMessages] = useState<MessageInterface[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const response = await fetch(`/api/message/${channelId}`);
//                 if (response.ok) {
//                     const data: MessageInterface[] = await response.json();
//                     setMessages(data);
//                 } else {
//                     setError(
//                         `Failed to fetch messages: ${response.statusText}`
//                     );
//                 }
//             } catch (err) {
//                 setError(`Error fetching messages: ${err.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchMessages();
//     }, [channelId]);

//     return { messages, loading, error };
// };

// export default useMessages;
