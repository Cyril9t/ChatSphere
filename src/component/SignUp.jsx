import { Link, replace, useNavigate } from "react-router-dom"
import "../casecades/signUp.css"
import { auth } from "../auth/firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect, useRef, act } from "react"
import { BeatLoader } from "react-spinners"

export function SignUp() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirm, setConfirm] = useState("");
    const [name, setName] = useState("");
    const [count, setCount] = useState(100);
    const [alert, setAlert] = useState("");
    const [showPass, setshowPass] = useState(true);
    const [isLoading, setIsLoading] = useState()
    const navigate = useNavigate();
    const progressRef = useRef(null);


    useEffect(() => {
        if (!alert) return;

        const timer = setInterval(() => {
            if (count <= 0) return;
            setCount((prev) => prev - 1);
            // console.log(count);
        }, 20)

        return () => clearInterval(timer);
    }, [alert, count]);

    if (count <= 0) progressRef.current.classList.add("hide")


    const signUp = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        if (!email || !password || !name) {
            setAlert("⚠️Inputs must not be empty");
            setCount(100);
            setIsLoading(false);
            clearErrorModal();
            return;
        }


        if (confirm !== password) {
            setAlert("Password Not Matched");
            setCount(100)

            progressRef.current.classList.remove("hide");
            setIsLoading(false);
            return;
        }

        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = credentials.user

            if (user) {
                setAlert("Success ✅");
                setCount(100)
                clearErrorModal();
                navigate("/login", { replace: true })
                // console.log(user);
            }


        } catch (err) {
            console.log("signIn Error", err);
            if (err.code === "auth/network-request-failed") {
                setAlert("⚠️Network Error");
                setCount(100)
                clearErrorModal();
            } else if (err.code === "auth/weak-password") {
                setAlert("⚠️Password should be at least 6 characters");
                setCount(100)
                progressRef.current.classList.remove("hide")
            } else if (err.code === "auth/email-already-in-use") {
                setAlert("⚠️User already exist");
                setCount(100)
                clearErrorModal();
            }
        }
    }


    const googleSignIn = async () => {

        const provider = new GoogleAuthProvider();

        try {
            const account = await signInWithPopup(auth, provider);
            const user = account.user;

            if (user) {
                console.log("signIn with Google Success")
            }
        } catch (err) {
            console.log("error from Google SignIn", err);
            if (err.code === "auth/internal-error") {
                setAlert("⚠️Network Error");
                setCount(100)
                clearErrorModal();
            }
        } finally {
            setIsLoading(false);
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
                    <p className="info">
                        {alert}
                    </p>
                </div>
                <div style={{ transform: `scaleX(${count}%)` }}></div>
            </div>}


            <nav className="navbar">
                <div className="nav-logo">ChatSphere</div>
                <div className="nav-right">
                    <span className="nav-text">Already have an account?</span>
                    <Link to="/login" className="nav-signin">Sign In</Link>
                </div>
            </nav>





            <main className="main-content">


                <div className="leftie">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Connect across<br />
                            <span className="hero-highlight">dimensions.</span>
                        </h1>
                        <p className="hero-description">
                            The world's first luminous chat experience designed<br />
                            for deep focus and effortless connection. Join the<br />
                            sphere today.
                        </p>
                    </div>

                    <div className="hero-card">
                        <div className="hero-image-wrapper">
                            <img src="Blob_1.jpg" alt="AI Blob" className="hero-blob" />
                        </div>
                        <div className="hero-card-footer">
                            <div className="hero-card-icon">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4l3 3" />
                                </svg>
                            </div>
                            <div className="hero-card-text">
                                <span className="hero-card-title">AI-Powered Synthesis</span>
                                <span className="hero-card-subtitle">Never miss a beat in long conversations.</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-card ">
                    <form onSubmit={signUp} >
                        <h2 className="form-title">Create your account</h2>
                        <p className="form-subtitle">Start your journey into the Luminous Workspace.</p>


                        <div className="social-buttons">
                            <div className="social-btn" onClick={() => {
                                googleSignIn()
                            }}>

                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 1 1 0-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                                </svg> Google
                            </div>

                        </div>

                        <div className="divide">
                            <span>OR CONTINUE WITH EMAIL</span>
                        </div>

                        <div className="form-row ">

                            <div className="form-group">

                                <label className="form-label">NAME</label>



                                <input type="text"
                                    className="form-input"
                                    placeholder="Alex Rivera"

                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                            </div>




                        </div>

                        <div className="form-group full-width">
                            <label className="form-label">EMAIL ADDRESS</label>
                            <div className="input-icon-wrapper">
                                <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <input type="email"
                                    className="form-input has-icon"
                                    placeholder="alex@sphere.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">PASSWORD</label>
                                <div className="input-icon-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input type={showPass ? "password" : "text"}
                                        className="form-input has-icon"
                                        placeholder="••••••••"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <button className="input-icon-right" type="button" onClick={() => {
                                        setshowPass(prev => !prev);
                                    }}>
                                        {!showPass ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">CONFIRM</label>
                                <div className="input-icon-wrapper">
                                    <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                    <input type={showPass ? "password" : "text"}
                                        className="form-input has-icon"
                                        placeholder="••••••••"
                                        onChange={(e) => {
                                            setConfirm(e.target.value);
                                        }}
                                    />
                                    <button className="input-icon-right" type="button" onClick={() => {
                                        setshowPass(prev => !prev);
                                    }}>
                                        {!showPass ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>}
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* <div className="terms-row">
                        <input type="checkbox" className="terms-checkbox" id="terms" />
                        <label htmlFor="terms" className="terms-label">
                            By signing up, I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>.
                        </label>
                     </div> */}


                        <button className="creates">
                            {isLoading ? <div className="laoding"> <BeatLoader size={10} color="white" /> </div> : <>Create Account  <i class="fas fa-user-plus"></i> </>}
                        </button>
                    </form>
                </div>



            </main>

            <footer className="footer">
                <div className="footer-brand">
                    <div className="footer-logo">ChatSphere</div>
                    <p className="footer-tagline">Elevating human connection<br />through design and luminous<br />technology.</p>
                </div>

                <div className="footer-col">
                    <div className="footer-col-title">PRODUCT</div>
                    <a href="#" className="footer-link">Features</a>
                    <a href="#" className="footer-link">Pricing</a>
                    <a href="#" className="footer-link">Security</a>
                </div>

                <div className="footer-col">
                    <div className="footer-col-title">COMPANY</div>
                    <a href="#" className="footer-link">About</a>
                    <a href="#" className="footer-link">Careers</a>
                    <a href="#" className="footer-link">Status</a>
                </div>

                <div className="footer-right">
                    <span className="footer-copy">© 2024 ChatSphere Inc.</span>
                    <div className="footer-icons">
                        <button className="footer-icon-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </button>
                        <button className="footer-icon-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </footer>
        </>
    )
}