import "../casecades/Chat.css"

import { useState, useEffect, useRef, useContext } from "react";
import { Nochat } from "./NoChatPage";
import { Sidebar } from "./sideBare";
import { Chats } from "./ChatsBox";
import { ProfileData } from "./profile";
import { useChatContext } from "../Contexts/ChatContext"

export function ChatMessage() {

  const { activeChatId, profileToggle, setShowBtn } = useChatContext()
  const chatListRef = useRef(null);
  const profileRef = useRef(null);

  const chatWindowRef = useRef(null)
  // console.log(activeChatId);

  if (activeChatId) {
    chatListRef.current?.classList.add("visible")
    chatWindowRef.current?.classList.remove("visible")
    setShowBtn(true);
  } else {

    chatListRef.current?.classList.remove("visible")
    chatWindowRef.current?.classList.add("visible")
    setShowBtn(false);

  }


  useEffect(() => {

    // if (profileRef.current) return;

    if (profileToggle) {
      profileRef.current?.classList.remove("showProfile");
      chatWindowRef.current?.classList.add("visible")
      console.log(profileToggle)
      console.log("hello")
    } else {
      profileRef.current?.classList.add("showProfile");
      console.log(profileToggle);
    }
  }, [profileToggle]);


  return (

    <div className="chat-app">
      {/* Sidebar */}

      <div ref={chatListRef} className="sidebar">
        <Sidebar />
      </div>

      {/* Main chat area */}
      <div ref={chatWindowRef} className="main-chat">
        <Chats />
      </div>

      {/* User details panel */}
      <div ref={profileRef} className="user-details">
        <ProfileData />
      </div>

    </div >
  );
};