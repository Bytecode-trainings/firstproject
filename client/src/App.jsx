import React, { useState, useEffect } from 'react';

// =============================================================================
// Curated IT Job-Ready Placement Tracks
// =============================================================================
const JOB_TRACKS = [
  {
    _id: '1',
    title: 'Enterprise RAG & Full-Stack AI Engineer',
    category: 'rag',
    tag: 'Highest Demand',
    modelTag: 'Pinecone • LangChain • Next.js',
    rating: 4.98,
    reviewsCount: 3420,
    salaryRange: '₹18 - 36 LPA / $135k+',
    openingsCount: '480+ Openings',
    description: 'Master production Retrieval-Augmented Generation (RAG), vector databases, semantic search, and streaming full-stack AI user interfaces.',
    highlights: [
      'Multi-modal document chunking & hybrid BM25 + dense search',
      'Pinecone, Qdrant & ChromaDB vector database architecture',
      'Contextual compression, Cohere re-ranking & LangSmith tracing',
      '12 Real-world portfolio projects with live Vercel deployments'
    ]
  },
  {
    _id: '2',
    title: 'Autonomous AI Agents & Multi-Agent Systems',
    category: 'agents',
    tag: 'Trending Role',
    modelTag: 'LangGraph • CrewAI • AutoGen',
    rating: 4.96,
    reviewsCount: 2890,
    salaryRange: '₹22 - 42 LPA / $150k+',
    openingsCount: '320+ Openings',
    description: 'Build autonomous agents that plan, reason, execute code, browse the web, and collaborate in multi-agent swarms with human-in-the-loop checkpoints.',
    highlights: [
      'ReAct design patterns & stateful graph orchestration',
      'LangGraph cyclical multi-agent workflows with persistence',
      'Tool calling, sandboxed code execution & memory management',
      'Production agent evaluation rubrics and benchmark testing'
    ]
  },
  {
    _id: '3',
    title: 'Full Stack MERN & Cloud Microservices',
    category: 'fullstack',
    tag: 'Job Guarantee Track',
    modelTag: 'React 19 • Node.js • Docker • AWS',
    rating: 4.95,
    reviewsCount: 5120,
    salaryRange: '₹12 - 26 LPA / $105k+',
    openingsCount: '1,200+ Openings',
    description: 'Comprehensive software engineering track: MongoDB, Express, React 19, Node.js, TypeScript, Docker containerization, and AWS microservices.',
    highlights: [
      'Scalable REST & GraphQL microservices with JWT auth',
      'High-throughput Redis caching & distributed rate limiters',
      'CI/CD GitHub Actions pipelines & AWS ECS deployment',
      'System design blueprints for 100k+ concurrent users'
    ]
  },
  {
    _id: '4',
    title: 'Prompt Engineering & LLM Systems Architect',
    category: 'prompts',
    tag: 'Fast-Track Role',
    modelTag: 'GPT-4o • Claude 3.5 • Llama 3',
    rating: 4.92,
    reviewsCount: 1980,
    salaryRange: '₹16 - 32 LPA / $125k+',
    openingsCount: '290+ Openings',
    description: 'Master advanced prompt architecture: Few-shot, Chain-of-Thought, System Steering, Guardrails, and Ragas automated LLM evaluation pipelines.',
    highlights: [
      'Zero-Shot to Few-Shot dynamic prompt template generation',
      'LLM-as-a-Judge automated scoring & hallucination filters',
      'Adversarial red-teaming, jailbreak defense & token optimization',
      'Fine-tuning open weights with LoRA & QLoRA on domain datasets'
    ]
  }
];

// =============================================================================
// Live IT Job Openings Board
// =============================================================================
const LIVE_JOB_OPENINGS = [
  {
    id: 'job-1',
    company: 'Swiggy',
    logo: '🍔',
    role: 'Senior Full-Stack AI Engineer',
    location: 'Bangalore (Hybrid)',
    experience: '2 - 5 Years',
    salary: '₹28 - ₹38 LPA',
    badge: 'Urgent Hiring',
    skills: ['React 19', 'Node.js', 'Pinecone', 'LangChain', 'FastAPI'],
    targetQuestion: 'How would you architect a real-time recommendation feed combining hybrid vector search with low-latency Redis caching?'
  },
  {
    id: 'job-2',
    company: 'Amazon Web Services',
    logo: '☁️',
    role: 'Generative AI Solutions Architect',
    location: 'Hyderabad / Remote',
    experience: '3 - 7 Years',
    salary: '₹34 - ₹48 LPA / $165k',
    badge: 'Top Tier',
    skills: ['AWS Bedrock', 'Python', 'RAG Pipelines', 'Vector DBs', 'System Design'],
    targetQuestion: 'Walk me through how you prevent hallucination when feeding multi-tenant enterprise PDF contracts into an AWS Bedrock RAG pipeline.'
  },
  {
    id: 'job-3',
    company: 'Razorpay',
    logo: '💳',
    role: 'Backend Microservices Engineer',
    location: 'Bangalore (On-site)',
    experience: '1 - 4 Years',
    salary: '₹20 - ₹32 LPA',
    badge: 'Actively Interviewing',
    skills: ['Node.js', 'MongoDB', 'Redis', 'Kafka', 'Docker'],
    targetQuestion: 'Design an idempotent payment processing webhook pipeline that guarantees exactly-once execution under heavy network retries.'
  },
  {
    id: 'job-4',
    company: 'Microsoft',
    logo: '💻',
    role: 'Cloud & AI Platform Engineer',
    location: 'Hyderabad / Bengaluru',
    experience: '2 - 6 Years',
    salary: '₹30 - ₹45 LPA',
    badge: 'Fortune 50',
    skills: ['Azure OpenAI', 'Kubernetes', 'TypeScript', 'LangGraph', 'CI/CD'],
    targetQuestion: 'Explain how you orchestrate cyclic multi-agent task execution in LangGraph with human-in-the-loop review checkpoints.'
  }
];

// =============================================================================
// Mock Interview Presets
// =============================================================================
const INTERVIEW_PRESETS = [
  {
    role: 'Full-Stack AI Developer',
    question: 'How do you structure a production RAG application to handle documents exceeding the context window while keeping query latency under 200ms?',
    sampleAnswer: 'We implement hierarchical semantic chunking with parent-child document stores in Pinecone. The initial vector search retrieves lightweight parent IDs via reciprocal rank fusion (RRF), followed by Cohere re-ranking on the top 5 chunks before feeding into GPT-4o.',
    score: { technical: 94, architecture: 92, communication: 96, overall: 94 },
    feedback: 'Outstanding explanation! Explicitly mentioning Reciprocal Rank Fusion (RRF) and parent-child document mapping demonstrates real enterprise experience.'
  },
  {
    role: 'Backend Microservices Engineer',
    question: 'How would you prevent race conditions and implement distributed rate limiting for 50,000 requests/second across multiple regional nodes?',
    sampleAnswer: 'We implement a sliding-window rate limiter using Redis sorted sets (ZSET) executed inside an atomic Lua script. This eliminates client-server round-trips and guarantees atomicity without distributed lock overhead.',
    score: { technical: 96, architecture: 95, communication: 91, overall: 94 },
    feedback: 'High-caliber answer. Lua scripts inside Redis are the industry standard for atomicity at scale. Great mention of sliding-window algorithms.'
  },
  {
    role: 'Autonomous AI Agent Engineer',
    question: 'Explain the difference between simple linear LangChain LCEL pipelines and stateful cyclic graphs in LangGraph for complex problem solving.',
    sampleAnswer: 'LCEL is a directed acyclic graph (DAG) ideal for one-shot retrieval and generation. LangGraph introduces cycles, persistent state checkpoints, and branch conditions, allowing agents to iteratively self-correct code errors and loop until test suites pass.',
    score: { technical: 98, architecture: 96, communication: 95, overall: 96 },
    feedback: 'Exceptional clarity. Highlighting self-correction loops and state persistence directly matches what FAANG interviewers look for in Agentic roles.'
  }
];

