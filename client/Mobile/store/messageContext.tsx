import { useSettings } from './settingsContext';
import { connectWS } from './ws';
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';

export type Message = {
    id: string;
    text: string;
    createdAt: number;
    sender: string;
};

type MessageContextType = {
    messages: Message[];
    sendMessage: (text: string, sender?: string) => void;
    deleteMessage: (id: string) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
    const { settings } = useSettings();
    const socket = useRef<any>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    // Connect WebSocket + Setup Listeners
    useEffect(() => {
        socket.current = connectWS();

        // When connected
        socket.current.on("connect", () => {
            console.log("Connected to socket.io");
        });

        // When message received from server
        socket.current.on("receive_message", (data: Message) => {
            console.log("Received:", data);
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    // Send message + update UI instantly
    const sendMessage = (text: string) => {
        const newMessage: Message = {
            id: Date.now() + "Ashok".toString(),
            text,
            createdAt: Date.now(),
            sender: settings.username,
        };
        socket.current.emit("send_message", newMessage);
    };

    const deleteMessage = (id: string) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

    return (
        <MessageContext.Provider value={{ messages, sendMessage, deleteMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useMessages = () => {
    const ctx = useContext(MessageContext);
    if (!ctx) throw new Error("Message context not found");
    return ctx;
};
