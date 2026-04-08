import '../casecades/Home.css'
import { Link } from 'react-router-dom';
export function LandingPage() {
    return (
        <div>
            <div className="container">
                {/* Navbar */}
                <div className="navbar">
                    <div className="brand">
                        <div className="brand-icon">✨</div>
                        <div className="brand-name">ChatSphere</div>
                    </div>
                    <div className="nav-links">
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                        <a href="#">Security</a>
                        <a href="#">Support</a>
                    </div>
                    <Link to="/login">
                        <button className="btn-outline">Sign In</button>
                    </Link>
                </div>

                {/* Hero */}
                <div className="hero">
                    <h1>Connect Instantly With Anyone, Anywhere</h1>
                    <p>The most generation of seamless communication. Secured with military-grade encryption, designed for ultimate clarity.</p>
                </div>

                {/* Experience Communication Redefined */}
                <div className="section">
                    <h2 className="section-title">Experience Communication Redefined</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Readiness Monitoring</h3>
                            <ul className="feature-list">
                                <li>Live monitoring</li>
                                <li>Monitor in real-time</li>
                                <li>Track performance</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3>Group Chats</h3>
                            <ul className="feature-list">
                                <li>Engage in private conversations</li>
                                <li>Share files and documents</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3>HD Video & Video</h3>
                            <ul className="feature-list">
                                <li>High-definition video conferencing</li>
                                <li>Collaborate seamlessly</li>
                                <li>Enjoy a professional experience</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3>End-to-end Encryption</h3>
                            <ul className="feature-list">
                                <li>Protect your data from unauthorized access</li>
                                <li>Ensure privacy and security</li>
                            </ul>
                        </div>
                        <div className="feature-card">
                            <h3>Native Data Modes</h3>
                            <ul className="feature-list">
                                <li>Support multiple file formats</li>
                                <li>Access data securely and efficiently</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Getting Started */}
                <div className="section">
                    <h2 className="section-title">Getting Started Is Effortless</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h4>Create Account</h4>
                            <p>Sign up to start using our platform instantly</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h4>Add Friends</h4>
                            <p>Connect with friends you already know or make new ones</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h4>Start Chatting</h4>
                            <p>Connect with people around the world</p>
                        </div>
                    </div>
                </div>

                {/* Simple Pricing */}
                <div className="section">
                    <h2 className="section-title">Simple Pricing For Everyone</h2>
                    <div className="pricing-grid">
                        <div className="pricing-card">
                            <h3>Free</h3>
                            <div className="price">$0 <span>/month</span></div>
                            <ul>
                                <li>Unlimited messaging</li>
                                <li>Unlimited text messages</li>
                                <li>Free forever</li>
                            </ul>
                            <button className="btn-primary">Get Started</button>
                        </div>
                        <div className="pricing-card">
                            <h3>Pro</h3>
                            <div className="price">$12 <span>/month</span></div>
                            <ul>
                                <li>Monthly messaging plan</li>
                                <li>Unlimited text messages</li>
                            </ul>
                            <button className="btn-primary">Choose Plan</button>
                        </div>
                        <div className="pricing-card">
                            <h3>Business</h3>
                            <div className="price">$39 <span>/month</span></div>
                            <ul>
                                <li>Monthly messaging plan</li>
                                <li>Unlimited text messages</li>
                                <li>Unlimited voice calls</li>
                            </ul>
                            <button className="btn-primary">Choose Plan</button>
                        </div>
                    </div>
                </div>

                {/* Trusted by / Testimonial */}
                <div className="section">
                    <div className="cta-row">
                        <p>Trusted by over 2 Million users worldwide.</p>
                        <button className="btn-primary">Join Now</button>
                    </div>
                    <div className="testimonial">
                        <p>"ChatSphere changed the way our remote team operates. The video call quality is simply unmatched by any other platform we've tried."</p>
                        <div className="testimonial-author">Marcus T.</div>
                    </div>
                    <div className="cta-row" style={{ paddingTop: '2rem' }}>
                        <p>Trusted by over 2 Million users worldwide.</p>
                        <button className="btn-primary">Join Now</button>
                    </div>
                </div>

                {/* FAQ */}
                <div className="section">
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <div className="faq-question">Is my data fully private?</div>
                            <div className="faq-answer">Yes, ChatSphere uses end-to-end encryption to protect your data at all times.</div>
                        </div>
                        <div className="faq-item">
                            <div className="faq-question">Can I use ChatSphere as a public channel?</div>
                            <div className="faq-answer">No, ChatSphere is not intended for public use.</div>
                        </div>
                        <div className="faq-item">
                            <div className="faq-question">What are ChatSphere plans?</div>
                            <div className="faq-answer">ChatSphere offers flexible pricing plans based on your needs.</div>
                        </div>
                    </div>
                </div>

                {/* Play Store badge */}
                <div className="store-badge">
                    {/* Placeholder for "PLAY_AND_INSTALL" badge - you can replace with actual image */}
                    <div style={{ background: '#1F2336', display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '2rem', color: '#E2E8FF', fontSize: '0.8rem' }}>
                        📱 PLAY_AND_INSTALL
                    </div>
                </div>

                {/* Footer */}
                <div className="footer">
                    <div>© 2024 ChatSphere Inc.</div>
                    <div className="footer-links">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Security Status</a>
                    </div>
                </div>
            </div>
        </div>
    );
};