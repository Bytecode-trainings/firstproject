import Course from '../models/Course.js';

export const defaultCourses = [
  {
    title: 'Enterprise RAG & Hybrid Vector Search',
    category: 'rag',
    tag: 'RAG Engine',
    modelTag: 'Pinecone • LangChain',
    rating: 4.96,
    reviewsCount: 2450,
    description: 'Build production-ready Retrieval-Augmented Generation systems with multi-document chunking, hybrid BM25 + dense vector embeddings, and re-ranking.',
    duration: '16 Weeks',
    fee: 29999,
    highlights: [
      'Multi-Modal Document Parsing & Chunking',
      'Vector DBs: Pinecone, Qdrant & ChromaDB',
      'Advanced RAG: Contextual Compression & Cohere Re-rank'
    ]
  },
  {
    title: 'Autonomous AI Agents & Multi-Agent Systems',
    category: 'agents',
    tag: 'AI Agents',
    modelTag: 'LangGraph • CrewAI',
    rating: 4.98,
    reviewsCount: 3100,
    description: 'Architect self-directed autonomous agent workflows, tool calling, memory persistence, human-in-the-loop validation, and multi-agent coordination.',
    duration: '18 Weeks',
    fee: 34999,
    highlights: [
      'ReAct Pattern & Planning Algorithms',
      'CrewAI & LangGraph Multi-Agent Teams',
      'Autonomous Code Execution & Web Browsing Agents'
    ]
  },
  {
    title: 'Prompt Engineering & LLM Evaluation Bench',
    category: 'prompts',
    tag: 'Prompt Studio',
    modelTag: 'GPT-4o • Claude 3.5',
    rating: 4.92,
    reviewsCount: 1850,
    description: 'Master advanced prompt architecture: Few-shot, Chain-of-Thought, ReAct, System Steering, Jailbreak Defense, and Ragas/TruLens automated evaluation.',
    duration: '10 Weeks',
    fee: 19999,
    highlights: [
      'Zero-Shot to Few-Shot Dynamic Prompting',
      'LLM-as-a-Judge & Automated Evaluation',
      'Guardrails, Toxicity Filtering & Output Validation'
    ]
  },
  {
    title: 'AI Interview Engine & Resume Career Accelerator',
    category: 'interview',
    tag: 'Career AI',
    modelTag: 'ATS Scorer • Voice AI',
    rating: 4.95,
    reviewsCount: 2900,
    description: 'Leverage LLMs for automated resume ATS scoring, technical gap discovery, and realistic voice-enabled AI mock interviews with instant behavioral analytics.',
    duration: '12 Weeks',
    fee: 24999,
    highlights: [
      'Real-time ATS Resume Parser & Keyword Matcher',
      'Interactive AI Mock Technical Interviews',
      'Instant Diagnostic Feedback & Placement Assistance'
    ]
  },
  {
    title: 'Full Stack AI Engineering (Next.js & Vercel AI SDK)',
    category: 'rag',
    tag: 'Full Stack AI',
    modelTag: 'Vercel AI • Next.js 15',
    rating: 4.94,
    reviewsCount: 1640,
    description: 'Design streaming AI user experiences, tool invocations, server actions, generative UI, and resilient backend pipelines for enterprise SaaS apps.',
    duration: '14 Weeks',
    fee: 27999,
    highlights: [
      'Vercel AI SDK Core & Generative UI Components',
      'Streaming Responses & Function Calling',
      'Full Stack TypeScript & Vector Database Integration'
    ]
  },
  {
    title: 'Open Source LLM Fine-Tuning & Local Deployment',
    category: 'agents',
    tag: 'Model Ops',
    modelTag: 'Llama 3 • vLLM • LoRA',
    rating: 4.89,
    reviewsCount: 1320,
    description: 'Fine-tune open-weight models using LoRA and QLoRA on domain datasets. Quantize and deploy blazing-fast inference endpoints using vLLM and Ollama.',
    duration: '16 Weeks',
    fee: 32999,
    highlights: [
      'Dataset Synthesis & LoRA/QLoRA Parameter Tuning',
      'vLLM High-Throughput Serving & Triton Inference',
      'Private Model Deployment on AWS GPU Clusters'
    ]
  }
];

export const getCourses = async (req, res) => {
  try {
    const { category } = req.query;

    try {
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      const courses = await Course.find(query);
      if (courses && courses.length > 0) {
        return res.json({ success: true, count: courses.length, courses });
      }
    } catch (err) {
      console.warn('MongoDB Course query fallback:', err.message);
    }

    // Fallback to static mock courses
    let filtered = defaultCourses;
    if (category && category !== 'all') {
      filtered = defaultCourses.filter(c => c.category === category);
    }
    res.json({ success: true, count: filtered.length, courses: filtered });
  } catch (error) {
    console.error('Course Fetch Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch courses.' });
  }
};
