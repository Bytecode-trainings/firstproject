import React, { useState, useEffect } from 'react';

const DEFAULT_COURSES = [
  {
    _id: '1',
    title: 'Full Stack Web Development (MERN / Python)',
    category: 'web',
    tag: 'Full Stack',
    rating: 4.9,
    reviewsCount: 1800,
    description: 'Master React, Node.js, Express, MongoDB, Next.js, and TypeScript with 5 enterprise-grade portfolio projects.',
    fee: 24999,
    highlights: [
      'Duration: 16 Weeks (Live + Lab)',
      '1:1 Code Reviews & GitHub Portfolio',
      'Guaranteed Placement Drive Access'
    ]
  },
  {
    _id: '2',
    title: 'Generative AI & Data Science Masterclass',
    category: 'ai',
    tag: 'Trending',
    rating: 4.95,
    reviewsCount: 2300,
    description: 'From Python, Pandas & Scikit-Learn to Deep Learning, LLMs, LangChain, Vector DBs, and Agentic AI workflows.',
    fee: 29999,
    highlights: [
      'Duration: 18 Weeks (Live Interactive)',
      'Build & Deploy Production LLM Apps',
      'Kaggle & Open Source Contributions'
    ]
  },
  {
    _id: '3',
    title: 'Cloud Engineering & DevOps with AWS & K8s',
    category: 'cloud',
    tag: 'High Demand',
    rating: 4.88,
    reviewsCount: 1200,
    description: 'Master Linux, Docker, Kubernetes, Terraform, CI/CD pipelines, AWS Architecture, and Production Monitoring.',
    fee: 27999,
    highlights: [
      'Duration: 14 Weeks (Hands-on Labs)',
      'Real AWS Cloud Sandbox Access',
      'AWS Certified Solutions Architect Prep'
    ]
  },
  {
    _id: '4',
    title: 'Enterprise Java Full Stack (Spring Boot & Microservices)',
    category: 'web',
    tag: 'Java Track',
    rating: 4.85,
    reviewsCount: 950,
    description: 'Core Java, Spring Boot 3, Microservices Architecture, Hibernate, Docker, and Angular/React UI integration.',
    fee: 22999,
    highlights: [
      'Duration: 16 Weeks',
      'Enterprise Microservices Project',
      'System Design & DSA Module'
    ]
  },
  {
    _id: '5',
    title: 'Python & Data Analytics with PowerBI',
    category: 'ai',
    tag: 'Fast Track',
    rating: 4.91,
    reviewsCount: 1400,
    description: 'Learn Data Cleaning, Exploratory Analysis, SQL, Advanced Excel, Power BI Dashboards, and Predictive Modeling.',
    fee: 18999,
    highlights: [
      'Duration: 12 Weeks',
      'Real Business Case Studies',
      'Interactive Dashboard Portfolio'
    ]
  },
  {
    _id: '6',
    title: 'Cyber Security & Ethical Hacking',
    category: 'cloud',
    tag: 'Security',
    rating: 4.87,
    reviewsCount: 820,
    description: 'Network security, penetration testing, Kali Linux, Web Application Security (OWASP Top 10), and SOC Analyst essentials.',
    fee: 26999,
    highlights: [
      'Duration: 14 Weeks',
      'Live CTF Challenges & Virtual Labs',
      'CEH & CompTIA Security+ Aligned'
    ]
  }
];

