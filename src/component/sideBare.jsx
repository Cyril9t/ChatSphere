import { useState } from "react"
import { useChatContext } from "../Contexts/ChatContext";

export function Sidebar() {
    const { chats, setActiveChatId } = useChatContext()

    return (

        <div className="sidebar">
            <div className="user-profile">
                <div className="user-info">
                    <h1>Messages</h1>
                    <p>Alexa rule</p>
                </div>
                <button className="new-chat-btn">+ New Chat</button>
            </div>

            <div className="chat-tabs">
                <button className="tab active">

                    <i className="fas fa-comment-alt"></i>


                    <span>All chats</span> </button>
                <button className="tab">
                    <i className="fas fa-comments"></i>

                    <span> Groups </span>
                </button>
                <button className="tab">
                    <i className="fas fa-archive"></i>
                    <span> Archived</span></button>
                <button className="tab">
                    <i className="fas fa-star"></i>

                    <span> Favorites</span> </button>
            </div>

            {/* ChatLists */}
            <div className="chat-list">
                {/* ChatItem */}
                {chats.map((chat, index) => (

                    <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className="chat-item">
                        <div className="avatar">
                            <img src={chat.profilePic} alt={chat.name} className="avatar" />
                        </div>

                        <div className="chat-preview">
                            <div className="chat-name">
                                <span>{chat.name}</span>

                                <span>{chat.message[chat.message.length - 1].time}</span>
                            </div>
                            <div className="preview-text">{chat.message[chat.message.length - 1].text}</div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}