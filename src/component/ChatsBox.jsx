import { Nochat } from "./NoChatPage"
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect } from "react"
import { useChatContext } from "../Contexts/ChatContext";
import { useRef } from "react";
import { PulseLoader } from "react-spinners";
import { data } from "react-router-dom";

export function Chats() {

    const [isSent, setIsent] = useState(false);
    const [messageText, setMessageText] = useState("")
    const [showEmojiPanel, setShowEmojiPanel] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const { activeChatId, chats, setChats, setActiveChatId, setProfileToggle, showBtn } = useChatContext();

    const activeChat = chats.find((chat) => chat.id === activeChatId);

    const newMessage = {
        id: activeChat?.message.length + 1,
        text: messageText,
        photo: null,
        sender: "me",
        time: new Date().toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", hour12: true })
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText) return;
        setChats((prevChats) => prevChats.map((chat) => chat.id === activeChatId ? { ...chat, message: [...chat.message, newMessage] } : chat))
        setMessageText("");
    }

    const handlFiles = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }

        // Check if file is supported (image, video, or audio)
        const supportedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav', 'audio/ogg'];

        if (!supportedTypes.includes(file.type)) {
            alert('Unsupported file type! Only images, videos, and audio files are supported.');
            return;
        }

        const preview = URL.createObjectURL(file);

        // Determine file type
        let fileType = '';
        if (file.type.startsWith('image/')) fileType = 'image';
        else if (file.type.startsWith('video/')) fileType = 'video';
        else if (file.type.startsWith('audio/')) fileType = 'audio';

        const fileMessage = {
            id: activeChat?.message.length + 1,
            text: '',
            fileType: fileType,
            filePreview: preview,
            fileName: file.name,
            sender: "me",
            time: new Date().toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", hour12: true })
        };

        setChats((prevChats) => prevChats.map((chat) =>
            chat.id === activeChatId ? { ...chat, message: [...chat.message, fileMessage] } : chat
        ));
        setIsent(false);
    }

    const handleClick = () => {
        if (activeChatId) {
            setProfileToggle(true);
        } else {
            setProfileToggle(false);
        }
    }


    const onEmojiClick = (emojiData) => {
        setMessageText((prevText) => prevText + emojiData.emoji);
    }

    const handleAudioPlay = (audioElement, audioMessageElement) => {
        const playBtn = audioMessageElement.querySelector('.audio-play-btn i');
        const waveform = audioMessageElement.querySelector('.audio-waveform');
        const duration = audioMessageElement.querySelector('.audio-duration');

        if (audioElement.paused) {
            audioElement.play();
            playBtn.className = 'fas fa-pause';
            audioMessageElement.classList.add('playing');
        } else {
            audioElement.pause();
            playBtn.className = 'fas fa-play';
            audioMessageElement.classList.remove('playing');
        }

        // Update duration display
        audioElement.addEventListener('timeupdate', () => {
            const minutes = Math.floor(audioElement.currentTime / 60);
            const seconds = Math.floor(audioElement.currentTime % 60);
            duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });

        audioElement.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audioElement.duration / 60);
            const seconds = Math.floor(audioElement.duration % 60);
            duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });

        audioElement.addEventListener('ended', () => {
            playBtn.className = 'fas fa-play';
            audioMessageElement.classList.remove('playing');
        });
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(blob);

                const audioMessage = {
                    id: activeChat?.message.length + 1,
                    text: '',
                    fileType: 'audio',
                    filePreview: audioUrl,
                    fileName: 'Voice message.wav',
                    sender: "me",
                    time: new Date().toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", hour12: true })
                };

                setChats((prevChats) => prevChats.map((chat) =>
                    chat.id === activeChatId ? { ...chat, message: [...chat.message, audioMessage] } : chat
                ));

                // Stop all tracks to release the microphone
                stream.getTracks().forEach(track => track.stop());
            };

            setRecordedChunks(chunks);
            setMediaRecorder(recorder);
            recorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return (
        <>
            {activeChatId ? (<div className="main-chat">
                <div className="chat-header">
                    {showBtn ? (<button className="back-btn" onClick={() => {
                        setActiveChatId(null)
                    }}>

                        <i className="fas fa-arrow-left"></i>

                    </button>) : " "}
                    <div className="contact-info infos" onClick={handleClick}>
                        <div className="avat">
                            <img src={activeChat.profilePic} alt="" className="avatar" />

                        </div>
                        <div>
                            <h2>{activeChat?.name}</h2>
                            <div className="active">

                                <p>typing </p>
                                <di>
                                    <PulseLoader size={9} color="#8B5CF6" />
                                </di>

                            </div>

                        </div>
                    </div>
                    <div className="header-actions">
                        <button className="icon-btn"><i className="fas fa-phone"></i></button>
                        <button className="icon-btn">
                            <i className="fas fa-camera "></i>
                        </button>
                        <button className="icon-btn"><i className="fas fa-search"></i></button>
                    </div>
                </div>
                <div className="messages">
                    {activeChat?.message?.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender === "user" ? "received" : "sent"}`} >
                            <div className="message-bubble">
                                {msg.text && <p>{msg.text}</p>}

                                {msg.fileType === 'image' && (
                                    <img src={msg.filePreview} alt={msg.fileName} style={{ maxWidth: '200px', borderRadius: '8px' }} />
                                )}

                                {msg.fileType === 'video' && (
                                    <video width="200" height="200" controls style={{ borderRadius: '8px' }}>
                                        <source src={msg.filePreview} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {msg.fileType === 'audio' && (
                                    <div>
                                        <audio controls style={{ display: 'none' }} ref={(el) => {
                                            if (el) {
                                                el.addEventListener('loadeddata', () => {
                                                    const audioMessage = el.nextElementSibling;
                                                    const playBtn = audioMessage.querySelector('.audio-play-btn');
                                                    const duration = audioMessage.querySelector('.audio-duration');

                                                    // Set initial duration
                                                    const minutes = Math.floor(el.duration / 60);
                                                    const seconds = Math.floor(el.duration % 60);
                                                    duration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

                                                    playBtn.onclick = () => handleAudioPlay(el, audioMessage);
                                                });
                                            }
                                        }}>
                                            <source src={msg.filePreview} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                        <div className="audio-message">
                                            <button className="audio-play-btn">
                                                <i className="fas fa-play"></i>
                                            </button>
                                            <div className="audio-waveform">
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                                <div className="wave-bar"></div>
                                            </div>
                                            <div className="audio-duration">0:00</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <span className="message-time">10:03am</span>
                        </div>
                    ))}
                </div>

                {showEmojiPanel && (<div className="emoji-panel"> <EmojiPicker onEmojiClick={onEmojiClick} /> </div>)}

                <form onSubmit={handleSendMessage}>
                    <div className="text">
                        <section className="extraFiles">
                            <label className="plus" >
                                <i className="fas fa-circle-plus"></i>
                                <input type="file" hidden onChange={handlFiles} accept="image/*,video/*,audio/*" />
                            </label>
                            <div className="emoji"
                                onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                            >
                                <i className="fas fa-smile"></i>
                            </div>
                        </section>
                        <input type="text"
                            placeholder="Type in your Message..." className="input"
                            value={messageText}
                            onChange={(e) => {
                                setMessageText(e.target.value)
                                console.log(messageText)
                            }}
                        />
                        <div className="foward">
                            <section className="share">
                                {!messageText ?
                                    <div className={`mic ${isRecording ? 'recording' : 'off'}`}
                                        onClick={isRecording ? stopRecording : startRecording}>
                                        <i className={`fas ${isRecording ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                                        {isRecording && <div className="recording-indicator"></div>}
                                    </div> :
                                    <button className="send paperPlane"
                                    ><i className="fas fa-paper-plane"></i></button>}
                            </section>
                        </div>
                    </div>
                </form>

            </div>) : <Nochat />}
        </>
    )
}