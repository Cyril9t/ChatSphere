import { useChatContext } from "../Contexts/ChatContext";
import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";

export function ProfileData() {
    const { activeChatId, chats, setProfileToggle, profileBtn } = useChatContext();
    const currentChat = chats.find((chats) => chats.id === activeChatId);
    const username = currentChat?.name?.split(" ")?.[0]?.toLowerCase() || "user";
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const log = await signOut(auth);
            if (log) {
                navigate("/", { replace: true });
            }
        } catch (err) {
            console.log("error from Logout", err.message)
        }
    }
    return (

        <div className="user-details">
            {!profileBtn ? (<section >
                <button className="back-btn" onClick={() => {
                    setProfileToggle(false);
                }}><i className="fas fa-arrow-left"></i>

                </button>
            </section>) : " "}
            <div className="profile-header">
                <div >
                    <img src={currentChat ? currentChat.profilePic : "Blob_1.jpg"} alt="" className="large-avatar" />
                </div>
                <h3>{currentChat?.name ?? null}</h3>
                <p className="role">Senior Product Designer</p>
                <div className="profile-meta">
                    <span className="status-pill">online</span>
                    <span className="username">@{username}</span>
                </div>
                <p className="bio">Voluptatum similique consequuntur, consequatur dolorum accusantium delectus. Repudiandae tenetur rerum rem.</p>
            </div>
            <div className="section-title">Shared media</div>
            <div className="shared-images">
                <div className="image-placeholder"><i className="fas fa-images"></i></div>
                <div className="image-placeholder"><i className="fas fa-images"></i></div>
                <div className="image-placeholder"><i className="fas fa-images"></i></div>
            </div>
            <div className="section-title">Shared files</div>
            <ul className="file-list">
                <li><i className="fas fa-file"></i> brian_goldstein_02.png</li>
                <li><i className="fas fa-file"></i> brian_goldstein_02.png</li>
                <li><i className="fas fa-file"></i> brian_goldstein_02.png</li>
            </ul>
            <div className="profile-actions">
                <button className="control logout" onClick={() => {
                    logout();
                }} > <i className="fas fa-sign-out"></i> Logout</button>
                <button className="control block"> <i className="fas fa-user-slash"></i> Block user</button>
            </div>
        </div >

    )
}