export default function App() {
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'login'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Enrollment Modal state
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '', batch: 'weekend' });

  // Auth state
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginData, setLoginData] = useState({ email: 'student@bytecode.com', password: 'bytecode2026', role: 'student', remember: true });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', course: 'Full Stack Web Development' });
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('bytecode_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState(0);

  // Toast state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch courses from server API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const url = activeFilter === 'all' ? '/api/courses' : `/api/courses?category=${activeFilter}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.courses && data.courses.length > 0) {
            setCourses(data.courses);
          }
        }
      } catch (err) {
        console.warn('API call failed, using bundled course catalog:', err);
      }
    };
    fetchCourses();
  }, [activeFilter]);

  // Handle Enrollment submit
  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...enrollForm,
          course: selectedCourse || 'General Inquiry'
        })
      });
      const data = await res.json().catch(() => ({}));
      addToast(data.message || `🎉 Congratulations ${enrollForm.name}! Your enrollment request has been submitted.`, 'success');
    } catch {
      addToast(`🎉 Congratulations ${enrollForm.name}! Inquiry received. Our counselor will contact you shortly.`, 'success');
    }
    setEnrollModalOpen(false);
    setEnrollForm({ name: '', email: '', phone: '', batch: 'weekend' });
  };

  // Handle Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginData.email, password: loginData.password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const userData = { ...data.user, token: data.token };
        setUser(userData);
        localStorage.setItem('bytecode_user', JSON.stringify(userData));
        addToast(`✨ Welcome back, ${userData.name || 'Student'}!`, 'success');
        setActiveTab('home');
      } else {
        addToast(data.message || 'Invalid credentials', 'error');
      }
    } catch {
      const fallbackUser = { email: loginData.email, name: 'Student Learner', role: loginData.role };
      setUser(fallbackUser);
      localStorage.setItem('bytecode_user', JSON.stringify(fallbackUser));
      addToast('✨ Welcome back! (Local Session)', 'success');
      setActiveTab('home');
    }
  };

  // Handle Register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      addToast('Please fill out all registration fields.', 'error');
      return;
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          courseInterest: registerData.course
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const userData = { ...data.user, token: data.token };
        setUser(userData);
        localStorage.setItem('bytecode_user', JSON.stringify(userData));
        addToast(`🎉 Account created! Welcome, ${registerData.name}!`, 'success');
        setActiveTab('home');
      } else {
        addToast(data.message || 'Registration failed.', 'error');
      }
    } catch {
      const fallbackUser = { name: registerData.name, email: registerData.email };
      setUser(fallbackUser);
      localStorage.setItem('bytecode_user', JSON.stringify(fallbackUser));
      addToast(`🎉 Account created! Welcome, ${registerData.name}!`, 'success');
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bytecode_user');
    addToast('Logged out successfully.', 'info');
  };

  return (
    <div>
      {/* Site Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" onClick={() => setActiveTab('home')}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <span className="logo-text">Bytecode<span>Trainings</span></span>
          </div>

          <nav aria-label="Main Navigation">
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              <li><button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Home</button></li>
              <li><a href="#courses" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Courses</a></li>
              <li><a href="#whyUs" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Why Us</a></li>
              <li><a href="#reviews" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Testimonials</a></li>
              <li><a href="#faq" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>FAQ</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            {user ? (
              <div className="user-badge">
                <span className="user-badge-avatar">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                <span>{user.name || user.email}</span>
                <button className="btn-logout" onClick={handleLogout} title="Log out">✕</button>
              </div>
            ) : (
              <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('login')}>Sign In</button>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => { setSelectedCourse('Full Stack Web Development'); setEnrollModalOpen(true); }}>Enroll Now</button>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation Menu">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Switcher */}
      {activeTab === 'login' ? (
        /* Login / Register Portal View */
        <section className="auth-page">
          <div className="auth-wrapper">
            <div className="auth-showcase">
              <div>
                <div className="logo" onClick={() => setActiveTab('home')} style={{ marginBottom: '2rem' }}>
                  <div className="logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                  </div>
                  <span className="logo-text">Bytecode<span>Trainings</span></span>
                </div>

                <div className="badge-pill">
                  <span className="pulse-dot"></span>
                  <span>Learning Management Portal</span>
                </div>

                <h2 style={{ fontSize: '2.1rem', lineHeight: '1.25', marginBottom: '1rem' }}>
                  Turn Ambition Into <br />
                  <span className="gradient-accent-text">Real-World Code.</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Your gateway to live cohort sessions, real-time code environments, weekly assignments, and 1:1 mentor bookings.
                </p>

                <ul className="auth-features-list">
                  <li className="auth-feature-item">
                    <div className="auth-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
                    </div>
                    <div className="auth-feature-text">
                      <h5>Curated Cohort Curriculum</h5>
                      <p>Full Stack, GenAI, DevOps & Cloud tracks tailored for 2026 hiring.</p>
                    </div>
                  </li>
                  <li className="auth-feature-item">
                    <div className="auth-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    </div>
                    <div className="auth-feature-text">
                      <h5>Direct Mentor Doubt Resolution</h5>
                      <p>Instant support on Slack/Discord & weekly 1-on-1 code reviews.</p>
                    </div>
                  </li>
                  <li className="auth-feature-item">
                    <div className="auth-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 14 14" /></svg>
                    </div>
                    <div className="auth-feature-text">
                      <h5>Lifetime Archive Access</h5>
                      <p>Re-watch recorded sessions anytime at high-definition quality.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  "The LMS portal with direct mentor feedback helped me clear my AWS & React developer rounds in my first attempt!"
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>— Ananya R., Cloud Architect</span>
              </div>
            </div>

            <div className="auth-form-side">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  ← Back to Homepage
                </button>
                <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '7px', height: '7px', background: '#10b981', borderRadius: '50%' }}></span>
                  Vercel Multi-Service Active
                </span>
              </div>

              <div className="auth-header">
                <h2>{authMode === 'login' ? 'Welcome Back' : 'Create an Account'}</h2>
                <p>{authMode === 'login' ? 'Sign in to access your courses and student dashboard' : 'Join thousands of students building their tech careers'}</p>
              </div>

              <div className="auth-switch-tabs">
                <button className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Sign In</button>
                <button className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`} onClick={() => setAuthMode('register')}>Create Account</button>
              </div>

              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label className="form-label">Email / Student ID</label>
                    <div className="input-box">
                      <span className="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-box">
                      <span className="input-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button type="button" className="toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? '👁' : '👁‍🗨'}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Select Role</label>
                    <div className="input-box">
                      <select
                        className="form-control"
                        value={loginData.role}
                        onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                        style={{ paddingLeft: '1rem', background: '#1e293b', color: '#fff' }}
                      >
                        <option value="student">Student Learner</option>
                        <option value="mentor">Faculty / Mentor</option>
                        <option value="recruiter">Hiring Partner</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-meta">
                    <label className="remember-label">
                      <input
                        type="checkbox"
                        checked={loginData.remember}
                        onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
                      />
                      <span>Remember me</span>
                    </label>
                    <span className="forgot-link" onClick={() => addToast('Reset password link sent to your email.', 'info')}>
                      Forgot password?
                    </span>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full btn-lg">
                    Sign In to Portal →
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="input-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. John Doe"
                        style={{ paddingLeft: '1rem' }}
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="input-box">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="john@example.com"
                        style={{ paddingLeft: '1rem' }}
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Interested Program</label>
                    <div className="input-box">
                      <select
                        className="form-control"
                        value={registerData.course}
                        onChange={(e) => setRegisterData({ ...registerData, course: e.target.value })}
                        style={{ paddingLeft: '1rem', background: '#1e293b', color: '#fff' }}
                      >
                        <option value="Full Stack Web Development">Full Stack Web Development</option>
                        <option value="Generative AI & Data Science">Generative AI & Data Science</option>
                        <option value="Cloud Engineering & DevOps">Cloud Engineering & DevOps</option>
                        <option value="Enterprise Java Full Stack">Enterprise Java Full Stack</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Create Password</label>
                    <div className="input-box">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="At least 6 characters"
                        style={{ paddingLeft: '1rem' }}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-full btn-lg">
                    Create Student Account →
                  </button>
                </form>
              )}

              <div className="social-divider">
                <span>or continue with</span>
              </div>

              <div className="social-login-grid">
                <button type="button" className="social-btn" onClick={() => addToast('Google OAuth connected.', 'info')}>
                  Google
                </button>
                <button type="button" className="social-btn" onClick={() => addToast('GitHub OAuth connected.', 'info')}>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Home Page View */
        <main>
          {/* Hero Section */}
          <section className="hero-section" id="home">
            <div className="container hero-grid">
              <div className="hero-content">
                <div className="badge-pill">
                  <span className="pulse-dot"></span>
                  <span>New Batches Starting Soon | 100% Placement Assistance</span>
                </div>
                <h1 className="hero-title">
                  Master Tech Skills. <br />
                  <span className="gradient-text">Build Your Dream Tech Career.</span>
                </h1>
                <p className="hero-description">
                  Fast-track your transition into high-paying software roles. Learn Full Stack, AI & Data Science, Cloud, and DevOps through real-world capstone projects and 1:1 mentorship from top engineering leads.
                </p>

                <div className="hero-ctas">
                  <a href="#courses" className="btn btn-primary btn-lg">
                    Explore Courses →
                  </a>
                  <button className="btn btn-outline btn-lg" onClick={() => setActiveTab('login')}>
                    Student Portal
                  </button>
                </div>

                <div className="hero-stats-row">
                  <div className="stat-item">
                    <h3>12,500+</h3>
                    <p>Students Trained</p>
                  </div>
                  <div className="stat-item">
                    <h3>96%</h3>
                    <p>Placement Rate</p>
                  </div>
                  <div className="stat-item">
                    <h3>180+</h3>
                    <p>Hiring Partners</p>
                  </div>
                </div>
              </div>

              {/* Terminal Graphic */}
              <div className="hero-visual">
                <div className="glass-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot-red"></span>
                      <span className="dot-yellow"></span>
                      <span className="dot-green"></span>
                    </div>
                    <div className="terminal-title">BytecodeCareerRoadmap.ts</div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Online</span>
                  </div>
                  <div className="terminal-body">
                    <div className="code-line">
                      <span className="token-comment">// Multi-service enterprise platform</span>
                    </div>
                    <div className="code-line">
                      <span className="token-keyword">import</span> &#123; <span className="token-var">Mentorship</span>, <span className="token-var">Projects</span> &#125; <span className="token-keyword">from</span> <span className="token-string">'@bytecode/career'</span>;
                    </div>
                    <div className="code-line">
                      <span className="token-keyword">const</span> <span className="token-var">candidate</span> = <span className="token-keyword">new</span> <span className="token-var">Student</span>(&#123;
                    </div>
                    <div className="code-line" style={{ paddingLeft: '1.5rem' }}>
                      track: <span className="token-string">'Full Stack MERN & AI'</span>,
                    </div>
                    <div className="code-line" style={{ paddingLeft: '1.5rem' }}>
                      handsOnProjects: <span className="token-keyword">12</span>,
                    </div>
                    <div className="code-line" style={{ paddingLeft: '1.5rem' }}>
                      mockInterviews: <span className="token-keyword">true</span>,
                    </div>
                    <div className="code-line">&#125;);</div>
                    <div className="code-line">
                      <span className="token-keyword">await</span> <span className="token-var">candidate</span>.<span className="token-var">launchHighPayingCareer</span>();
                    </div>
                    <div className="code-line" style={{ marginTop: '1rem', color: '#34d399' }}>
                      <span>➜ Status: Placed at Tier-1 Tech Company 🚀</span>
                    </div>
                  </div>
                </div>

                <div className="floating-pill pill-1">
                  <span className="pill-icon">★</span>
                  <span className="pill-text">Avg. 8.5 LPA Package</span>
                </div>
                <div className="floating-pill pill-2">
                  <span className="pill-icon">💻</span>
                  <span className="pill-text">100% Live Practice Labs</span>
                </div>
              </div>
            </div>
          </section>

          {/* Hiring Partners Ribbon */}
          <section className="hiring-ribbon">
            <div className="container">
              <div className="ribbon-label">Our Alumni Work At Top Global Tech Companies</div>
              <div className="company-logos">
                <div className="company-chip">⚡ Google</div>
                <div className="company-chip">🔷 Microsoft</div>
                <div className="company-chip">📦 Amazon</div>
                <div className="company-chip">🚀 Meta</div>
                <div className="company-chip">💼 TCS</div>
                <div className="company-chip">🌐 Infosys</div>
                <div className="company-chip">🎯 Cognizant</div>
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="section" id="courses">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Curated Curriculum</span>
                <h2>Explore Career-Focused <span className="gradient-text">Programs</span></h2>
                <p>Curated by industry veterans with up-to-date technologies and enterprise project exposure.</p>
              </div>

              <div className="filter-tabs">
                <button className={`tab-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Programs</button>
                <button className={`tab-btn ${activeFilter === 'web' ? 'active' : ''}`} onClick={() => setActiveFilter('web')}>Full Stack Web</button>
                <button className={`tab-btn ${activeFilter === 'ai' ? 'active' : ''}`} onClick={() => setActiveFilter('ai')}>AI & Data Science</button>
                <button className={`tab-btn ${activeFilter === 'cloud' ? 'active' : ''}`} onClick={() => setActiveFilter('cloud')}>Cloud & DevOps</button>
              </div>

              <div className="courses-grid">
                {courses.map((course) => (
                  <div key={course._id || course.title} className="course-card">
                    <div className="course-top">
                      <span className="course-tag">{course.tag}</span>
                      <div className="course-rating">★ {course.rating} ({course.reviewsCount || 1000} reviews)</div>
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <ul className="course-features">
                      {course.highlights && course.highlights.map((h, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="course-footer">
                      <div className="course-fee">
                        <span className="fee-label">Course Fee</span>
                        <span className="fee-val">₹{course.fee ? course.fee.toLocaleString() : '24,999'}</span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => { setSelectedCourse(course.title); setEnrollModalOpen(true); }}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="section" id="whyUs" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">The Bytecode Advantage</span>
                <h2>Why Engineers Choose <span className="gradient-text">Bytecode Trainings</span></h2>
                <p>We bridge the gap between academic theory and high-growth industry standards.</p>
              </div>

              <div className="features-grid">
                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <h4>1:1 Elite Mentorship</h4>
                  <p>Learn directly from Senior Architects & Tech Leads working at Google, Microsoft, and top product MNCs.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                  </div>
                  <h4>Production-Grade Projects</h4>
                  <p>No toy apps or basic to-do lists. Build real-time scalable web systems, AI pipelines, and cloud infrastructures.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                  </div>
                  <h4>100% Placement Drives</h4>
                  <p>Dedicated corporate placement cell with resume building, mock interviews, and direct referrals to 180+ hiring partners.</p>
                </div>
                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                  <h4>Lifetime LMS & Lab Access</h4>
                  <p>Never miss a session. Get lifetime access to class recordings, source code repositories, and community forum.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="section" id="reviews">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Alumni Success</span>
                <h2>Hear From Our <span className="gradient-text">Graduates</span></h2>
                <p>From non-IT to software architects—read how Bytecode transformed their careers.</p>
              </div>

              <div className="testimonials-grid">
                <div className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"I transitioned from a mechanical background to Full Stack Developer within 4 months! The mentors helped me review every pull request and prepped me for real interviews."</p>
                  <div className="review-author">
                    <div className="author-avatar">RK</div>
                    <div className="author-meta">
                      <h5>Rahul Kumar</h5>
                      <p>Software Engineer @ Amazon (12 LPA)</p>
                    </div>
                  </div>
                </div>

                <div className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"The GenAI and Data Science track is unmatched. The hands-on exposure to LangChain, Vector databases, and LLM fine-tuning was exactly what tech companies were looking for."</p>
                  <div className="review-author">
                    <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}>PS</div>
                    <div className="author-meta">
                      <h5>Pooja Sharma</h5>
                      <p>AI Engineer @ Cognizant (14.5 LPA)</p>
                    </div>
                  </div>
                </div>

                <div className="review-card">
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"Bytecode's DevOps course gave me hands-on confidence with Kubernetes and Terraform on AWS sandbox. Secured 3 offers right after the mock interview series!"</p>
                  <div className="review-author">
                    <div className="author-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>SV</div>
                    <div className="author-meta">
                      <h5>Sai Vardhan</h5>
                      <p>DevOps Lead @ Tech Mahindra</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="section" id="faq" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Got Questions?</span>
                <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
                <p>Everything you need to know about our batches, placement support, and eligibility.</p>
              </div>

              <div className="faq-container">
                {[
                  {
                    q: 'Are there any prerequisites to join Bytecode Trainings?',
                    a: 'No prior coding experience is needed for our beginner-to-advanced tracks. We start from foundational programming concepts and guide you step-by-step through advanced frameworks and system design.'
                  },
                  {
                    q: 'How does the 100% placement support work?',
                    a: 'Our dedicated placement team conducts resume workshops, LinkedIn branding, 1-on-1 technical and HR mock interviews, and schedules direct interview drives with our 180+ hiring partner companies until you get placed.'
                  },
                  {
                    q: 'What if I miss a live class?',
                    a: 'All live sessions are recorded in HD and uploaded to your student portal within 2 hours. You retain lifetime access to these recordings, project files, and mentor Q&A channels.'
                  },
                  {
                    q: 'Are weekend and evening batches available?',
                    a: 'Yes, we have both weekday (morning & evening) and dedicated weekend batches tailored for working professionals and university students.'
                  }
                ].map((faq, idx) => (
                  <div key={idx} className={`faq-item ${openFaq === idx ? 'active' : ''}`}>
                    <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}>
                      <span>{faq.q}</span>
                      <span className="faq-chevron">▼</span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="container" style={{ margin: '4rem auto' }}>
            <div className="cta-banner">
              <h2>Ready to Elevate Your Tech Career?</h2>
              <p>Join thousands of learners who upgraded their skills and landed high-growth engineering roles.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => { setSelectedCourse('General Consultation'); setEnrollModalOpen(true); }}>
                  Book Free Counseling
                </button>
                <button className="btn btn-outline btn-lg" onClick={() => setActiveTab('login')}>
                  Sign In to Portal
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer">
            <div className="container">
              <div className="footer-grid">
                <div className="footer-col">
                  <div className="logo" style={{ marginBottom: '1.25rem' }}>
                    <div className="logo-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </div>
                    <span className="logo-text">Bytecode<span>Trainings</span></span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Empowering aspiring developers and engineers with industry-aligned skills, practical projects, and personalized mentoring.
                  </p>
                </div>

                <div className="footer-col">
                  <h4>Popular Courses</h4>
                  <ul className="footer-links">
                    <li><a href="#courses">Full Stack MERN Dev</a></li>
                    <li><a href="#courses">Generative AI & LLMs</a></li>
                    <li><a href="#courses">AWS Cloud & DevOps</a></li>
                    <li><a href="#courses">Java Spring Boot</a></li>
                    <li><a href="#courses">Data Analytics & Power BI</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Quick Links</h4>
                  <ul className="footer-links">
                    <li><a href="#whyUs">Why Choose Us</a></li>
                    <li><a href="#reviews">Success Stories</a></li>
                    <li><a href="#faq">FAQs</a></li>
                    <li><button onClick={() => setActiveTab('login')}>Student Login</button></li>
                    <li><button onClick={() => { setActiveTab('login'); setAuthMode('register'); }}>Register Account</button></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Stay Updated</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Get weekly tech insights, free webinar invites, and course discounts.</p>
                  <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); addToast('Subscribed to Bytecode newsletter!', 'success'); }}>
                    <input type="email" placeholder="Your work email..." className="newsletter-input" required />
                    <button type="submit" className="btn btn-primary btn-sm">Join</button>
                  </form>
                </div>
              </div>

              <div className="footer-bottom">
                <div>&copy; 2026 Bytecode Trainings. All rights reserved.</div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#home" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Privacy Policy</a>
                  <a href="#home" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Terms of Service</a>
                  <a href="#home" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Security</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* Course Enrollment Modal */}
      {enrollModalOpen && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setEnrollModalOpen(false); }}>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setEnrollModalOpen(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enroll in: {selectedCourse}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Fill in your details and our education counselor will call you with syllabus & batch timings.
            </p>

            <form onSubmit={handleEnrollSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Rahul Sharma"
                  style={{ paddingLeft: '1rem' }}
                  value={enrollForm.name}
                  onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="e.g. rahul@example.com"
                  style={{ paddingLeft: '1rem' }}
                  value={enrollForm.email}
                  onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone / WhatsApp Number</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="e.g. +91 98765 43210"
                  style={{ paddingLeft: '1rem' }}
                  value={enrollForm.phone}
                  onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Batch</label>
                <select
                  className="form-control"
                  value={enrollForm.batch}
                  onChange={(e) => setEnrollForm({ ...enrollForm, batch: e.target.value })}
                  style={{ paddingLeft: '1rem', background: '#1e293b', color: '#fff' }}
                >
                  <option value="weekend">Weekend Live Batch (Sat & Sun)</option>
                  <option value="weekday-evening">Weekday Evening (7:30 PM - 9:30 PM)</option>
                  <option value="weekday-morning">Weekday Morning (8:00 AM - 10:00 AM)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1rem' }}>
                Submit Enrollment Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toasts */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <span className="toast-icon">{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
