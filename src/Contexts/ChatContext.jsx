import { createContext, useContext, useState } from "react";
import { users } from "../Data/UserData";

const ChatContext = createContext(null);

export const ChatContextProvider = ({ children }) => {
    const [chats, setChats] = useState(users);
    const [activeChatId, setActiveChatId] = useState(null);
    const [profileToggle, setProfileToggle] = useState(false);
    const [showBtn, setShowBtn] = useState(false)
    const [profileBtn, setProfileBtn] = useState(false)


    return (
        <ChatContext.Provider value={{ activeChatId, setActiveChatId, chats, setChats, profileToggle, setProfileToggle, setShowBtn, showBtn, profileBtn, setProfileBtn }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("Chatcontext must be within the context provider");
    }
    return context;
}