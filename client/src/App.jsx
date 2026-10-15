import React, { useState, useEffect } from 'react';

const AI_COURSES = [
  {
    _id: '1',
    title: 'Enterprise RAG & Hybrid Vector Search',
    category: 'rag',
    tag: 'RAG Engine',
    modelTag: 'Pinecone • LangChain',
    rating: 4.96,
    reviewsCount: 2450,
    description: 'Build production-ready Retrieval-Augmented Generation systems with multi-document chunking, hybrid BM25 + dense vector embeddings, and re-ranking.',
    fee: 29999,
    highlights: [
      'Multi-Modal Document Parsing & Chunking',
      'Vector DBs: Pinecone, Qdrant & ChromaDB',
      'Advanced RAG: Contextual Compression & Cohere Re-rank'
    ]
  },
  {
    _id: '2',
    title: 'Autonomous AI Agents & Multi-Agent Systems',
    category: 'agents',
    tag: 'AI Agents',
    modelTag: 'LangGraph • CrewAI',
    rating: 4.98,
    reviewsCount: 3100,
    description: 'Architect self-directed autonomous agent workflows, tool calling, memory persistence, human-in-the-loop validation, and multi-agent coordination.',
    fee: 34999,
    highlights: [
      'ReAct Pattern & Planning Algorithms',
      'CrewAI & LangGraph Multi-Agent Teams',
      'Autonomous Code Execution & Web Browsing Agents'
    ]
  },
  {
    _id: '3',
    title: 'Prompt Engineering & LLM Evaluation Bench',
    category: 'prompts',
    tag: 'Prompt Studio',
    modelTag: 'GPT-4o • Claude 3.5',
    rating: 4.92,
    reviewsCount: 1850,
    description: 'Master advanced prompt architecture: Few-shot, Chain-of-Thought, ReAct, System Steering, Jailbreak Defense, and Ragas/TruLens automated evaluation.',
    fee: 19999,
    highlights: [
      'Zero-Shot to Few-Shot Dynamic Prompting',
      'LLM-as-a-Judge & Automated Evaluation',
      'Guardrails, Toxicity Filtering & Output Validation'
    ]
  },
  {
    _id: '4',
    title: 'AI Interview Engine & Resume Career Accelerator',
    category: 'interview',
    tag: 'Career AI',
    modelTag: 'ATS Scorer • Voice AI',
    rating: 4.95,
    reviewsCount: 2900,
    description: 'Leverage LLMs for automated resume ATS scoring, technical gap discovery, and realistic voice-enabled AI mock interviews with instant behavioral analytics.',
    fee: 24999,
    highlights: [
      'Real-time ATS Resume Parser & Keyword Matcher',
      'Interactive AI Mock Technical Interviews',
      'Instant Diagnostic Feedback & Placement Assistance'
    ]
  },
  {
    _id: '5',
    title: 'Full Stack AI Engineering (Next.js & Vercel AI SDK)',
    category: 'rag',
    tag: 'Full Stack AI',
    modelTag: 'Vercel AI • Next.js 15',
    rating: 4.94,
    reviewsCount: 1640,
    description: 'Design streaming AI user experiences, tool invocations, server actions, generative UI, and resilient backend pipelines for enterprise SaaS apps.',
    fee: 27999,
    highlights: [
      'Vercel AI SDK Core & Generative UI Components',
      'Streaming Responses & Function Calling',
      'Full Stack TypeScript & Vector Database Integration'
    ]
  },
  {
    _id: '6',
    title: 'Open Source LLM Fine-Tuning & Local Deployment',
    category: 'agents',
    tag: 'Model Ops',
    modelTag: 'Llama 3 • vLLM • LoRA',
    rating: 4.89,
    reviewsCount: 1320,
    description: 'Fine-tune open-weight models using LoRA and QLoRA on domain datasets. Quantize and deploy blazing-fast inference endpoints using vLLM and Ollama.',
    fee: 32999,
    highlights: [
      'Dataset Synthesis & LoRA/QLoRA Parameter Tuning',
      'vLLM High-Throughput Serving & Triton Inference',
      'Private Model Deployment on AWS GPU Clusters'
    ]
  }
];