export default function App() {
  // Navigation & Global State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'login' | 'dashboard'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Job Seeker Readiness Diagnostic State
  const [jobRoleTarget, setJobRoleTarget] = useState('Full-Stack AI Developer');
  const [userExperience, setUserExperience] = useState('1-3 years');
  const [readinessScore, setReadinessScore] = useState(88);
  const [diagnosing, setDiagnosing] = useState(false);

  // Playground Engine Tab
  const [engineTab, setEngineTab] = useState('interview'); // 'interview' | 'ats' | 'rag' | 'agents' | 'prompts'

  // Interactive Mock Interview Simulator State
  const [mockRoleIndex, setMockRoleIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState(INTERVIEW_PRESETS[0].sampleAnswer);
  const [evaluatingInterview, setEvaluatingInterview] = useState(false);
  const [interviewResult, setInterviewResult] = useState(INTERVIEW_PRESETS[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Interactive ATS Resume Reviewer State
  const [atsScore, setAtsScore] = useState(79);
  const [isOptimizingATS, setIsOptimizingATS] = useState(false);
  const [resumeKeywords, setResumeKeywords] = useState([
    { word: 'React 19 & TypeScript', status: 'matched' },
    { word: 'Node.js & Express REST APIs', status: 'matched' },
    { word: 'MongoDB & Mongoose', status: 'matched' },
    { word: 'Pinecone Vector DB', status: 'missing' },
    { word: 'RAG Hybrid Retrieval (BM25)', status: 'missing' },
    { word: 'LangGraph Cyclic Agents', status: 'missing' },
    { word: 'Docker & AWS CI/CD', status: 'missing' }
  ]);
  const [bulletPointPreview, setBulletPointPreview] = useState(
    '• Developed responsive full-stack applications using React, Node.js, and MongoDB with secure JWT authentication.'
  );

  // Interactive RAG Engine State
  const [ragDoc, setRagDoc] = useState('Google-System-Design-Playbook.pdf');
  const [ragQuery, setRagQuery] = useState('How to design a distributed cache with high availability and 99.99% uptime?');
  const [ragLoading, setRagLoading] = useState(false);
  const [ragResult, setRagResult] = useState({
    score: '97.4% Cosine Match',
    source: 'Google-System-Design-Playbook.pdf (Section 4.2)',
    retrievedChunk: 'Chunk #108: "Consistent hashing with virtual nodes distributes load evenly across memcached/Redis clusters. Cache replication with asynchronous replication and client-side connection pooling prevents hot-spot degradation during traffic surges."',
    answer: 'According to the IT Interview Knowledge Base (Google System Design Playbook): Distributed caching achieves high availability via consistent hashing with 100+ virtual nodes per physical host. Pair this with a write-through or cache-aside strategy and Redis Sentinel/Cluster for automated failover with sub-second switchover.'
  });

  // Interactive AI Agent Chatbot State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'agent',
      thought: 'Agent initialized. Knowledge base: 10,000+ Real IT Technical Interview Transcripts (2024-2026). Target: IT Job Placement.',
      text: 'Hello! I am your 24/7 Bytecode AI Career Mentor. I can review your resume, conduct a 1:1 technical interview drill, or explain complex system design algorithms. What IT role are you targeting?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [agentThinking, setAgentThinking] = useState(false);

  // Interactive Prompt Studio State
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [promptTask, setPromptTask] = useState('Interview Code Evaluation');
  const [userPrompt, setUserPrompt] = useState('Generate a hard-level coding interview challenge on sliding window algorithms in JavaScript with time/space complexity analysis.');
  const [promptOutput, setPromptOutput] = useState(`✨ Auto-Generated IT Technical Interview Challenge (Evaluator Mode: ${selectedModel}):\n\nProblem: Longest Substring with At Most K Distinct Characters\n• Difficulty: Hard (FAANG standard)\n• Constraints: String length <= 10^5, K <= 50, O(N) Time, O(K) Space\n• Evaluation Rubric: Map-based sliding window count (40%), Edge cases: K=0 or K > unique chars (30%), Code clarity & variable naming (30%).`);

  // Active Job Filter
  const [jobCategoryFilter, setJobCategoryFilter] = useState('all');

  // Lead / Enterprise / Career Consultation Modal
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({
    name: '',
    email: '',
    phone: '',
    targetRole: 'Full-Stack AI Developer',
    experience: 'Fresher / 0-1 yrs'
  });

  // Auth State
  const [authMode, setAuthMode] = useState('login');
  const [loginData, setLoginData] = useState({
    email: 'jobseeker@bytecode.ai',
    password: 'password2026',
    role: 'jobseeker'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('bytecode_jobseeker_user');
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

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer simulation for voice recording in mock interview
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds(sec => sec + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Handle Mock Interview Evaluation
  const handleEvaluateMock = () => {
    setEvaluatingInterview(true);
    setTimeout(() => {
      setEvaluatingInterview(false);
      const activePreset = INTERVIEW_PRESETS[mockRoleIndex];
      setInterviewResult({
        ...activePreset,
        score: {
          technical: 95,
          architecture: 93,
          communication: 97,
          overall: 95
        },
        feedback: `✨ Outstanding response! Your response clearly demonstrated practical IT experience. Identified strengths: Strong algorithmic reasoning, zero hesitation on distributed scaling concepts, and standard STAR presentation formatting.`
      });
      addToast('🎯 Technical answer evaluated against Top IT Hiring Rubrics! Score: 95/100', 'success');
    }, 700);
  };

  // Handle 1-Click ATS Resume Optimization
  const handleOptimizeATS = () => {
    setIsOptimizingATS(true);
    addToast('Scanning 150+ Top IT Job Descriptions and injecting high-affinity keywords...', 'info');
    setTimeout(() => {
      setIsOptimizingATS(false);
      setAtsScore(96);
      setResumeKeywords(prev => prev.map(k => ({ ...k, status: 'matched' })));
      setBulletPointPreview(
        '• Architected high-performance Full-Stack AI microservices using React 19, TypeScript, and Node.js, integrating Pinecone vector databases and RAG hybrid search pipelines with LangGraph multi-agent automation to reduce query latency by 42%.'
      );
      addToast('🚀 Resume optimized! ATS Match score boosted from 79% to 96%!', 'success');
    }, 800);
  };

  // Handle RAG Semantic Retrieval
  const handleRunRAG = () => {
    if (!ragQuery.trim()) return;
    setRagLoading(true);
    setTimeout(() => {
      setRagLoading(false);
      setRagResult({
        score: '98.6% Cosine Similarity',
        source: `${ragDoc} (Indexed Interview Knowledge Base)`,
        retrievedChunk: `Chunk #214 [Source: ${ragDoc}]: "Consistent hashing reduces rebalancing churn from O(N) to O(1/N) nodes during horizontal cluster scaling. Cache-aside pattern isolates reads, while Redis Sentinel handles automatic leader election in under 2 seconds."`,
        answer: `[Grounded IT Interview Answer]: For distributed caching at scale, the candidate should highlight three core architectural pillars: (1) Consistent Hashing with virtual ring replication to eliminate hotspot skew, (2) Cache-Aside with TTL jitter to eliminate cache stampedes, and (3) Multi-AZ Redis Sentinel clustering for automated high availability and 99.99% uptime.`
      });
      addToast('🔍 RAG Engine retrieved verified IT interview answer with citations!', 'success');
    }, 600);
  };

  // Handle AI Agent Chat
  const handleSendChat = (presetText) => {
    const text = presetText || chatInput;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text }];
    setChatMessages(newMsgs);
    if (!presetText) setChatInput('');
    setAgentThinking(true);

    setTimeout(() => {
      setAgentThinking(false);
      let thought = 'Agent plan: Match query against IT placement rubrics -> Synthesize actionable preparation steps.';
      let reply = `Here is your targeted career advice for "${text}": In technical IT interviews, top tech companies prioritize both system scalability and crisp communication. Focus on articulating your architectural trade-offs using the STAR method. Would you like to run a 5-minute mock interview on this exact topic?`;

      const lower = text.toLowerCase();
      if (lower.includes('resume') || lower.includes('ats')) {
        thought = 'Triggered ATS Resume Diagnostic Subagent.';
        reply = 'Your resume can easily reach a 95%+ ATS score. The primary keywords currently missing from IT job applications are "RAG Hybrid Search", "Pinecone Vector Store", and "Docker Containerization". I can auto-generate tailored bullet points for your projects.';
      } else if (lower.includes('amazon') || lower.includes('system design')) {
        thought = 'Retrieved Amazon Leadership Principles & System Design rubric.';
        reply = 'For Amazon system design rounds: (1) Clarify constraints upfront (QPS, read/write ratio, latency targets), (2) Sketch high-level architecture before deep diving, and (3) Explicitly connect choices to Amazon principles like "Customer Obsession" and "Bias for Action".';
      } else if (lower.includes('salary') || lower.includes('package')) {
        thought = 'Pulling 2026 IT Compensation Benchmarks.';
        reply = 'For Full-Stack AI and RAG engineers with 2-4 years experience, median IT compensation currently ranges between ₹22 - ₹36 LPA in India, and $125k - $160k in global remote roles. Having verifiable GitHub repositories with production RAG projects is the #1 lever during salary negotiations.';
      }

      setChatMessages(prev => [...prev, { sender: 'agent', thought, text: reply }]);
    }, 600);
  };

  // Handle Job Prep Trigger from Job Board
  const handlePrepForJob = (job) => {
    setEngineTab('interview');
    setCandidateAnswer(`Here is my architectural strategy for ${job.company}: ${job.targetQuestion}\n\nI would implement a resilient microservice architecture utilizing ${job.skills.slice(0, 3).join(', ')}...`);
    addToast(`🎯 Loaded ${job.company} (${job.role}) interview simulator! Scroll to playground to practice.`, 'success');
    const elem = document.getElementById('playground');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle Consultation Submit
  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultModalOpen(false);
    addToast(`🚀 Thank you ${consultForm.name}! An IT Placement Mentor will contact you within 2 hours with your customized preparation roadmap.`, 'success');
    setConsultForm({ name: '', email: '', phone: '', targetRole: 'Full-Stack AI Developer', experience: 'Fresher / 0-1 yrs' });
  };

  // Handle Sign In Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: loginData.email.split('@')[0],
      email: loginData.email,
      role: loginData.role
    };
    setUser(newUser);
    localStorage.setItem('bytecode_jobseeker_user', JSON.stringify(newUser));
    addToast(`✨ Welcome back, ${newUser.name}! Your IT Job Placement Dashboard is ready.`, 'success');
    setActiveTab('home');
  };

  // Run Job Readiness Diagnostic
  const handleRunDiagnostic = () => {
    setDiagnosing(true);
    setTimeout(() => {
      setDiagnosing(false);
      setReadinessScore(93);
      addToast('📊 Diagnostic complete! Your IT Job Readiness Score is 93/100 (Interview Ready)!', 'success');
    }, 600);
  };

  return (
    <div className="mobile-app-wrapper">
      {/* =========================================================================
           Header (Mobile Friendly with Drawer & Large Tap Targets)
           ========================================================================= */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo" onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
            </div>
            <div className="logo-brand">
              <span className="logo-text">Bytecode<span className="logo-accent">.AI</span></span>
              <span className="logo-subtag">IT JOB LMS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul className="nav-links">
              <li><button className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>Overview</button></li>
              <li><a href="#playground" className="nav-link" onClick={() => setActiveTab('home')}>AI Interview Engines</a></li>
              <li><a href="#job-openings" className="nav-link" onClick={() => setActiveTab('home')}>Active IT Jobs</a></li>
              <li><a href="#tracks" className="nav-link" onClick={() => setActiveTab('home')}>Placement Tracks</a></li>
              <li><a href="#comparison" className="nav-link" onClick={() => setActiveTab('home')}>Why Bytecode</a></li>
            </ul>
          </nav>

          {/* Action CTAs & Mobile Hamburger */}
          <div className="nav-actions">
            {user ? (
              <div className="user-badge">
                <span className="user-badge-avatar">{user.name ? user.name[0].toUpperCase() : 'J'}</span>
                <span className="user-name-text">{user.name}</span>
                <button
                  className="btn-logout"
                  title="Sign Out"
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem('bytecode_jobseeker_user');
                    addToast('Signed out of IT Placement portal.', 'info');
                  }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button className="btn btn-outline btn-sm nav-login-btn" onClick={() => setActiveTab('login')}>
                Sign In
              </button>
            )}
            <button className="btn btn-primary btn-sm nav-cta-btn" onClick={() => setConsultModalOpen(true)}>
              Get Hired in IT ➔
            </button>
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Drawer"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Out Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-header">
            <div className="logo">
              <span className="logo-text">Bytecode<span className="logo-accent">.AI</span> LMS</span>
            </div>
            <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
          </div>
          <div className="mobile-drawer-body">
            <p className="mobile-drawer-motto">AI-Powered LMS for Active IT Job Seekers</p>
            <ul className="mobile-drawer-links">
              <li>
                <a href="#home" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
                  <span>🏠</span> Home & Readiness Diagnostic
                </a>
              </li>
              <li>
                <a href="#playground" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
                  <span>🎙️</span> AI Mock Technical Interview
                </a>
              </li>
              <li>
                <a href="#playground" onClick={() => { setActiveTab('home'); setEngineTab('ats'); setMobileMenuOpen(false); }}>
                  <span>📄</span> ATS Resume Optimizer
                </a>
              </li>
              <li>
                <a href="#job-openings" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
                  <span>💼</span> Active IT Job Openings (Live Feed)
                </a>
              </li>
              <li>
                <a href="#tracks" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
                  <span>🚀</span> Job Placement Tracks
                </a>
              </li>
              <li>
                <a href="#comparison" onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}>
                  <span>⚡</span> Traditional Institute vs AI LMS
                </a>
              </li>
            </ul>
            <div className="mobile-drawer-actions">
              <button
                className="btn btn-primary btn-full btn-lg"
                onClick={() => { setConsultModalOpen(true); setMobileMenuOpen(false); }}
              >
                Book 1:1 IT Career Strategy ➔
              </button>
              {!user && (
                <button
                  className="btn btn-outline btn-full"
                  onClick={() => { setActiveTab('login'); setMobileMenuOpen(false); }}
                >
                  Candidate Sign In
                </button>
              )}
            </div>
          </div>
        </div>
        {mobileMenuOpen && <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>}
      </header>

      {/* =========================================================================
           View 1: Sign In & Job Seeker Account Portal
           ========================================================================= */}
      {activeTab === 'login' ? (
        <section className="auth-page">
          <div className="auth-wrapper">
            <div className="auth-showcase">
              <div className="badge-pill">
                <span className="pulse-dot"></span>
                <span>IT Job Seeker Portal</span>
              </div>
              <h2 style={{ fontSize: '2.2rem', lineHeight: 1.25, marginBottom: '1rem' }}>
                Your Fast-Track into <br />
                <span className="gradient-accent-text">High-Paying IT Careers.</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Log in to access your customized AI Mock Interview transcripts, ATS resume keyword analyzers, RAG technical search engines, and direct hiring partner referrals.
              </p>

              <div className="auth-features-list">
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">🎙️</div>
                  <div className="auth-feature-text">
                    <h5>Unlimited AI Mock Interviews</h5>
                    <p>Simulated technical rounds for FAANG, MNCs, and high-growth IT startups.</p>
                  </div>
                </div>
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">📄</div>
                  <div className="auth-feature-text">
                    <h5>Real-Time ATS Resume Scorer</h5>
                    <p>Detect keyword gaps and auto-generate quantifiable bullet points.</p>
                  </div>
                </div>
                <div className="auth-feature-item">
                  <div className="auth-feature-icon">🤝</div>
                  <div className="auth-feature-text">
                    <h5>850+ Direct IT Hiring Partners</h5>
                    <p>Skip standard screening queues with verified Bytecode AI readiness badges.</p>
                  </div>
                </div>
              </div>

              <div className="auth-testimonial-box">
                <p>
                  "I was stuck applying on LinkedIn for 4 months with zero callbacks. Bytecode AI’s ATS resume keyword injector and mock interviews helped me crack a ₹24 LPA Full-Stack role in 3 weeks."
                </p>
                <span>— Karthik V., Software Engineer @ Tier-1 IT Firm</span>
              </div>
            </div>

            <div className="auth-form-side">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <button
                  onClick={() => setActiveTab('home')}
                  className="btn-back-link"
                >
                  ← Back to Home
                </button>
                <span className="sso-badge">
                  <span className="sso-dot"></span> Active Placement Drive
                </span>
              </div>

              <div className="auth-header">
                <h2>{authMode === 'login' ? 'Job Seeker Sign In' : 'Create Free Candidate Account'}</h2>
                <p>{authMode === 'login' ? 'Access your AI interview drills and ATS resume scores' : 'Start your journey to land an IT job in 90 days'}</p>
              </div>

              <div className="auth-switch-tabs">
                <button className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`} onClick={() => setAuthMode('login')}>Sign In</button>
                <button className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`} onClick={() => setAuthMode('register')}>New Candidate</button>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    placeholder="you@email.com"
                  />
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
                      placeholder="••••••••"
                    />
                    <button type="button" className="toggle-pwd" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? '👁' : '👁‍🗨'}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Target IT Career Path</label>
                  <select
                    className="form-control"
                    value={jobRoleTarget}
                    onChange={(e) => setJobRoleTarget(e.target.value)}
                  >
                    <option value="Full-Stack AI Developer">Full-Stack AI / MERN Engineer</option>
                    <option value="Enterprise RAG & Vector Architect">Enterprise RAG & Vector Architect</option>
                    <option value="Autonomous AI Agent Engineer">Autonomous AI Agent Engineer</option>
                    <option value="Cloud & DevOps Engineer">Cloud & DevOps Microservices Engineer</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1.25rem' }}>
                  {authMode === 'login' ? 'Sign In to Job Placement Portal ➔' : 'Create Candidate Account & Start Prep ➔'}
                </button>
              </form>

              <div className="social-divider">
                <span>or continue with one click</span>
              </div>

              <div className="social-login-grid">
                <button type="button" className="social-btn" onClick={() => addToast('Google Account authenticated for IT Job Seeker portal.', 'info')}>
                  Google
                </button>
                <button type="button" className="social-btn" onClick={() => addToast('GitHub Developer profile connected for portfolio sync.', 'info')}>
                  GitHub
                </button>
                <button type="button" className="social-btn" onClick={() => addToast('LinkedIn profile connected for 1-click ATS scan.', 'info')}>
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* =========================================================================
             View 2: Main AI Job Placement Platform (Mobile-First)
             ========================================================================= */
        <main>
          {/* Hero Section: Focused on Active IT Job Seekers */}
          <section className="hero-section" id="home">
            <div className="container hero-grid">
              <div className="hero-content">
                <div className="badge-pill">
                  <span className="pulse-dot"></span>
                  <span>AI-Powered LMS for Active IT Job Seekers</span>
                </div>

                <h1 className="hero-title">
                  Land Your Next IT Job. <br />
                  <span className="gradient-text">Powered by Autonomous AI LMS.</span>
                </h1>

                <p className="hero-description">
                  Stop memorizing static lectures. Bytecode AI is the first autonomous LMS engineered specifically for active IT job seekers. Practice real-time <strong>AI Mock Interviews</strong>, optimize resumes with <strong>ATS Keyword Scanners</strong>, master <strong>RAG Engines</strong>, and get hired by 850+ tech partners.
                </p>

                {/* Mobile-Friendly CTAs */}
                <div className="hero-ctas">
                  <a href="#playground" className="btn btn-primary btn-lg hero-main-cta">
                    <span>🎙️</span> Practice AI Mock Interview
                  </a>
                  <button className="btn btn-outline btn-lg" onClick={() => { setEngineTab('ats'); const el = document.getElementById('playground'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>
                    <span>📄</span> Scan ATS Resume Score
                  </button>
                </div>

                {/* Job Seeker Proof Metrics */}
                <div className="hero-stats-row">
                  <div className="stat-item">
                    <h3>94.8%</h3>
                    <p>IT Offer Placement Rate</p>
                  </div>
                  <div className="stat-item">
                    <h3>₹24.5 LPA</h3>
                    <p>Avg Tech Starting Package</p>
                  </div>
                  <div className="stat-item">
                    <h3>850+</h3>
                    <p>Active IT Hiring Partners</p>
                  </div>
                  <div className="stat-item">
                    <h3>3.2x</h3>
                    <p>Faster Offer Letter</p>
                  </div>
                </div>
              </div>

              {/* Interactive Live Job Readiness Card (Mobile-First Hero Visual) */}
              <div className="hero-visual">
                <div className="readiness-card">
                  <div className="readiness-header">
                    <div className="readiness-title-row">
                      <span className="pulse-dot"></span>
                      <h4>Live IT Job Readiness Diagnostic</h4>
                    </div>
                    <span className="role-tag-live">Active Job Seeker</span>
                  </div>

                  <div className="diagnostic-selectors">
                    <div className="diagnostic-group">
                      <label>Target IT Role:</label>
                      <select
                        value={jobRoleTarget}
                        onChange={(e) => setJobRoleTarget(e.target.value)}
                        className="diagnostic-select"
                      >
                        <option value="Full-Stack AI Developer">Full-Stack AI Developer (MERN + GenAI)</option>
                        <option value="Enterprise RAG Architect">Enterprise RAG Architect</option>
                        <option value="Autonomous Agent Engineer">Autonomous AI Agent Engineer</option>
                        <option value="Cloud Microservices Engineer">Cloud & DevOps Engineer</option>
                      </select>
                    </div>

                    <div className="diagnostic-group">
                      <label>Current Experience:</label>
                      <select
                        value={userExperience}
                        onChange={(e) => setUserExperience(e.target.value)}
                        className="diagnostic-select"
                      >
                        <option value="0-1 years">Fresher / Career Switcher (0-1 yrs)</option>
                        <option value="1-3 years">Junior / Mid Developer (1-3 yrs)</option>
                        <option value="3-6 years">Experienced Engineer (3-6 yrs)</option>
                      </select>
                    </div>
                  </div>

                  {/* Readiness Gauge Meter */}
                  <div className="readiness-meter-wrapper">
                    <div className="meter-circle">
                      <span className="meter-val">{readinessScore}%</span>
                      <span className="meter-label">PLACEMENT READY</span>
                    </div>
                    <div className="meter-details">
                      <div className="meter-row">
                        <span>System Design & Coding:</span>
                        <strong style={{ color: '#34d399' }}>94% (Strong)</strong>
                      </div>
                      <div className="meter-row">
                        <span>ATS Resume Keywords:</span>
                        <strong style={{ color: readinessScore > 90 ? '#34d399' : '#fbbf24' }}>
                          {readinessScore > 90 ? '96% (Optimized)' : '79% (Gaps Found)'}
                        </strong>
                      </div>
                      <div className="meter-row">
                        <span>Mock Interview Confidence:</span>
                        <strong style={{ color: '#38bdf8' }}>92% (Top 5% Cohort)</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-full"
                    onClick={handleRunDiagnostic}
                    disabled={diagnosing}
                  >
                    {diagnosing ? 'Analyzing 150+ IT Hiring Rubrics...' : '⚡ Re-Calculate Job Readiness Score'}
                  </button>

                  <div className="readiness-footer-tip">
                    <span>💡 Tip:</span> Scoring above 90% unlocks direct referrals to Google, Amazon, and top Indian IT startups.
                  </div>
                </div>

                {/* Floating Micro-Badges */}
                <div className="floating-pill pill-1">
                  <span className="pill-icon">🚀</span>
                  <span className="pill-text">Direct IT Referrals</span>
                </div>
                <div className="floating-pill pill-2">
                  <span className="pill-icon">🎯</span>
                  <span className="pill-text">Zero-Hallucination LMS</span>
                </div>
              </div>
            </div>
          </section>

          {/* Hiring Partners Ribbon */}
          <section className="hiring-ribbon">
            <div className="container">
              <div className="ribbon-label">WHERE BYTECODE AI JOB SEEKERS GET PLACED</div>
              <div className="company-logos">
                <div className="company-chip">⚡ Google</div>
                <div className="company-chip">☁️ Amazon AWS</div>
                <div className="company-chip">💳 Razorpay</div>
                <div className="company-chip">🍔 Swiggy</div>
                <div className="company-chip">💻 Microsoft</div>
                <div className="company-chip">🏢 TCS Digital</div>
                <div className="company-chip">🌐 Infosys Springboard</div>
                <div className="company-chip">🦄 AI Unicorn Startups</div>
              </div>
            </div>
          </section>

          {/* =========================================================================
               Interactive AI Playground (The 4 Core Pillars for Job Seekers)
               ========================================================================= */}
          <section className="ai-playground-section" id="playground">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Interactive Candidate Playground</span>
                <h2>Autonomous <span className="gradient-text">IT Job Preparation Engines</span></h2>
                <p>Engineered for active job seekers. Test the four foundational AI pillars that replace outdated training institutes.</p>
              </div>

              {/* Mobile-Friendly Horizontal Scroll Tabs */}
              <div className="ai-engine-tabs-scroll-container">
                <div className="ai-engine-tabs">
                  <button
                    className={`ai-engine-btn ${engineTab === 'interview' ? 'active' : ''}`}
                    onClick={() => setEngineTab('interview')}
                  >
                    <span>🎙️</span> AI Mock Interview Simulator
                  </button>
                  <button
                    className={`ai-engine-btn ${engineTab === 'ats' ? 'active' : ''}`}
                    onClick={() => setEngineTab('ats')}
                  >
                    <span>📄</span> ATS Resume & Keyword Scorer
                  </button>
                  <button
                    className={`ai-engine-btn ${engineTab === 'rag' ? 'active' : ''}`}
                    onClick={() => setEngineTab('rag')}
                  >
                    <span>📚</span> RAG Interview Knowledge Retrieval
                  </button>
                  <button
                    className={`ai-engine-btn ${engineTab === 'agents' ? 'active' : ''}`}
                    onClick={() => setEngineTab('agents')}
                  >
                    <span>🤖</span> 24/7 AI Career Mentor Agent
                  </button>
                  <button
                    className={`ai-engine-btn ${engineTab === 'prompts' ? 'active' : ''}`}
                    onClick={() => setEngineTab('prompts')}
                  >
                    <span>⚡</span> Prompt Engineering Studio
                  </button>
                </div>
              </div>

              {/* Pillar 1: AI Mock Interview Simulator */}
              {engineTab === 'interview' && (
                <div className="ai-playground-card">
                  <div className="interview-simulator-grid">
                    {/* Left: Interview Session & Voice Simulation */}
                    <div className="simulator-left">
                      <div className="simulator-status-bar">
                        <div className="interviewer-meta">
                          <span className="avatar-chip">AI</span>
                          <div>
                            <h5>Senior Staff Interviewer (AI Agent)</h5>
                            <span style={{ fontSize: '0.78rem', color: '#10b981' }}>● Live Diagnostic Session</span>
                          </div>
                        </div>
                        <span className="badge-pill" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>
                          Target: {INTERVIEW_PRESETS[mockRoleIndex].role}
                        </span>
                      </div>

                      {/* Role Selector Chips */}
                      <div className="preset-roles-row">
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Role:</span>
                        {INTERVIEW_PRESETS.map((p, idx) => (
                          <button
                            key={idx}
                            className={`preset-chip ${mockRoleIndex === idx ? 'active' : ''}`}
                            onClick={() => {
                              setMockRoleIndex(idx);
                              setCandidateAnswer(p.sampleAnswer);
                              setInterviewResult(p);
                            }}
                          >
                            {p.role}
                          </button>
                        ))}
                      </div>

                      {/* Question Box */}
                      <div className="interview-question-box">
                        <span className="question-badge">INTERVIEW QUESTION</span>
                        <p className="question-text">"{INTERVIEW_PRESETS[mockRoleIndex].question}"</p>
                      </div>

                      {/* Candidate Answer Input */}
                      <div className="form-group" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <label className="form-label" style={{ margin: 0 }}>Your Technical Explanation</label>
                          <button
                            type="button"
                            className={`btn-record ${isRecording ? 'recording' : ''}`}
                            onClick={() => {
                              setIsRecording(!isRecording);
                              if (!isRecording) {
                                addToast('🎙️ Simulated microphone active. Speak your answer...', 'info');
                              } else {
                                addToast('Voice response transcribed to text input.', 'success');
                              }
                            }}
                          >
                            <span>{isRecording ? '⏹ Stop Recording' : '🎙️ Record Voice Answer'}</span>
                            {isRecording && <span className="rec-time">({recordingSeconds}s)</span>}
                          </button>
                        </div>
                        <textarea
                          className="prompt-textarea"
                          style={{ height: '120px' }}
                          value={candidateAnswer}
                          onChange={(e) => setCandidateAnswer(e.target.value)}
                          placeholder="Type or dictate your technical response..."
                        />
                      </div>

                      <div className="simulator-actions">
                        <button
                          className="btn btn-primary btn-full"
                          onClick={handleEvaluateMock}
                          disabled={evaluatingInterview}
                        >
                          {evaluatingInterview ? 'Grading against Top IT Rubrics...' : '⚡ Submit Answer for Instant AI Rubric Feedback'}
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() => {
                            const nextIdx = (mockRoleIndex + 1) % INTERVIEW_PRESETS.length;
                            setMockRoleIndex(nextIdx);
                            setCandidateAnswer(INTERVIEW_PRESETS[nextIdx].sampleAnswer);
                            setInterviewResult(INTERVIEW_PRESETS[nextIdx]);
                            addToast(`Next technical interview question loaded.`, 'info');
                          }}
                        >
                          Next Question ➔
                        </button>
                      </div>
                    </div>

                    {/* Right: Instant Rubric Evaluation */}
                    <div className="simulator-right">
                      <div className="rubric-header">
                        <h4>Candidate Evaluation Rubric</h4>
                        <span className="rubric-score-badge">{interviewResult.score.overall}/100</span>
                      </div>

                      <div className="rubric-metrics">
                        <div className="rubric-metric-item">
                          <div className="metric-row">
                            <span>Technical Accuracy:</span>
                            <strong>{interviewResult.score.technical}%</strong>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${interviewResult.score.technical}%` }}></div>
                          </div>
                        </div>

                        <div className="rubric-metric-item">
                          <div className="metric-row">
                            <span>System Scalability:</span>
                            <strong>{interviewResult.score.architecture}%</strong>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${interviewResult.score.architecture}%` }}></div>
                          </div>
                        </div>

                        <div className="rubric-metric-item">
                          <div className="metric-row">
                            <span>STAR Format Communication:</span>
                            <strong>{interviewResult.score.communication}%</strong>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${interviewResult.score.communication}%` }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="rubric-feedback-box">
                        <span className="feedback-title">✓ SENIOR AI INTERVIEWER FEEDBACK</span>
                        <p>{interviewResult.feedback}</p>
                      </div>

                      <div className="rubric-checklist">
                        <div className="checklist-item pass">
                          <span>✓</span> Zero technical hallucinations detected
                        </div>
                        <div className="checklist-item pass">
                          <span>✓</span> Clear mention of time & space complexity
                        </div>
                        <div className="checklist-item pass">
                          <span>✓</span> FAANG Tier-1 hiring threshold surpassed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pillar 2: ATS Resume Reviewer & Keyword Optimizer */}
              {engineTab === 'ats' && (
                <div className="ai-playground-card">
                  <div className="ats-grid">
                    <div className="ats-score-panel">
                      <div className="score-circle">
                        <h3>{atsScore}</h3>
                        <span>ATS SCORE</span>
                      </div>
                      <h4>Target: {jobRoleTarget}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                        Evaluated across 150+ Top IT Hiring Partner screening filters (Google, Amazon, Swiggy, TCS).
                      </p>

                      <button
                        className="btn btn-primary btn-full"
                        onClick={handleOptimizeATS}
                        disabled={isOptimizingATS}
                      >
                        {isOptimizingATS ? 'Injecting Missing IT Keywords...' : '⚡ 1-Click AI Resume Keyword Injector'}
                      </button>

                      <div style={{ marginTop: '1.25rem', textAlign: 'left' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
                          ATS Screening Keywords
                        </span>
                        <div className="keywords-chip-list">
                          {resumeKeywords.map((k, idx) => (
                            <div key={idx} className={`kw-chip ${k.status}`}>
                              <span>{k.status === 'matched' ? '✓' : '+'}</span> {k.word}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ats-preview-panel">
                      <div className="rag-header">
                        <h4><span>📄</span> AI Resume Bullet-Point Synthesizer</h4>
                        <span className="badge-pill" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>
                          STAR Method Formatter
                        </span>
                      </div>

                      <div className="ats-bullet-box">
                        <span className="bullet-label">SAMPLE RESUME PROJECT BULLET</span>
                        <p className="bullet-content">{bulletPointPreview}</p>
                      </div>

                      <div className="ats-enhancements-list">
                        <h5>AI Resume Enhancement Engine Actions:</h5>
                        <div className="enhancement-item">
                          <span>🚀</span>
                          <p><strong>Quantifiable Impact:</strong> Added 42% query latency reduction benchmark to stand out to hiring managers.</p>
                        </div>
                        <div className="enhancement-item">
                          <span>🎯</span>
                          <p><strong>Keyword Synergy:</strong> Added "Pinecone Vector DB" and "LangGraph Cyclic Agents" for 99.4% ATS match rate.</p>
                        </div>
                        <div className="enhancement-item">
                          <span>🛡️</span>
                          <p><strong>Format Validation:</strong> Verified against Taleo, Greenhouse, and Workday ATS parsers.</p>
                        </div>
                      </div>

                      <button
                        className="btn btn-outline btn-full btn-sm"
                        onClick={() => addToast('Copied optimized STAR bullet point to clipboard!', 'success')}
                        style={{ marginTop: '1rem' }}
                      >
                        📋 Copy Optimized Bullet Points for Your Resume
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pillar 3: RAG Interview Knowledge Retrieval Engine */}
              {engineTab === 'rag' && (
                <div className="ai-playground-card">
                  <div className="rag-grid">
                    <div className="rag-panel">
                      <div className="rag-header">
                        <h4><span>📁</span> Indexed IT Interview Question Base</h4>
                        <span className="badge-pill" style={{ margin: 0, padding: '0.2rem 0.6rem' }}>10k+ Questions</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        Search verified technical interview solutions vectorized with OpenAI text-embedding-3-small:
                      </p>

                      {[
                        'Google-System-Design-Playbook.pdf',
                        'Amazon-Leadership-Technical-Rubrics.pdf',
                        'Top-100-MERN-Concurrency-Patterns.md'
                      ].map((doc, i) => (
                        <div
                          key={i}
                          className="doc-chip"
                          style={{
                            cursor: 'pointer',
                            borderColor: ragDoc === doc ? 'var(--primary)' : 'rgba(99, 102, 241, 0.2)'
                          }}
                          onClick={() => setRagDoc(doc)}
                        >
                          <span>📄 {doc}</span>
                          <span className="doc-chip-badge">{ragDoc === doc ? 'Active Source' : 'Indexed'}</span>
                        </div>
                      ))}

                      <div style={{ marginTop: '1.25rem' }}>
                        <label className="form-label">Search IT Interview Concept</label>
                        <input
                          type="text"
                          className="form-control"
                          value={ragQuery}
                          onChange={(e) => setRagQuery(e.target.value)}
                          placeholder="e.g. Consistent hashing, Redis rate limiter, LangGraph cycles..."
                          style={{ marginBottom: '0.75rem' }}
                        />
                        <button
                          className="btn btn-primary btn-full"
                          onClick={handleRunRAG}
                          disabled={ragLoading}
                        >
                          {ragLoading ? 'Querying Vector Embeddings...' : 'Run RAG Semantic Retrieval 🔍'}
                        </button>
                      </div>
                    </div>

                    <div className="rag-panel">
                      <div className="rag-header">
                        <h4><span>⚡</span> Grounded Interview Solution</h4>
                        <span className="doc-chip-badge">{ragResult.score}</span>
                      </div>

                      <div className="chunk-card">
                        <div className="chunk-meta">
                          <span>VERIFIED VECTOR CHUNK FROM SOURCE</span>
                          <span>{ragResult.source}</span>
                        </div>
                        <div className="chunk-text">
                          {ragResult.retrievedChunk}
                        </div>
                      </div>

                      <div className="rag-result-box">
                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                          ✓ Grounded IT Technical Answer
                        </div>
                        <p style={{ fontSize: '0.92rem', color: '#f1f5f9', lineHeight: 1.6 }}>
                          {ragResult.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Pillar 4: 24/7 AI Career Mentor Agent */}
              {engineTab === 'agents' && (
                <div className="ai-playground-card">
                  <div className="chat-window">
                    <div className="chat-header">
                      <div className="agent-badge">
                        <div className="agent-avatar">AI</div>
                        <div>
                          <h5 style={{ fontSize: '0.95rem', margin: 0 }}>Bytecode Autonomous Career Mentor</h5>
                          <span style={{ fontSize: '0.75rem', color: '#10b981' }}>● Real-Time Placement Knowledge Agent</span>
                        </div>
                      </div>
                      <span className="badge-pill" style={{ margin: 0 }}>GPT-4o + Vector Engine</span>
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
                          Analyzing IT hiring benchmarks and generating guidance...
                        </div>
                      )}
                    </div>

                    {/* Quick Question Prompts */}
                    <div className="quick-prompts">
                      <button className="quick-chip" onClick={() => handleSendChat('How do I negotiate salary for a ₹25 LPA Full-Stack offer?')}>
                        💰 Salary Negotiation
                      </button>
                      <button className="quick-chip" onClick={() => handleSendChat('What are the top 3 questions Amazon asks in System Design?')}>
                        ☁️ Amazon System Design Tips
                      </button>
                      <button className="quick-chip" onClick={() => handleSendChat('Review my resume keywords for Senior AI Engineer')}>
                        📄 Review My ATS Keywords
                      </button>
                    </div>

                    <div className="chat-input-bar">
                      <input
                        type="text"
                        className="chat-input"
                        placeholder="Ask your AI Mentor about interview questions, tech stacks, or salaries..."
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

              {/* Pillar 5: Prompt Engineering Studio */}
              {engineTab === 'prompts' && (
                <div className="ai-playground-card">
                  <div className="model-selector">
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '0.5rem' }}>Foundation Model:</span>
                    {['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Llama 3 70B'].map((m) => (
                      <button
                        key={m}
                        className={`model-chip ${selectedModel === m ? 'selected' : ''}`}
                        onClick={() => setSelectedModel(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="prompt-grid">
                    <div>
                      <div className="form-group">
                        <label className="form-label">Task Preset</label>
                        <select
                          className="form-control"
                          value={promptTask}
                          onChange={(e) => setPromptTask(e.target.value)}
                        >
                          <option value="Interview Code Evaluation">Interview Code Evaluation (Technical Rubric)</option>
                          <option value="System Design Question Synthesis">System Design Architecture Generator</option>
                          <option value="STAR Behavioral Answer Refiner">STAR Behavioral Answer Refiner</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Engineer Prompt</label>
                        <textarea
                          className="prompt-textarea"
                          style={{ height: '120px' }}
                          value={userPrompt}
                          onChange={(e) => setUserPrompt(e.target.value)}
                        />
                      </div>

                      <button
                        className="btn btn-primary btn-full"
                        onClick={() => {
                          addToast('Running prompt evaluation on IT interview benchmark...', 'info');
                          setTimeout(() => {
                            setPromptOutput(`✨ Auto-Synthesized (${selectedModel} | Eval: 98.6% Accuracy):\n\nChallenge: Distributed Sliding-Window Rate Limiter\n• Input: 50,000 req/sec across 10 regions\n• Key Architecture: Redis Sorted Set (ZSET) inside atomic Lua script with exponential backoff\n• Evaluation Points: Atomicity (40%), Race condition prevention (30%), Zero-downtime rolling deploys (30%).`);
                            addToast('Generated production coding challenge with evaluation rubric!', 'success');
                          }, 500);
                        }}
                      >
                        ✨ Execute & Evaluate Technical Prompt
                      </button>
                    </div>

                    <div>
                      <label className="form-label">Engine Output & Rubric</label>
                      <div className="prompt-output-box">
                        {promptOutput}
                      </div>
                      <div className="prompt-output-footer">
                        <span>Tokens: 210 / 4,096</span>
                        <span>Latency: 240ms</span>
                        <span>Evaluation: 98.6%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =========================================================================
               Live IT Job Openings Feed (Direct Value for Active Job Seekers)
               ========================================================================= */}
          <section className="section" id="job-openings" style={{ background: 'rgba(10, 15, 29, 0.6)' }}>
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Live Hiring Pipeline</span>
                <h2>Active IT Job Openings <span className="gradient-text">(Direct Referrals)</span></h2>
                <p>Exclusive openings from our 850+ IT hiring partners. Click "Prepare with AI" to load targeted mock interviews for any opening.</p>
              </div>

              <div className="job-openings-grid">
                {LIVE_JOB_OPENINGS.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-card-top">
                      <div className="job-company-badge">
                        <span className="job-logo">{job.logo}</span>
                        <div>
                          <h4>{job.company}</h4>
                          <span className="job-loc">{job.location}</span>
                        </div>
                      </div>
                      <span className="job-badge-pill">{job.badge}</span>
                    </div>

                    <h3 className="job-role-title">{job.role}</h3>

                    <div className="job-details-row">
                      <div className="job-stat">
                        <span className="job-stat-label">Experience</span>
                        <span className="job-stat-val">{job.experience}</span>
                      </div>
                      <div className="job-stat">
                        <span className="job-stat-label">Package (CTC)</span>
                        <span className="job-stat-val text-emerald">{job.salary}</span>
                      </div>
                    </div>

                    <div className="job-skills-list">
                      {job.skills.map((s, idx) => (
                        <span key={idx} className="job-skill-chip">{s}</span>
                      ))}
                    </div>

                    <div className="job-card-footer">
                      <button
                        className="btn btn-primary btn-full btn-sm"
                        onClick={() => handlePrepForJob(job)}
                      >
                        🎯 Practice AI Mock Interview for This Role
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
               Curated IT Job-Ready Placement Tracks
               ========================================================================= */}
          <section className="section" id="tracks">
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">Job Placement Tracks</span>
                <h2>Accelerate Your Career with <span className="gradient-text">Job-Ready Tracks</span></h2>
                <p>Curated curriculums designed directly with tech hiring managers. Go from preparation to offer letter.</p>
              </div>

              <div className="courses-grid">
                {JOB_TRACKS.map((track) => (
                  <div key={track._id} className="course-card">
                    <div className="course-top">
                      <span className="course-tag">{track.tag}</span>
                      <span className="course-model-tag">{track.modelTag}</span>
                    </div>

                    <h3>{track.title}</h3>
                    <p>{track.description}</p>

                    <div className="track-salary-badge">
                      <span>Target Package: <strong>{track.salaryRange}</strong></span>
                      <span className="track-openings">{track.openingsCount}</span>
                    </div>

                    <ul className="course-features">
                      {track.highlights.map((h, idx) => (
                        <li key={idx}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="course-footer">
                      <div className="course-fee">
                        <span className="fee-label">Placement Assurance</span>
                        <span className="fee-val">100% Mentorship</span>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setConsultModalOpen(true)}
                      >
                        Enroll in Track ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
               Comparison: Traditional Training Institute vs Bytecode AI LMS
               ========================================================================= */}
          <section className="section" id="comparison" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
            <div className="container">
              <div className="section-head">
                <span className="badge-pill">The Bytecode AI Advantage</span>
                <h2>Traditional Institute vs <span className="gradient-text">Bytecode AI LMS</span></h2>
                <p>See why traditional institutes leave candidates unplaced while Bytecode AI gets engineers hired.</p>
              </div>

              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Feature / Capability</th>
                      <th className="bytecode-col">Bytecode AI LMS (Job Seeker Platform)</th>
                      <th className="traditional-col">Old Training Institutes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Mock Interview Practice</strong></td>
                      <td className="bytecode-col">✓ 24/7 Unlimited AI Mock Interviews with Instant Rubric Feedback</td>
                      <td className="traditional-col">✗ 1-2 generic faculty interviews at course end</td>
                    </tr>
                    <tr>
                      <td><strong>ATS Resume Scoring</strong></td>
                      <td className="bytecode-col">✓ Automated ATS Scanner calibrated to 150+ IT hiring rubrics</td>
                      <td className="traditional-col">✗ Outdated Word document template from 2018</td>
                    </tr>
                    <tr>
                      <td><strong>Technical Doubts & Learning</strong></td>
                      <td className="bytecode-col">✓ Instant Grounded RAG Knowledge Engine & 24/7 AI Mentor</td>
                      <td className="traditional-col">✗ Wait 24-48 hours for TA assistance</td>
                    </tr>
                    <tr>
                      <td><strong>Curriculum Relevance</strong></td>
                      <td className="bytecode-col">✓ Enterprise RAG, LangGraph Multi-Agents, React 19 & System Design</td>
                      <td className="traditional-col">✗ Generic basics (HTML, CSS, simple CRUD apps)</td>
                    </tr>
                    <tr>
                      <td><strong>Job Placement Direct Connect</strong></td>
                      <td className="bytecode-col">✓ 850+ IT Hiring Partners with direct candidate shortlisting</td>
                      <td className="traditional-col">✗ Sending resumes to random public email IDs</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* =========================================================================
               Call to Action Banner
               ========================================================================= */}
          <section className="container" style={{ margin: '4rem auto' }}>
            <div className="cta-banner">
              <h2>Ready to Land Your Dream IT Job?</h2>
              <p>Join 15,000+ engineers who prepared with Bytecode AI LMS and unlocked offers at top tech firms.</p>
              <div className="cta-buttons-row">
                <button className="btn btn-primary btn-lg" onClick={() => setConsultModalOpen(true)}>
                  Schedule 1:1 IT Placement Strategy ➔
                </button>
                <a href="#playground" className="btn btn-outline btn-lg">
                  Try AI Mock Interview Now
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M12 2v4M12 18v4"></path>
                      </svg>
                    </div>
                    <span className="logo-text">Bytecode<span className="logo-accent">.AI</span> LMS</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    The Autonomous AI-Powered Learning Management System engineered to help active job seekers master modern technologies, crack technical interviews, and launch successful IT careers.
                  </p>
                  <div className="footer-social-row">
                    <span className="social-icon">🐙 GitHub</span>
                    <span className="social-icon">💼 LinkedIn</span>
                    <span className="social-icon">💬 Discord</span>
                  </div>
                </div>

                <div className="footer-col">
                  <h4>IT Placement Engines</h4>
                  <ul className="footer-links">
                    <li><a href="#playground" onClick={() => setEngineTab('interview')}>AI Mock Technical Interview</a></li>
                    <li><a href="#playground" onClick={() => setEngineTab('ats')}>ATS Resume Reviewer & Matcher</a></li>
                    <li><a href="#playground" onClick={() => setEngineTab('rag')}>RAG Interview Knowledge Retrieval</a></li>
                    <li><a href="#playground" onClick={() => setEngineTab('agents')}>24/7 Autonomous Career Mentor</a></li>
                    <li><a href="#playground" onClick={() => setEngineTab('prompts')}>Prompt Engineering Studio</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Job Placement Tracks</h4>
                  <ul className="footer-links">
                    <li><a href="#tracks">Full-Stack AI Developer (MERN)</a></li>
                    <li><a href="#tracks">Enterprise RAG & Vector Architect</a></li>
                    <li><a href="#tracks">Autonomous Multi-Agent Engineer</a></li>
                    <li><a href="#tracks">Cloud Microservices & DevOps</a></li>
                    <li><a href="#job-openings">Active IT Hiring Radar</a></li>
                  </ul>
                </div>

                <div className="footer-col">
                  <h4>Candidate Support</h4>
                  <ul className="footer-links">
                    <li><span style={{ color: '#cbd5e1' }}>Direct Line: +91 98765 43210</span></li>
                    <li><span style={{ color: '#cbd5e1' }}>Admissions: careers@bytecode.ai</span></li>
                    <li><span style={{ color: '#cbd5e1' }}>Hiring Partners: partners@bytecode.ai</span></li>
                    <li><span style={{ color: '#10b981' }}>● Placements Active (2026 Batch)</span></li>
                  </ul>
                </div>
              </div>

              <div className="footer-bottom">
                <p>© 2026 Bytecode.AI LMS. All rights reserved. Transforming IT Job Preparation with Autonomous AI.</p>
                <div className="footer-badges">
                  <span>● Mobile-First Design</span>
                  <span>● Vercel Dual-Service Architecture</span>
                  <span>● SOC-2 Security</span>
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}

      {/* =========================================================================
           Sticky Bottom Navigation Bar (Strictly for Mobile Screens < 768px)
           ========================================================================= */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Navigation Quick Bar">
        <button
          className={`mobile-bottom-item ${engineTab === 'interview' && activeTab === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('home');
            setEngineTab('interview');
            const el = document.getElementById('playground');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="bottom-icon">🎙️</span>
          <span className="bottom-label">Mock Drill</span>
        </button>

        <button
          className={`mobile-bottom-item ${engineTab === 'ats' && activeTab === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('home');
            setEngineTab('ats');
            const el = document.getElementById('playground');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="bottom-icon">📄</span>
          <span className="bottom-label">ATS Resume</span>
        </button>

        <button
          className={`mobile-bottom-item ${engineTab === 'agents' && activeTab === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('home');
            setEngineTab('agents');
            const el = document.getElementById('playground');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="bottom-icon">🤖</span>
          <span className="bottom-label">AI Mentor</span>
        </button>

        <button
          className="mobile-bottom-item"
          onClick={() => {
            setActiveTab('home');
            const el = document.getElementById('job-openings');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="bottom-icon">💼</span>
          <span className="bottom-label">IT Jobs</span>
        </button>

        <button
          className={`mobile-bottom-item ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab(activeTab === 'login' ? 'home' : 'login')}
        >
          <span className="bottom-icon">👤</span>
          <span className="bottom-label">{user ? 'Account' : 'Sign In'}</span>
        </button>
      </nav>

      {/* =========================================================================
           Modal: 1:1 IT Career Strategy Consultation
           ========================================================================= */}
      {consultModalOpen && (
        <div className="modal-overlay" onClick={() => setConsultModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="badge-pill" style={{ margin: 0, padding: '0.25rem 0.75rem' }}>
                <span className="pulse-dot"></span>
                <span>Free Career Roadmapping</span>
              </div>
              <button className="modal-close" onClick={() => setConsultModalOpen(false)}>✕</button>
            </div>

            <h3 style={{ fontSize: '1.4rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
              Schedule Your <span className="gradient-text">1:1 IT Placement Session</span>
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Connect with an IT career mentor to review your resume, target job openings, and map your 90-day preparation strategy.
            </p>

            <form onSubmit={handleConsultSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  required
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={consultForm.email}
                  onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                  required
                  placeholder="you@email.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  required
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target IT Career Track</label>
                <select
                  className="form-control"
                  value={consultForm.targetRole}
                  onChange={(e) => setConsultForm({ ...consultForm, targetRole: e.target.value })}
                >
                  <option value="Full-Stack AI Developer">Full-Stack AI & MERN Developer</option>
                  <option value="Enterprise RAG Architect">Enterprise RAG & Vector Architect</option>
                  <option value="Autonomous Agent Engineer">Autonomous AI Agent Engineer</option>
                  <option value="Cloud Microservices Engineer">Cloud & DevOps Engineer</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1rem' }}>
                Confirm 1:1 Placement Session ➔
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
           Toast Notification System
           ========================================================================= */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-bubble ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
