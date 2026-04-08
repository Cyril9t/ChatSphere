export function Sidebar({ users, setShowChat, chats }) {

    return (

        <div className="sidebar">
            <div className="user-profile">
                <div className="user-info">
                    <h3>Alex Rivera</h3>
                    <p>Other</p>
                </div>
                <button className="new-chat-btn">+ New Chat</button>
            </div>

            <div className="chat-tabs">
                <button className="tab active">

                    <i className="fas fa-comment-alt"></i>


                    <span> All chats</span> </button>
                <button className="tab">
                    <i className="fas fa-comments"></i>

                    <span> Groups </span>
                </button>
                <button className="tab">
                    <i className="fas fa-archive"></i>
                    <span> Archived</span>Archived</button>
                <button className="tab">
                    <i className="fas fa-star"></i>

                    <span> Favorites</span> </button>
            </div>

            <div className="chat-list">
                {users?.map((user) => {

                    return (
                        <div className="chat-item" onClick={() => {
                            setShowChat(false);

                            chats(user.id);
                        }} key={user.id}>
                            <div className="avatar">
                                <img src={user.profilePic} alt="" className="avatar" />
                            </div>

                            <div className="chat-preview">
                                <div className="chat-name">
                                    <span>{user.name}</span>

                                    <span>{user.message[user.message.length - 1].time}</span>
                                </div>
                                <div className="preview-text">{user.message[user.message.length - 1].sendermsg}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}