export default function App() {
  const [courses, setCourses] = useState(AI_COURSES);
  const [activeCourseFilter, setActiveCourseFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'login'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Playground Engine Tab
  const [engineTab, setEngineTab] = useState('rag'); // 'rag' | 'agents' | 'prompts' | 'interview'

  // Interactive RAG Demo State
  const [ragDoc, setRagDoc] = useState('SystemDesign-Microservices.pdf');
  const [ragQuery, setRagQuery] = useState('Explain how Vector Search retrieval improves LMS student recommendations');
  const [ragLoading, setRagLoading] = useState(false);
  const [ragResult, setRagResult] = useState({
    score: '96.8% Cosine Similarity',
    chunksFound: 3,
    chunkPreview: 'Chunk #104 (Page 14): "Vector embeddings project student queries and syllabus concepts into a 1536-dimensional latent space. Semantic similarity search retrieves grounded lesson plans with low latency, bypassing keyword mismatch errors."',
    llmResponse: 'Based on the indexed Bytecode LMS knowledge base, Vector Search transforms syllabus text and learner queries into high-dimensional vector embeddings (e.g. OpenAI text-embedding-3-small). When a learner requests assistance, nearest-neighbor algorithms (HNSW) instantly pull the most semantically relevant lecture chunks, ensuring 100% grounded explanations without hallucinations.'
  });

  // Interactive Agent Chatbot State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'agent', thought: 'Agent initialized. Knowledge base: Bytecode AI LMS v2.4. Memory: Active.', text: 'Hello! I am your 24/7 Bytecode AI Mentor. Ask me any conceptual question, request a coding exercise, or test your system design skills.' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [agentThinking, setAgentThinking] = useState(false);

  // Interactive Prompt Studio State
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [systemPrompt, setSystemPrompt] = useState('You are an expert technical interviewer evaluating a senior backend engineer.');
  const [userPrompt, setUserPrompt] = useState('Generate a coding question on distributed caching and concurrency with Redis.');
  const [promptOutput, setPromptOutput] = useState('Problem: Distributed Rate Limiter\nDifficulty: Senior\nRequirements: Design a sliding-window rate limiter using Redis sorted sets (ZSET). Ensure atomic execution using Lua scripting to prevent race conditions under 10k req/sec.');
  const [temperature, setTemperature] = useState(0.7);

  // Interactive Resume & Interview State
  const [atsScore, setAtsScore] = useState(88);
  const [jobRole, setJobRole] = useState('Senior AI/RAG Engineer');
  const [mockQuestion, setMockQuestion] = useState('How would you prevent lost context and needle-in-a-haystack issues when feeding 50+ document pages into an LLM context window?');

  // Lead / Enterprise Demo Modal
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', role: 'Enterprise Admin', learnersCount: '50-250' });

  // Auth State
  const [authMode, setAuthMode] = useState('login');
  const [loginData, setLoginData] = useState({ email: 'engineer@bytecode.ai', password: 'bytecode2026', role: 'student', remember: true });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', track: 'Enterprise RAG & Hybrid Vector Search' });
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('bytecode_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Toast System
  const [toasts, setToasts] = useState([]);
  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter courses
  const filteredCourses = activeCourseFilter === 'all'
    ? courses
    : courses.filter(c => c.category === activeCourseFilter);

  // Handle RAG Simulation Query
  const handleRunRAG = () => {
    if (!ragQuery.trim()) return;
    setRagLoading(true);
    setTimeout(() => {
      setRagLoading(false);
      setRagResult({
        score: '98.2% Cosine Match',
        chunksFound: 4,
        chunkPreview: `Chunk #218 (Source: ${ragDoc}): "Semantic chunking partitions hierarchical headers into dense vectors. The hybrid retrieval pipeline applies reciprocal rank fusion (RRF) to blend BM25 keyword frequency with vector dense search."`,
        llmResponse: `Synthesized Answer [Source: ${ragDoc}]: According to the RAG knowledge index, the system applies hybrid retrieval across the syllabus. It evaluates the query '${ragQuery}' against indexed vector chunks, isolating foundational concepts and feeding them to the LLM with verifiable source citations.`
      });
      addToast('✨ RAG Retrieval Engine successfully grounded response with citations!', 'success');
    }, 600);
  };

  // Handle Chatbot Message
  const handleSendChat = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const newMessages = [...chatMessages, { sender: 'user', text: query }];
    setChatMessages(newMessages);
    if (!textToSend) setChatInput('');
    setAgentThinking(true);

    setTimeout(() => {
      setAgentThinking(false);
      let replyThought = 'Agent plan: Reason query -> Search vector syllabus -> Synthesize step-by-step guidance.';
      let replyText = `Here is your targeted insight on "${query}": In modern AI architectures, this concept relies on coordinating vector embeddings with deterministic tool calls. Would you like me to generate a live code snippet or a 5-question mock quiz to test your mastery?`;

      if (query.toLowerCase().includes('langchain') || query.toLowerCase().includes('rag')) {
        replyThought = 'Identified Topic: RAG & LCEL pipeline. Pulling production architecture diagram.';
        replyText = 'For RAG pipelines, we recommend LangChain Expression Language (LCEL) with runnable sequences: `retriever | format_docs | prompt | llm | StrOutputParser()`. This ensures parallel async batching and streaming to frontend UIs.';
      } else if (query.toLowerCase().includes('resume') || query.toLowerCase().includes('interview')) {
        replyThought = 'Triggering Interview & Career Agent module.';
        replyText = 'I have loaded your active profile. Your resume shows strong Python and React skills, but adding production experience with Pinecone vector databases and LangGraph multi-agent teams will push your ATS score above 95%.';
      }

      setChatMessages(prev => [...prev, { sender: 'agent', thought: replyThought, text: replyText }]);
    }, 700);
  };

  // Handle Prompt Studio Optimize
  const handleOptimizePrompt = () => {
    addToast('Optimizing prompt using Chain-of-Thought steering...', 'info');
    setTimeout(() => {
      setUserPrompt('Generate an end-to-end coding challenge on Redis distributed caching. Specify time & space complexity, failure recovery edge cases, and provide an evaluation grading rubric.');
      setPromptOutput(`✨ Auto-Optimized Output (${selectedModel} | Temp: ${temperature}):\n\nTask: Design a Resilient Distributed Rate Limiter\n• Input Constraints: 50,000 requests/sec across 10 geographical clusters\n• Data Structure: Redis Sorted Set with TTL\n• Evaluation Rubric: Atomic Lua script validation (40%), Race condition mitigation (30%), Zero-downtime cluster rollover (30%).`);
      addToast('Prompt successfully tuned with 98.4% clarity benchmark!', 'success');
    }, 500);
  };

  // Handle Demo Inquiry
  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: demoForm.name,
          email: demoForm.email,
          phone: demoForm.company,
          course: `Enterprise AI LMS Demo (${demoForm.learnersCount} seats)`
        })
      });
    } catch {
      // Fallback
    }
    setDemoModalOpen(false);
    addToast(`🚀 Thank you ${demoForm.name}! Your Enterprise AI LMS demo instance has been reserved.`, 'success');
    setDemoForm({ name: '', email: '', company: '', role: 'Enterprise Admin', learnersCount: '50-250' });
  };

  // Handle Sign In
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const mockUser = {
      name: loginData.email.split('@')[0],
      email: loginData.email,
      role: loginData.role
    };
    setUser(mockUser);
    localStorage.setItem('bytecode_user', JSON.stringify(mockUser));
    addToast(`✨ Welcome to Bytecode AI LMS, ${mockUser.name}!`, 'success');
    setActiveTab('home');
  };

  return (
    <div>
      {/* Navigation Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" onClick={() => setActiveTab('home')}>
            <div className="logo-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
            </div>
            <span className="logo-text">Bytecode<span style={{ color: '#06b6d4' }}>.AI</span> <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', borderRadius: '4px', verticalAlign: 'middle', marginLeft: '6px' }}>LMS</span></span>
          </div>

          <nav aria-label="Main Navigation">
            <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
              <li><button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Overview</button></li>
              <li><a href="#playground" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>AI Engines</a></li>
              <li><a href="#curriculum" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Programs</a></li>
              <li><a href="#pricing" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Pricing</a></li>
              <li><a href="#architecture" className="nav-link" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>Architecture</a></li>
            </ul>
          </nav>

          <div className="nav-actions">
            {user ? (
              <div className="user-badge">
                <span className="user-badge-avatar">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                <span>{user.name}</span>
                <button className="btn-logout" onClick={() => { setUser(null); localStorage.removeItem('bytecode_user'); addToast('Signed out of LMS.', 'info'); }}>✕</button>
              </div>
            ) : (
              <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('login')}>Sign In</button>
            )}
            <button className="btn btn-primary btn-sm" onClick={() => setDemoModalOpen(true)}>Request Demo</button>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Main View Switcher */}
      {activeTab === 'login' ? (
        /* Sign In & SaaS Portal Screen */
        <section className="auth-page">
          <div className="auth-wrapper">
            <div className="auth-showcase">
              <div>
                <div className="logo" onClick={() => setActiveTab('home')} style={{ marginBottom: '2rem' }}>
                  <div className="logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"></path></svg>
                  </div>
                  <span className="logo-text">Bytecode<span style={{ color: '#06b6d4' }}>.AI</span> LMS</span>
                </div>

                <div className="badge-pill">
                  <span className="pulse-dot"></span>
                  <span>Intelligent Learning Cloud</span>
                </div>

                <h2 style={{ fontSize: '2.1rem', lineHeight: '1.25', marginBottom: '1rem' }}>
                  Accelerate Learning With <br />
                  <span className="gradient-accent-text">Autonomous AI Engines.</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Sign in to access your customized RAG knowledge bases, 24/7 AI Mentor agents, interactive prompt studios, and career resume analytics.
                </p>

                <ul className="auth-features-list">
                  <li className="auth-feature-item">
                    <div className="auth-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <div className="auth-feature-text">
                      <h5>Grounded RAG Knowledge Engine</h5>
                      <p>Instant answers verified against official documentation & syllabus.</p>
                    </div>
                  </li>
                  <li className="auth-feature-item">
                    <div className="auth-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    </div>
                    <div className="auth-feature-text">
                      <h5>AI Resume & ATS Optimizer</h5>
                      <p>Real-time keyword diagnostics, gap analysis, and mock interviews.</p>
                    </div>
                  </li>
                  <li className="auth-feature-item">
                    <div className="auth-feature-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <div className="auth-feature-text">
                      <h5>Multi-Model Flexibility</h5>
                      <p>Seamlessly switch between GPT-4o, Claude 3.5, and Gemini 1.5.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', marginBottom: '0.75rem' }}>
                  "Bytecode AI's automated mock interviews and RAG explanations helped our cohort transition into AI Engineering roles in under 90 days."
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>— Lead Architect @ Fortune 500 AI Lab</span>
              </div>
            </div>

            <div className="auth-form-side">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  ← Back to Platform
                </button>
                <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '7px', height: '7px', background: '#10b981', borderRadius: '50%' }}></span>
                  Enterprise SSO Ready
                </span>
              </div>

              <div className="auth-header">
                <h2>{authMode === 'login' ? 'Sign In to Bytecode AI' : 'Create LMS Account'}</h2>
                <p>{authMode === 'login' ? 'Access your AI learning studio and personalized curriculum' : 'Start mastering Generative AI, RAG, and Agentic Engineering'}</p>
              </div>

              <div className="auth-switch-tabs">
                <button className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Sign In</button>
                <button className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`} onClick={() => setAuthMode('register')}>Register</button>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Work / Student Email</label>
                  <div className="input-box">
                    <input
                      type="email"
                      className="form-control"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-box">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                    <button type="button" className="toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? '👁' : '👁‍🗨'}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Workspace Role</label>
                  <select
                    className="form-control"
                    value={loginData.role}
                    onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                    style={{ paddingLeft: '1rem', background: '#1e293b', color: '#fff' }}
                  >
                    <option value="student">AI Learner / Engineer</option>
                    <option value="instructor">Faculty / Content Author</option>
                    <option value="enterprise">Enterprise Academy Admin</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1rem' }}>
                  Sign In to AI LMS →
                </button>
              </form>

              <div className="social-divider">
                <span>or authenticate via</span>
              </div>

              <div className="social-login-grid">
                <button type="button" className="social-btn" onClick={() => addToast('Google Workspace Single Sign-On connected.', 'info')}>
                  Google SSO
                </button>
                <button type="button" className="social-btn" onClick={() => addToast('GitHub Enterprise connected.', 'info')}>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Home / AI LMS Platform Screen */
        <main>
          {/* Hero Section */}
          <section className="hero-section" id="home">
            <div className="container hero-grid">
              <div className="hero-content">
                <div className="badge-pill">
                  <span className="pulse-dot"></span>
                  <span>Next-Gen AI Learning Management SaaS</span>
                </div>
                <h1 className="hero-title">
                  Next-Gen Learning. <br />
                  <span className="gradient-text">Powered by AI & RAG.</span>
                </h1>
                <p className="hero-description">
                  Bytecode AI transforms traditional training into an autonomous, intelligent LMS. Built with <strong>Prompt Engineering Studios</strong>, <strong>RAG Knowledge Engines</strong>, <strong>24/7 AI Mentors</strong>, and automated <strong>Resume & Interview Preparation Engines</strong>.
                </p>

                <div className="hero-ctas">
                  <a href="#playground" className="btn btn-primary btn-lg">
                    Launch AI Playground →
                  </a>
                  <button className="btn btn-outline btn-lg" onClick={() => setDemoModalOpen(true)}>
                    Request Demo
                  </button>
                </div>

                <div className="hero-stats-row">
                  <div className="stat-item">
                    <h3>99.4%</h3>
                    <p>RAG Retrieval Accuracy</p>
                  </div>
                  <div className="stat-item">
                    <h3>24/7</h3>
                    <p>Autonomous AI Mentorship</p>
                  </div>
                  <div className="stat-item">
                    <h3>10x</h3>
                    <p>Faster Interview Readiness</p>
                  </div>
                </div>
              </div>

              {/* Interactive Visual Terminal */}
              <div className="hero-visual">
                <div className="glass-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot-red"></span>
                      <span className="dot-yellow"></span>
                      <span className="dot-green"></span>
                    </div>
                    <div className="terminal-title">BytecodeAI_Engine_Orchestrator.py</div>
                    <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Active Pipeline</span>
                  </div>
                  <div className="terminal-body">
                    <div className="code-line">
                      <span className="token-comment"># Initializing Dual-Server Multi-Service Architecture</span>
                    </div>
                    <div className="code-line">
                      <span className="token-keyword">from</span> <span className="token-var">bytecode_ai</span> <span className="token-keyword">import</span> <span className="token-var">RAGEngine, AgentChain, ResumeScorer</span>
                    </div>
                    <div className="code-line" style={{ marginTop: '0.5rem' }}>
                      <span className="token-keyword">rag</span> = <span className="token-var">RAGEngine</span>(embed_dim=<span className="token-string">1536</span>, vector_db=<span className="token-string">"Pinecone"</span>)
                    </div>
                    <div className="code-line">
                      <span className="token-keyword">agent</span> = <span className="token-var">AgentChain</span>(llm=<span className="token-string">"GPT-4o / Claude-3.5"</span>, tools=[<span className="token-string">"CodeRunner"</span>, <span className="token-string">"QuizGen"</span>])
                    </div>
                    <div className="code-line">
                      <span className="token-keyword">resume</span> = <span className="token-var">ResumeScorer</span>(benchmark=<span className="token-string">"Senior AI Engineer"</span>)
                    </div>
                    <div className="code-line" style={{ marginTop: '0.75rem', color: '#38bdf8' }}>
                      <span>➜ [Retrieval]: Matched 4 high-affinity vector syllabus chunks</span>
                    </div>
                    <div className="code-line" style={{ color: '#34d399' }}>
                      <span>➜ [ATS Diagnostics]: Resume Score: 94/100 • 0 Critical Gaps</span>
                    </div>
                    <div className="code-line" style={{ color: '#a5b4fc' }}>
                      <span>➜ [Autonomous Tutor]: Live 1:1 Code Diagnostic Ready 🚀</span>
                    </div>
                  </div>
                </div>

                <div className="floating-pill pill-1">
                  <span className="pill-icon">⚡</span>
                  <span className="pill-text">Zero-Hallucination RAG</span>
                </div>
                <div className="floating-pill pill-2">
                  <span className="pill-icon">🤖</span>
                  <span className="pill-text">Multi-Agent Autonomy</span>
                </div>
              </div>
            </div>
          </section>

          {/* Model Ecosystem Ribbon */}
          <section className="hiring-ribbon">
            <div className="container">
              <div className="ribbon-label">POWERED BY ENTERPRISE LLM & VECTOR ECOSYSTEMS</div>
              <div className="company-logos">
                <div className="company-chip">⚡ OpenAI GPT-4o</div>
                <div className="company-chip">🔷 Anthropic Claude 3.5</div>
                <div className="company-chip">🔮 Google Gemini 1.5 Pro</div>
                <div className="company-chip">🌲 Pinecone Vector DB</div>
                <div className="company-chip">🦜 LangChain & LangGraph</div>
                <div className="company-chip">🦙 Meta Llama 3</div>
              </div>
            </div>
          </section>

          {/* =========================================================================
               Interactive AI Playground (The 4 Core Pillars)
               ========================================================================= */}
          <section className="ai-playground-section" id="playground">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Interactive Demonstration</span>
                <h2>Experience the <span className="gradient-text">AI LMS Engine</span></h2>
                <p>Test the four foundational pillars engineered to personalize and automate modern technical education.</p>
              </div>

              {/* Engine Switcher Tabs */}
              <div className="ai-engine-tabs">
                <button className={`ai-engine-btn ${engineTab === 'rag' ? 'active' : ''}`} onClick={() => setEngineTab('rag')}>
                  <span>📚</span> RAG Knowledge Engine
                </button>
                <button className={`ai-engine-btn ${engineTab === 'agents' ? 'active' : ''}`} onClick={() => setEngineTab('agents')}>
                  <span>🤖</span> AI Tutor & Recommendation Agent
                </button>
                <button className={`ai-engine-btn ${engineTab === 'prompts' ? 'active' : ''}`} onClick={() => setEngineTab('prompts')}>
                  <span>⚡</span> Prompt Engineering Studio
                </button>
                <button className={`ai-engine-btn ${engineTab === 'interview' ? 'active' : ''}`} onClick={() => setEngineTab('interview')}>
                  <span>🎯</span> Resume & Interview Prep Engine
                </button>
              </div>

              {/* Tab 1: RAG Engine */}
              {engineTab === 'rag' && (
                <div className="ai-playground-card">
                  <div className="rag-grid">
                    <div className="rag-panel">
                      <div className="rag-header">
                        <h4><span>📁</span> Indexed Document Store</h4>
                        <span className="badge-pill" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>Vector DB: Connected</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        Documents vectorized with OpenAI `text-embedding-3-small` (1536-dim embeddings):
                      </p>

                      {['SystemDesign-Microservices.pdf', 'LangChain-RAG-Architecture.md', 'DevOps-Kubernetes-Pipelines.pdf'].map((doc, i) => (
                        <div key={i} className="doc-chip" style={{ cursor: 'pointer', borderColor: ragDoc === doc ? 'var(--primary)' : 'rgba(99, 102, 241, 0.2)' }} onClick={() => setRagDoc(doc)}>
                          <span>📄 {doc}</span>
                          <span className="doc-chip-badge">{ragDoc === doc ? 'Active Source' : 'Indexed'}</span>
                        </div>
                      ))}

                      <div style={{ marginTop: '1.5rem' }}>
                        <label className="form-label">Query Knowledge Base</label>
                        <div className="input-box" style={{ marginBottom: '0.75rem' }}>
                          <input
                            type="text"
                            className="form-control"
                            value={ragQuery}
                            onChange={(e) => setRagQuery(e.target.value)}
                            placeholder="Ask any syllabus or technical concept..."
                            style={{ paddingLeft: '1rem' }}
                          />
                        </div>
                        <button className="btn btn-primary btn-full" onClick={handleRunRAG} disabled={ragLoading}>
                          {ragLoading ? 'Searching Vector Chunks...' : 'Run RAG Retrieval Query 🔍'}
                        </button>
                      </div>
                    </div>

                    <div className="rag-panel">
                      <div className="rag-header">
                        <h4><span>⚡</span> Grounded LLM Synthesis</h4>
                        <span className="doc-chip-badge">{ragResult.score}</span>
                      </div>

                      <div className="chunk-card">
                        <div className="chunk-meta">
                          <span>RETRIEVED VECTOR CHUNK</span>
                          <span>Cosine: 0.968</span>
                        </div>
                        <div className="chunk-text">
                          {ragResult.chunkPreview}
                        </div>
                      </div>

                      <div className="rag-result-box">
                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          ✓ Verified Grounded Answer
                        </div>
                        <p style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.6 }}>
                          {ragResult.llmResponse}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: AI Agents */}
              {engineTab === 'agents' && (
                <div className="ai-playground-card">
                  <div className="chat-window">
                    <div className="chat-header">
                      <div className="agent-badge">
                        <div className="agent-avatar">AI</div>
                        <div>
                          <h5 style={{ fontSize: '0.95rem', margin: 0 }}>Bytecode Autonomous Tutor Agent</h5>
                          <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Autonomous Tool Calling & Reasoning Active</span>
                        </div>
                      </div>
                      <span className="badge-pill" style={{ margin: 0 }}>GPT-4o Realtime</span>
                    </div>

                    <div className="chat-messages">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.sender}`}>
                          {msg.thought && <div className="agent-thought">🧠 {msg.thought}</div>}
                          <div>{msg.text}</div>
                        </div>
                      ))}
                      {agentThinking && (
                        <div className="chat-bubble agent" style={{ fontStyle: 'italic', color: '#a5b4fc' }}>
                          Thinking & synthesizing syllabus recommendations...
                        </div>
                      )}
                    </div>

                    <div className="quick-prompts">
                      <button className="quick-chip" onClick={() => handleSendChat('Explain LangChain LCEL vs LangGraph')}>
                        💡 LCEL vs LangGraph
                      </button>
                      <button className="quick-chip" onClick={() => handleSendChat('Review my resume for a Senior AI role')}>
                        📄 Review My Resume Gaps
                      </button>
                      <button className="quick-chip" onClick={() => handleSendChat('Give me a 5-minute system design quiz')}>
                        📝 Quiz on Microservices
                      </button>
                    </div>

                    <div className="chat-input-bar">
                      <input
                        type="text"
                        className="chat-input"
                        placeholder="Ask your AI Mentor anything about your syllabus or coding..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendChat(); }}
                      />
                      <button className="btn btn-primary btn-sm" onClick={() => handleSendChat()}>
                        Send ➔
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Prompt Studio */}
              {engineTab === 'prompts' && (
                <div className="ai-playground-card">
                  <div className="model-selector">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.5rem' }}>Foundation Model:</span>
                    {['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Llama 3 70B'].map((m) => (
                      <button key={m} className={`model-chip ${selectedModel === m ? 'selected' : ''}`} onClick={() => setSelectedModel(m)}>
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="prompt-grid">
                    <div>
                      <label className="form-label">System Steering Prompt</label>
                      <textarea
                        className="prompt-textarea"
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                      />

                      <div style={{ margin: '1rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          <span>Temperature (Creativity):</span>
                          <span>{temperature}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={temperature}
                          onChange={(e) => setTemperature(parseFloat(e.target.value))}
                          style={{ width: '100%', accentColor: 'var(--primary)' }}
                        />
                      </div>

                      <label className="form-label">User Query / Prompt</label>
                      <textarea
                        className="prompt-textarea"
                        style={{ height: '90px' }}
                        value={userPrompt}
                        onChange={(e) => setUserPrompt(e.target.value)}
                      />

                      <button className="btn btn-primary btn-full" style={{ marginTop: '1rem' }} onClick={handleOptimizePrompt}>
                        ✨ Run & Auto-Optimize Prompt
                      </button>
                    </div>

                    <div>
                      <label className="form-label">Engine Output & Diagnostics</label>
                      <div style={{ background: 'rgba(10, 15, 29, 0.9)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', height: '340px', overflowY: 'auto', fontFamily: 'var(--font-code)', fontSize: '0.88rem', whiteSpace: 'pre-wrap', color: '#e2e8f0', lineHeight: 1.6 }}>
                        {promptOutput}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        <span>Tokens: 184 / 4,096</span>
                        <span>Latency: 280ms</span>
                        <span>Evaluation Score: 98.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Interview & Resume Prep Engine */}
              {engineTab === 'interview' && (
                <div className="ai-playground-card">
                  <div className="resume-grid">
                    <div className="score-card">
                      <div className="score-circle">
                        <h3>{atsScore}</h3>
                        <span>ATS SCORE</span>
                      </div>
                      <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Target: {jobRole}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        Evaluated across 150+ Top Tech Hiring Partner rubrics.
                      </p>

                      <div className="feedback-item">
                        <span className="feedback-tag tag-pass">MATCH</span>
                        <div style={{ textAlign: 'left' }}>
                          <strong>Core Stack:</strong> TypeScript, React, Node.js, Next.js
                        </div>
                      </div>

                      <div className="feedback-item">
                        <span className="feedback-tag tag-warn">GAP</span>
                        <div style={{ textAlign: 'left' }}>
                          <strong>Missing RAG Keywords:</strong> LangGraph, Hybrid Vector Search, Pinecone
                        </div>
                      </div>

                      <button className="btn btn-outline btn-full btn-sm" onClick={() => { setAtsScore(96); addToast('Resume re-analyzed with suggested RAG keywords added! Score: 96/100', 'success'); }}>
                        ⚡ Auto-Inject Missing Keywords
                      </button>
                    </div>

                    <div className="rag-panel">
                      <div className="rag-header">
                        <h4><span>🎙️</span> AI Mock Technical Interview Simulator</h4>
                        <span className="doc-chip-badge">Voice & Code Sync</span>
                      </div>

                      <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.78rem', color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                          CURRENT AI INTERVIEWER QUESTION
                        </div>
                        <p style={{ fontSize: '0.95rem', color: '#f8fafc', fontWeight: 500, lineHeight: 1.5 }}>
                          "{mockQuestion}"
                        </p>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Your Answer / Approach</label>
                        <textarea
                          className="prompt-textarea"
                          style={{ height: '90px' }}
                          placeholder="Type or speak your answer (e.g., hierarchical chunking, summary vectors, contextual re-ranking)..."
                        />
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="btn btn-primary btn-full" onClick={() => addToast('Answer evaluated! Feedback: Excellent focus on Re-ranking and Parent-Child chunking. Score: 9.2/10.', 'success')}>
                          Evaluate Technical Answer ➔
                        </button>
                        <button className="btn btn-outline" onClick={() => { setMockQuestion('How does speculative decoding improve LLM token generation latency?'); addToast('Generated new senior technical question.', 'info'); }}>
                          Next Question ⟳
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =========================================================================
               Curated AI Curriculum Tracks
               ========================================================================= */}
          <section className="section" id="curriculum">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Enterprise Curriculum</span>
                <h2>Master the Leading <span className="gradient-text">AI Architectures</span></h2>
                <p>Designed for engineers transitioning to production Generative AI, RAG, and Autonomous Multi-Agent systems.</p>
              </div>

              <div className="filter-tabs">
                <button className={`tab-btn ${activeCourseFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('all')}>All Tracks</button>
                <button className={`tab-btn ${activeCourseFilter === 'rag' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('rag')}>RAG & Vector Search</button>
                <button className={`tab-btn ${activeCourseFilter === 'agents' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('agents')}>Autonomous Agents</button>
                <button className={`tab-btn ${activeCourseFilter === 'prompts' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('prompts')}>Prompt Studio</button>
                <button className={`tab-btn ${activeCourseFilter === 'interview' ? 'active' : ''}`} onClick={() => setActiveCourseFilter('interview')}>Career & Interview</button>
              </div>

              <div className="courses-grid">
                {filteredCourses.map((course) => (
                  <div key={course._id} className="course-card">
                    <div className="course-top">
                      <span className="course-tag">{course.tag}</span>
                      <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>{course.modelTag}</span>
                    </div>
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <ul className="course-features">
                      {course.highlights.map((h, idx) => (
                        <li key={idx}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="course-footer">
                      <div className="course-fee">
                        <span className="fee-label">Enterprise Access</span>
                        <span className="fee-val">₹{course.fee.toLocaleString()}</span>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => setDemoModalOpen(true)}>
                        Start Module
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
               SaaS Pricing Tiers
               ========================================================================= */}
          <section className="section" id="pricing" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">SaaS Subscription</span>
                <h2>Flexible Plans for <span className="gradient-text">Engineers & Teams</span></h2>
                <p>Deploy AI-powered learning across individual engineers or entire enterprise organizations.</p>
              </div>

              <div className="pricing-grid">
                {/* Free Tier */}
                <div className="pricing-card">
                  <h4>Learner Free</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Foundational AI & prompt engineering access</p>
                  <div className="pricing-price">$0 <span>/ month</span></div>
                  <ul className="pricing-features">
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> 100 RAG queries / month</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> 24/7 AI Community Tutor Chatbot</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> 2 Resume ATS evaluations</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Access to core curriculum</li>
                  </ul>
                  <button className="btn btn-outline btn-full" onClick={() => setActiveTab('login')}>Get Started Free</button>
                </div>

                {/* Pro Tier (Featured) */}
                <div className="pricing-card featured">
                  <div className="pricing-badge">Most Popular</div>
                  <h4>Pro Engineer</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>For serious engineers targeting top AI roles</p>
                  <div className="pricing-price">$29 <span>/ month</span></div>
                  <ul className="pricing-features">
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Unlimited RAG Knowledge queries</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Multi-Agent Autonomous Code Reviewer</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Unlimited AI Mock Interviews & ATS Scorer</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> GPT-4o & Claude 3.5 Sonnet access</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Verified Certificate & Placement Drive</li>
                  </ul>
                  <button className="btn btn-primary btn-full" onClick={() => setDemoModalOpen(true)}>Start 14-Day Pro Trial</button>
                </div>

                {/* Enterprise Tier */}
                <div className="pricing-card">
                  <h4>Enterprise Academy</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Custom AI LMS deployment for organizations</p>
                  <div className="pricing-price">$99 <span>/ seat / mo</span></div>
                  <ul className="pricing-features">
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Custom private vector database (VPC)</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Fine-tuned models on company codebase</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Enterprise SSO (Okta, Azure AD, Google)</li>
                    <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> Dedicated AI Solution Architect & SLA</li>
                  </ul>
                  <button className="btn btn-outline btn-full" onClick={() => setDemoModalOpen(true)}>Schedule Team Demo</button>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
               Architecture Section
               ========================================================================= */}
          <section className="section" id="architecture">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Vercel Multi-Service Pipeline</span>
                <h2>Enterprise Platform <span className="gradient-text">Architecture</span></h2>
                <p>Engineered with dual server isolation on Vercel services for optimal edge latency and throughput.</p>
              </div>

              <div className="features-grid">
                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  </div>
                  <h4>Frontend Service (`client`)</h4>
                  <p>Vite + React single-page application deployed on Vercel Edge with zero-latency client state management and streaming UI.</p>
                </div>

                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                  </div>
                  <h4>Backend API Service (`server`)</h4>
                  <p>Express.js REST microservices handling authenticated JWT sessions, vector database connectors, and MongoDB storage.</p>
                </div>

                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                  </div>
                  <h4>Unified Vercel Routing</h4>
                  <p>Configured with `vercel.json` top-level rewrites routing `/(.*)` to frontend and `/api/(.*)` to server without CORS overhead.</p>
                </div>

                <div className="feature-box">
                  <div className="feature-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <h4>Enterprise Data Security</h4>
                  <p>SOC-2 ready with encrypted in-memory and MongoDB session storage, RBAC roles, and isolated tenant environments.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="container" style={{ margin: '4rem auto' }}>
            <div className="cta-banner">
              <h2>Transform Your Academy with Bytecode AI LMS</h2>
              <p>Harness the power of Retrieval-Augmented Generation, Autonomous AI Tutors, and Interview Optimizers today.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => setDemoModalOpen(true)}>
                  Schedule Live Enterprise Demo
                </button>
                <a href="#playground" className="btn btn-outline btn-lg">
                  Explore Interactive Playground
                </a>
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M12 2v4M12 18v4"></path></svg>
                    </div>
                    <span className="logo-text">Bytecode<span style={{ color: '#06b6d4' }}>.AI</span> LMS</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Autonomous AI-Powered Learning Management System. Equipping developers and engineering teams with live RAG, Prompt Engineering, and Career AI.
                  </p>
                </div>

                <div className="footer-col">
                  <h4>AI Platform Engines</h4>
                  <ul className="footer-links">
                    <li><button onClick={() => { setActiveTab('home'); setEngineTab('rag'); }}>RAG Knowledge Engine</button></li>
                    <li><button onClick={() => { setActiveTab('home'); setEngineTab('agents'); }}>Autonomous AI Agents</button></li>
                    <li><button onClick={() => { setActiveTab('home'); setEngineTab('prompts'); }}>Prompt Engineering Studio</button></li>
                    <li><button onClick={() => { setActiveTab('home'); setEngineTab('interview'); }}>Interview & Resume Scorer</button></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Quick Links</h4>
                  <ul className="footer-links">
                    <li><a href="#playground">Interactive Playground</a></li>
                    <li><a href="#curriculum">Programs & Syllabus</a></li>
                    <li><a href="#pricing">SaaS Pricing</a></li>
                    <li><button onClick={() => setActiveTab('login')}>Sign In to Portal</button></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Stay Ahead in AI</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Receive weekly RAG engineering breakdowns, prompt benchmarks, and model updates.</p>
                  <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); addToast('Subscribed to Bytecode AI Research Dispatch!', 'success'); }}>
                    <input type="email" placeholder="Your work email..." className="newsletter-input" required />
                    <button type="submit" className="btn btn-primary btn-sm">Subscribe</button>
                  </form>
                </div>
              </div>

              <div className="footer-bottom">
                <div>&copy; 2026 Bytecode AI LMS. All rights reserved.</div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#home" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Privacy Policy</a>
                  <a href="#home" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Terms of Service</a>
                  <a href="#home" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Security Compliance</a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* Enterprise Demo Modal */}
      {demoModalOpen && (
        <div className="modal-overlay active" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) setDemoModalOpen(false); }}>
          <div className="modal-card">
            <button className="modal-close" onClick={() => setDemoModalOpen(false)}>✕</button>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Request Enterprise AI LMS Demo</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Schedule a personalized walkthrough of the RAG engine, automated interview builder, and custom vector store for your organization.
            </p>

            <form onSubmit={handleDemoSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sarah Jenkins"
                  style={{ paddingLeft: '1rem' }}
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="sarah@company.com"
                  style={{ paddingLeft: '1rem' }}
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Institute Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Acme Tech Academy"
                  style={{ paddingLeft: '1rem' }}
                  value={demoForm.company}
                  onChange={(e) => setDemoForm({ ...demoForm, company: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Learners / Seats</label>
                <select
                  className="form-control"
                  value={demoForm.learnersCount}
                  onChange={(e) => setDemoForm({ ...demoForm, learnersCount: e.target.value })}
                  style={{ paddingLeft: '1rem', background: '#1e293b', color: '#fff' }}
                >
                  <option value="10-50">10 - 50 Seats</option>
                  <option value="50-250">50 - 250 Seats</option>
                  <option value="250-1000">250 - 1,000 Seats</option>
                  <option value="1000+">1,000+ Enterprise Seats</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1rem' }}>
                Confirm Demo Request ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Notification Toasts */}
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
