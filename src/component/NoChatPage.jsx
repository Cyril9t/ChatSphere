import "../casecades/noChat.css"
export function Nochat() {
    return (
        <div className="selectPage">
            <div className="content">
                <div className="no-chat-icon">
                    <i className="fas fa-comments chatIc"></i>
                </div>
                <div className="no-chat-content">
                    <h1>Welcome to ChatSpere</h1>
                    <p className="instruction">
                        Select a chat from the sidebar to start messaging, or create a new conversation.
                    </p>
                </div>
                <div className="no-chat-actions">
                    <button className="startChat">
                        <i className="fas fa-user-plus"></i> Start new Chat
                    </button>
                </div>
            </div>
        </div>
    )
}