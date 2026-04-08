export function ProfileData() {
    return (
        <div className="user-details">
            <div className="profile-header">
                <div className="large-avatar">
                    <img src="Blob_2.jpg" alt="" className="large-avatar" />
                </div>
                <h3>Sarah Mitchell</h3>
                <p>Senior Product Designer</p>
            </div>

            <div className="section-title">SHARED IMAGES</div>
            <div className="shared-images">
                <div className="image-placeholder">📷</div>
                <div className="image-placeholder">📷</div>
                <div className="image-placeholder">📷</div>
                <div className="image-placeholder">📷</div>
                <div className="image-placeholder">📷</div>
                <div className="image-placeholder">📷</div>
            </div>
            <div className="section-title">SHARED FILES</div>
            <ul className="file-list">
                <li>📄 brian_goldstein_02.png</li>
                <li>📄 gpt3_4.png</li>
                <li>📄 gpt3_5.png</li>
                <li>📄 gpt3_6.png</li>
            </ul>

        </div>
    )
}