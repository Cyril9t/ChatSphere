import "../casecades/Chat.css"

// /Chat.css"
import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { Nochat } from "./NoChatPage";
import { Sidebar } from "./sideBare";
import { Chats } from "./ChatsBox";
import { ProfileData } from "./profile";

export function ChatMessage() {
  const [isShow, setIsShow] = useState(true);
  const [message, setMessage] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [allChat, setAllChat] = useState();
  const [showChat, setShowChat] = useState(true);
  const [filesSent, setFilesSent] = useState(false);
  const [preview, setPreview] = useState(null);
  const [sentDM, setSentDM] = useState({})


  const handleFiles = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return
    }

    const fileType = file.type;

    if (fileType.startsWith("image/")) {
      console.log("image")
    } else if (fileType.startsWith("video/")) {
      console.log("video");
    } else {
      alert("Unsoppted format")
    }

    const previewUrl = URL.createObjectURL(file);
    console.log(previewUrl);
    setPreview(previewUrl);
    setSentDM(prev => [...prev, { sentFile: previewUrl, typeofFiles: fileType }])
  }

  const target = useRef(null);

  const [users, setUsers] = useState([
    {
      id: 1234,
      name: "Sarah Mitchell",
      role: "user",
      profilePic: "Blob_1.jpg",
      message: [
        {
          id: 1,
          usermsg: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste amet reiciendis neque.",
          sendermsg: "",
          role: "user",
          time: "02:30am"
        }, {
          id: 2,
          usermsg: "",
          sendermsg: "Opsum dolor sit, amet consectetur adipisicing elit. Iste amet reiciendis neque.",
          role: "sender",
          time: "05:41pm"
        }
      ],
    },
  ]);

  useEffect(() => {
    if (message.length > 0) {
      setIsShow(false);
    } else {
      setIsShow(true)
    }

  }, [message]);



  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }

    setMessage("")
    // console.log(allChat);

  }
  const emojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
  }

  const chats = (ids) => {
    const checkForid = users.find((user) => user.id == ids);
    setAllChat(checkForid);
  }

  return (

    <div className="chat-app">

      {/* Sidebar */}

      <Sidebar users={users} setShowChat={setShowChat} chats={chats} />

      {/* Main chat area */}

      <Chats setUsers={setUsers} EmojiPicker={EmojiPicker} emojiClick={emojiClick} isShow={isShow} setShowPicker={setShowPicker} setMessage={setMessage} message={message} handleFiles={handleFiles} showChat={showChat} allChat={allChat} users={users} showPicker={showPicker} sendMessage={sendMessage} />

      {/* User details panel */}

      <ProfileData />
    </div >
  );
};