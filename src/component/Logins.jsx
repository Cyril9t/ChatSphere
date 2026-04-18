import '../casecades/Login.css'; // adjust path
import { Link, replace, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { BeatLoader } from 'react-spinners';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export function LoginPage() {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [count, setCount] = useState(100);
    const [alert, setAlert] = useState("");
    const [isPass, setIsPass] = useState(true);
    const [isLoader, setIsLoader] = useState()

    const progressRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!alert) return;
        const timer = setInterval(() => {
            if (count <= 0) return;
            setCount((prev) => prev - 1);
            // console.log(count);
        }, 20)
        return () => clearInterval(timer);
    }, [alert, count]);

    if (count <= 0) progressRef.current.classList.add("hide");

    const signIn = async (e) => {

        e.preventDefault();
        setIsLoader(true);
        if (!email || !password) {
            setAlert("⚠️Input must not be empty")
            setCount(100);
            clearErrorModal()
            setIsLoader(false);
            return;

        }
        try {
            const data = await signInWithEmailAndPassword(auth, email, password);
            const user = data.user;
            if (user) {
                setAlert("Login Success ✅")
                setCount(100);
                clearErrorModal()
                navigate("/chat", { replace: true })
            }
        } catch (err) {
            console.log("erro from Login", err)
            if (err.code === "auth/network-request-failed") {
                setAlert("⚠️Network Error")
                setCount(100);

                clearErrorModal();
            } else if (err.code === "auth/invalid-credential") {
                setAlert("⚠️Wrong credentials")
                setCount(100);

                clearErrorModal();
            }
        } finally {
            setIsLoader(false);
        }
    }


    const googleSignIn = async () => {
        try {

            const provider = new GoogleAuthProvider();

            const credentials = await signInWithPopup(auth, provider);
            const user = credentials.user;

            if (user) {
                setAlert("Google SignIn Success");
                setCount(100);
                progressRef.current.classList.remove("hide")
            }

        } catch (err) {
            console.log("erro from google Login", err)
            if (err.code === "auth/network-request-failed") {
                setAlert("⚠️Network Error")
                setCount(100);
                progressRef.current.classList.remove("hide")
            }
        }
    }

    function clearErrorModal() {
        if (count <= 0) progressRef.current.classList.remove("hide")
    }

    return (

        <>

            {alert && <div ref={progressRef} className="modal-wrapper">
                <div>
                    <section className="exit">
                        <button className="remove" onClick={() => {
                            progressRef.current.classList.add("hide")
                        }}>
                            &times;
                        </button>
                    </section>
                    <p className='info'>
                        {alert}
                    </p>
                </div>
                <div style={{ transform: `scaleX(${count}%)` }}></div>
            </div>}

            <nav className="navbar">
                <div className="nav-logo">ChatSphere</div>
                <div className="nav-right">
                    <span className="nav-text">Don't have an account?</span>
                    <Link to="/signUp" className="nav-cta">Get Started</Link>
                </div>
            </nav>


            <main className="main-content">
                <div className="form-card">
                    <form onSubmit={signIn}>


                        <h2 className="form-title">Welcome back</h2>
                        <p className="form-subtitle">Please enter your details to sign in</p>


                        <div className="form-group">
                            <label className="form-label">EMAIL OR USERNAME</label>
                            <div className="input-icon-wrapper">
                                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input type="email" className="form-input" placeholder="alex@sphere.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}

                                />
                            </div>
                        </div>


                        <div className="form-group">
                            <div className="label-row">
                                <label className="form-label">PASSWORD</label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>
                            <div className="input-icon-wrapper">
                                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                                <input type={isPass ? "password" : "text"} className="form-input" placeholder="••••••••"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}

                                />
                                <button className="input-icon-right" type="button" onClick={() => {
                                    setIsPass(prev => !prev)
                                }}>
                                    {!isPass ?
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>}
                                </button>
                            </div>
                        </div>

                        <div className="remember-row">
                            <input type="checkbox" className="remember-checkbox" id="remember" />
                            <label htmlFor="remember" className="remember-label">Remember me for 30 days</label>
                        </div>

                        <button className="signin-btn"

                        >
                            {isLoader ? <div className="laoding"> <BeatLoader size={10} color="white" /> </div> : <>Sign In  <i class="fas fa-sign-in-alt"></i> </>}
                        </button>


                        <div className="divider">
                            <span>OR CONTINUE WITH</span>
                        </div>


                        <div className="social-buttons">
                            <button className="social-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                                </svg>
                                <span>Google</span>
                            </button>
                            {/* <button className="social-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <span>Apple</span>
                        </button> */}
                        </div>

                    </form>
                </div>
            </main>

            <footer className="footer">
                <span className="footer-copy">© 2024 ChatSphere Inc.</span>
                <div className="footer-links">
                    <a href="#" className="footer-link">Privacy</a>
                    <a href="#" className="footer-link">Terms</a>
                    <a href="#" className="footer-link">Security</a>
                    <a href="#" className="footer-link">Status</a>
                </div>
            </footer>

        </>
    );
};