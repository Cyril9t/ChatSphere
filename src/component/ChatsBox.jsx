import { Nochat } from "./NoChatPage"
import { useState, useRef } from "react"
export function Chats({ setUsers, showChat, allChat, users, showPicker, sendMessage, handleFiles, message, isShow, setMessage, setShowPicker, EmojiPicker, emojiClick }) {


    const newMessage = {
        id: "4",
        role: "sender",
        sendermsg: message,
        time: "03:4am"
    }


    return (
        <div className="main-chat">
            {showChat ? <Nochat /> :
                <>
                    <div className="chat-header">
                        <div className="contact-info infos">
                            <div className="avat">
                                <img src={allChat?.profilePic} alt="" className="avatar" />
                                <span className="online"></span>
                            </div>
                            <div>
                                <h2>{allChat?.name}</h2>
                                <p>Typing....</p>
                            </div>
                        </div>
                        <div className="header-actions">
                            <button className="icon-btn"><i className="fas fa-phone"></i></button>
                            <button className="icon-btn">
                                <i className="fas fa-camera"></i>
                            </button>
                            <button className="icon-btn"><i className="fas fa-search"></i></button>
                        </div>
                    </div>


                    {users?.map((user) => {
                        // user.message[user.message.length - 1].id
                        return (
                            <>
                                <div className="messages">
                                    {user.message.map((msg) => {
                                        (user.message[user.message.length - 1].id);
                                        return (
                                            <div key={msg.id}>
                                                {msg.role === "user" ?
                                                    <div className="message received" >
                                                        <div className="message-bubble">
                                                            {msg.usermsg}
                                                        </div>
                                                        <span className="message-time">{msg.time}</span>
                                                    </div>
                                                    :
                                                    <div className="message sent">
                                                        <div key={crypto.randomUUID()}>
                                                            <div className="message-bubble">
                                                                {msg.sendermsg}
                                                                {/* {sent?.sentFile && sent?.typeofFiles.startsWith("image/") && (<img src={sent?.sentFile} className="sentPics" alt={`File sent to ${allChat.name} `} />)}
                                                                        {sent?.sentFile && sent?.typeofFiles.startsWith("video/") && (
                                                                            <video width="310" height="190" controls  >
                                                                            <source src={sent?.sentFile} type="video/mp4" />
                                                                            </video>
                                                                            )} */}
                                                            </div>
                                                            <span className="message-time">10:45 AM</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        )
                    })}


                    {showPicker && (
                        <div className="emoji-panel">
                            <EmojiPicker onEmojiClick={emojiClick} />
                        </div>
                    )}


                    <form onSubmit={(e) => {
                        e.preventDefault();
                        sendMessage;

                        setUsers(prev => prev.map(msgs => {
                            if (msgs.id == user.message[user.message.length - 1].id) {
                                return {
                                    ...msgs,
                                    message: prev => [...prev, {
                                        id: "4",
                                        role: "sender",
                                        sendermsg: message,
                                        time: "03:4am"
                                    }]
                                }

                            } else {
                                console.log("id didnt matched")
                            }
                            console.log(user.message[user.message.length - 1].id)
                            console.log(msgs)
                            return msgs;
                        }))



                    }}>
                        <div className="text">
                            <section className="extraFiles">
                                <label className="plus" >
                                    <i className="fas fa-circle-plus"></i>
                                    <input type="file" hidden onChange={handleFiles} />
                                </label>
                                <div className="emoji" onClick={() => setShowPicker(!showPicker)}>
                                    <i className="fas fa-smile"></i>
                                </div>
                            </section>
                            <input type="text"
                                value={message}
                                placeholder="Type in your Message..." className="input"
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                            />
                            <div className="foward">
                                <section className="share">
                                    {isShow ? <div className="mic off">
                                        <i className="fas fa-microphone"></i>
                                        {/* <i class="fas fa-microphone-slash"></i> */}
                                    </div> : <button className="send paperPlane" onClick={() => {
                                        setShowPicker(false)
                                    }}><i className="fas fa-paper-plane"></i></button>}
                                </section>
                            </div>
                        </div>
                    </form>

                </>}
        </div>
    )
}