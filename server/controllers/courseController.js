import Course from '../models/Course.js';

export const defaultCourses = [
  {
    title: 'Full Stack Web Development (MERN / Python)',
    category: 'web',
    tag: 'Full Stack',
    description: 'Master React, Node.js, Express, MongoDB, Next.js, and TypeScript with 5 enterprise-grade portfolio projects.',
    duration: '16 Weeks (Live + Lab)',
    fee: 24999,
    rating: 4.9,
    reviewsCount: 1800,
    highlights: ['Duration: 16 Weeks (Live + Lab)', '1:1 Code Reviews & GitHub Portfolio', 'Guaranteed Placement Drive Access']
  },
  {
    title: 'Generative AI & Data Science Masterclass',
    category: 'ai',
    tag: 'Trending',
    description: 'From Python, Pandas & Scikit-Learn to Deep Learning, LLMs, LangChain, Vector DBs, and Agentic AI workflows.',
    duration: '18 Weeks (Live Interactive)',
    fee: 29999,
    rating: 4.95,
    reviewsCount: 2300,
    highlights: ['Duration: 18 Weeks (Live Interactive)', 'Build & Deploy Production LLM Apps', 'Kaggle & Open Source Contributions']
  },
  {
    title: 'Cloud Engineering & DevOps with AWS & K8s',
    category: 'cloud',
    tag: 'High Demand',
    description: 'Master Linux, Docker, Kubernetes, Terraform, CI/CD pipelines, AWS Architecture, and Production Monitoring.',
    duration: '14 Weeks (Hands-on Labs)',
    fee: 27999,
    rating: 4.88,
    reviewsCount: 1200,
    highlights: ['Duration: 14 Weeks (Hands-on Labs)', 'Real AWS Cloud Sandbox Access', 'AWS Certified Solutions Architect Prep']
  },
  {
    title: 'Enterprise Java Full Stack (Spring Boot & Microservices)',
    category: 'web',
    tag: 'Java Track',
    description: 'Core Java, Spring Boot 3, Microservices Architecture, Hibernate, Docker, and Angular/React UI integration.',
    duration: '16 Weeks',
    fee: 22999,
    rating: 4.85,
    reviewsCount: 950,
    highlights: ['Duration: 16 Weeks', 'Enterprise Microservices Project', 'System Design & DSA Module']
  },
  {
    title: 'Python & Data Analytics with PowerBI',
    category: 'ai',
    tag: 'Fast Track',
    description: 'Learn Data Cleaning, Exploratory Analysis, SQL, Advanced Excel, Power BI Dashboards, and Predictive Modeling.',
    duration: '12 Weeks',
    fee: 18999,
    rating: 4.91,
    reviewsCount: 1400,
    highlights: ['Duration: 12 Weeks', 'Real Business Case Studies', 'Interactive Dashboard Portfolio']
  },
  {
    title: 'Cyber Security & Ethical Hacking',
    category: 'cloud',
    tag: 'Security',
    description: 'Network security, penetration testing, Kali Linux, Web Application Security (OWASP Top 10), and SOC Analyst essentials.',
    duration: '14 Weeks',
    fee: 26999,
    rating: 4.87,
    reviewsCount: 820,
    highlights: ['Duration: 14 Weeks', 'Live CTF Challenges & Virtual Labs', 'CEH & CompTIA Security+ Aligned']
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
