import './Timer.css'; // adjust path as needed

export function VerificationCodePage() {
    return (
        <div className="verification-card">
            {/* Brand header */}
            <div className="brand">
                <div className="brand-icon">✨</div>
                <div className="brand-name">ChatSphere</div>
                <div className="brand-sub">realtime</div>
            </div>

            {/* Main content */}
            <h1 className="verification-title">Enter Verification Code</h1>
            <div className="info-text">
                We've sent a 6-digit secure code to:
                <span className="email-masked"> alex.****@gmail.com</span>.<br />
                Please enter it below to continue.
            </div>

            {/* OTP inputs */}
            <div className="otp-container">
                <input type="number" className="otp-input" maxLength="1" defaultValue="8" />
                <input type="number" className="otp-input" maxLength="1" defaultValue="4" />
                <input type="number" className="otp-input" maxLength="1" />
                <input type="number" className="otp-input" maxLength="1" />
                <input type="number" className="otp-input" maxLength="1" />
                <input type="number" className="otp-input" maxLength="1" />
            </div>

            {/* Verify button */}
            <button className="verify-btn">Verify and Continue</button>

            {/* Resend section */}
            <div className="resend-row">
                <button className="resend-link">
                    Didn't receive the code? <span>Discover Code</span>
                </button>
                <div className="timer">31:54</div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="copyright">© 2024 ChatGPT Inc.</div>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Security Status</a>
                </div>
            </div>
        </div>
    );
};