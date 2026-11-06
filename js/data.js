// Job Wallah - Rich Mock Database of Internships & Jobs with Real Brand Logos & Visuals

const CompanyLogos = {
  Razorpay: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%230C2340"/><path d="M22 58L34 22H46C54 22 58 26 58 32C58 38 53 42 46 43L56 58H44L35 44H32L29 58H22ZM34 36H42C45 36 47 34.5 47 32C47 29.5 45 28 42 28H36L34 36Z" fill="%23008BDC"/><polygon points="44,22 32,50 42,50 36,64 54,34 44,34" fill="%2302D5A4"/></svg>`,
  Swiggy: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%23FC8019"/><path d="M40 18C30 18 24 24 24 33C24 43 32 47 38 50C44 53 46 56 46 60C46 64 42 66 38 66C31 66 28 62 27 57H19C20 67 28 73 38 73C48 73 55 67 55 58C55 49 48 45 42 42C36 39 33 36 33 32C33 28 36 25 40 25C45 25 48 28 49 32H57C56 23 49 18 40 18Z" fill="%23FFFFFF"/></svg>`,
  CRED: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%23121212"/><rect x="22" y="22" width="36" height="36" rx="8" fill="none" stroke="%23FFFFFF" stroke-width="4"/><path d="M30 33H50M30 40H44M30 47H48" stroke="%23FFFFFF" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="47" r="2.5" fill="%23008BDC"/></svg>`,
  Zomato: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%23E23744"/><text x="40" y="49" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-weight="900" font-style="italic" font-size="19" fill="%23FFFFFF" text-anchor="middle" letter-spacing="-0.8">zomato</text></svg>`,
  PhonePe: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%235F259F"/><circle cx="40" cy="40" r="24" fill="%23FFFFFF"/><path d="M36 27H44V35C48 35 50 37 50 41C50 45 48 48 44 48H36V55H31V27H36ZM36 43H43C45 43 46 42 46 40C46 38 45 37 43 37H36V43Z" fill="%235F259F"/></svg>`,
  boAt: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%230F172A"/><path d="M40 22L24 54H38L42 36L46 54H56L40 22Z" fill="%23E11D48"/><circle cx="40" cy="48" r="3.5" fill="%23FFFFFF"/></svg>`,
  Meesho: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%23F43397"/><path d="M24 56V24L34 44L44 24V56H38V36L34 46L30 36V56H24ZM48 24H56V56H48V24Z" fill="%23FFFFFF"/></svg>`,
  Infosys: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%23007CC3"/><text x="40" y="47" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-weight="800" font-size="15" fill="%23FFFFFF" text-anchor="middle" letter-spacing="-0.5">Infosys</text></svg>`,
  TCS: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%231B365D"/><text x="40" y="44" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-weight="900" font-size="20" fill="%23FFFFFF" text-anchor="middle" letter-spacing="1">TCS</text><text x="40" y="58" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-weight="700" font-size="8" fill="%2393C5FD" text-anchor="middle" letter-spacing="1.5">TATA</text></svg>`,
  UrbanCompany: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%231A1A1A"/><text x="40" y="48" font-family="-apple-system,BlinkMacSystemFont,sans-serif" font-weight="900" font-size="22" fill="%23FFFFFF" text-anchor="middle" letter-spacing="1">UC</text><circle cx="56" cy="33" r="3" fill="%23E11D48"/></svg>`,
  Unacademy: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%2308BD80"/><path d="M26 34C26 27 32 22 40 22C48 22 54 27 54 34V46C54 53 48 58 40 58C32 58 26 53 26 46V34ZM34 34V46C34 49 37 51 40 51C43 51 46 49 46 46V34C46 31 43 29 40 29C37 29 34 31 34 34Z" fill="%23FFFFFF"/></svg>`,
  Internshala: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%23008BDC"/><path d="M40 22L18 34L40 46L62 34L40 22ZM26 42V52C26 56 32 60 40 60C48 60 54 56 54 52V42L40 50L26 42Z" fill="%23FFFFFF"/></svg>`
};

const initialJobs = [
  {
    id: "jw-101",
    title: "Full Stack Web Developer Intern",
    company: "Razorpay",
    companyLogo: CompanyLogos.Razorpay,
    companyColor: "#0C2340",
    roleBanner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
    location: "Work From Home",
    type: "Internship",
    category: "Web Development",
    stipendNumber: 35000,
    stipend: "₹30,000 - ₹35,000 /month",
    duration: "6 Months",
    startDate: "Immediately",
    applyBy: "18 Nov '26",
    postedDaysAgo: "Few hours ago",
    isActivelyHiring: true,
    isPPO: true,
    applicantsCount: 412,
    skills: ["React.js", "Node.js", "TypeScript", "Tailwind CSS"],
    description: "Razorpay is seeking ambitious Full Stack Web Developer interns for our Payments Gateway team. Build modern merchant interfaces and real-time APIs.",
    responsibilities: [
      "Develop responsive and modern frontend interfaces using React and Next.js.",
      "Architect and maintain REST & GraphQL endpoints with Node.js/Express.",
      "Collaborate with UX designers and product managers to iterate on payment flows.",
      "Write unit tests and optimize application bundle for sub-second load times."
    ],
    eligibility: [
      "Available for full-time (in-office / remote) internship.",
      "Can start immediately and available for a minimum of 6 months.",
      "Hands-on skills in modern JavaScript (ES6+), React, and Node.js."
    ],
    perks: ["Certificate", "Letter of Recommendation", "Job Offer (PPO) upon completion", "Flexible work hours", "₹1,500/month WFH allowance"]
  },
  {
    id: "jw-102",
    title: "Data Science & AI Analyst",
    company: "Swiggy",
    companyLogo: CompanyLogos.Swiggy,
    companyColor: "#FC8019",
    roleBanner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
    location: "Bengaluru",
    type: "Job",
    category: "Data Science",
    stipendNumber: 85000,
    stipend: "₹8.5 - ₹12 LPA",
    duration: "Full-Time",
    startDate: "Immediately",
    applyBy: "25 Nov '26",
    postedDaysAgo: "1 day ago",
    isActivelyHiring: true,
    isPPO: false,
    applicantsCount: 890,
    skills: ["Python", "SQL", "Machine Learning", "Tableau"],
    description: "Swiggy's Core Intelligence team is looking for a Fresher Data Science Analyst for delivery route optimization and demand prediction algorithms.",
    responsibilities: [
      "Analyze massive customer order datasets to uncover behavioral trends.",
      "Train, validate, and deploy predictive ML models in Python.",
      "Build real-time KPI dashboards for operations and marketing leaders in Tableau."
    ],
    eligibility: [
      "Degree in CS, Statistics, Mathematics, or related field.",
      "Proficiency in Python data stack (NumPy, Pandas, Scikit-learn).",
      "Solid knowledge of relational databases and complex SQL queries."
    ],
    perks: ["Health Insurance", "Annual Bonus & ESOPs", "Free Meals at Office", "Hybrid Work Policy"]
  },
  {
    id: "jw-103",
    title: "UI/UX & Product Design Intern",
    company: "CRED",
    companyLogo: CompanyLogos.CRED,
    companyColor: "#111111",
    roleBanner: "https://images.unsplash.com/photo-1581291518655-9523c932694b?w=400&auto=format&fit=crop&q=80",
    location: "Bengaluru",
    type: "Internship",
    category: "Design",
    stipendNumber: 40000,
    stipend: "₹40,000 /month",
    duration: "3 - 6 Months",
    startDate: "Immediately",
    applyBy: "16 Nov '26",
    postedDaysAgo: "Just now",
    isActivelyHiring: true,
    isPPO: true,
    applicantsCount: 320,
    skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
    description: "Join CRED's design team to craft sleek financial mobile experiences, micro-interactions, and 3D visual elements for creditworthy members.",
    responsibilities: [
      "Create high-fidelity wireframes, UI mockups, and interactive prototypes in Figma.",
      "Contribute to CRED's design system tokens and component library.",
      "Collaborate with Android & iOS developers to ensure pixel-perfect delivery."
    ],
    eligibility: [
      "Design portfolio showcasing clean UI/UX case studies and visual flair.",
      "Attention to detail, typography, color theory, and layout hierarchy."
    ],
    perks: ["Certificate", "Letter of Recommendation", "High PPO conversion rate", "Gourmet food & espresso bar"]
  },
  {
    id: "jw-104",
    title: "Digital Marketing & Growth Intern",
    company: "Zomato",
    companyLogo: CompanyLogos.Zomato,
    companyColor: "#E23744",
    roleBanner: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80",
    location: "Delhi NCR / Gurugram",
    type: "Internship",
    category: "Digital Marketing",
    stipendNumber: 22000,
    stipend: "₹20,000 - ₹25,000 /month",
    duration: "3 Months",
    startDate: "Immediately",
    applyBy: "20 Nov '26",
    postedDaysAgo: "2 days ago",
    isActivelyHiring: true,
    isPPO: false,
    applicantsCount: 650,
    skills: ["SEO", "Meta Ads", "Google Analytics", "Content Strategy"],
    description: "Zomato is on the hunt for a creative, meme-savvy, data-backed Digital Marketing Intern to design campaigns for dining out and quick delivery.",
    responsibilities: [
      "Assist in executing multi-channel social media campaigns and push notifications.",
      "Analyze campaign ROAS, conversion metrics, and audience engagement rates.",
      "Draft catchy copy for ad creatives, emailers, and promotional banners."
    ],
    eligibility: [
      "Strong written communication and creative storytelling ability.",
      "Familiarity with Google Analytics, Meta Ads Manager, or Canva."
    ],
    perks: ["Certificate", "Letter of Recommendation", "Zomato Gold membership", "Flexible hours"]
  },
  {
    id: "jw-105",
    title: "Junior Software Engineer (Backend)",
    company: "PhonePe",
    companyLogo: CompanyLogos.PhonePe,
    companyColor: "#5F259F",
    roleBanner: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80",
    location: "Bengaluru",
    type: "Job",
    category: "Web Development",
    stipendNumber: 95000,
    stipend: "₹10 - ₹15 LPA",
    duration: "Full-Time",
    startDate: "Immediately",
    applyBy: "30 Nov '26",
    postedDaysAgo: "3 days ago",
    isActivelyHiring: true,
    isPPO: false,
    applicantsCount: 1140,
    skills: ["Java", "Spring Boot", "Kafka", "PostgreSQL"],
    description: "PhonePe processes over 100 million UPI transactions daily. Build resilient, distributed microservices with low latency and high fault tolerance.",
    responsibilities: [
      "Design and maintain microservices handling millions of concurrent requests.",
      "Optimize database queries, indexing, and Redis caching layers.",
      "Participate in code reviews and architectural discussions."
    ],
    eligibility: [
      "B.Tech / B.E in CS / IT / ECE (Batch 2024, 2025 or 2026).",
      "Strong grasp of Data Structures, Algorithms, and Object-Oriented design."
    ],
    perks: ["Health & Life Insurance", "Relocation Allowance", "Annual Bonus", "Learning Budget"]
  },
  {
    id: "jw-106",
    title: "Content Writing & Editorial Intern",
    company: "Internshala Media",
    companyLogo: CompanyLogos.Internshala,
    companyColor: "#008BDC",
    roleBanner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80",
    location: "Work From Home",
    type: "Internship",
    category: "Content Writing",
    stipendNumber: 18000,
    stipend: "₹15,000 - ₹18,000 /month",
    duration: "3 Months",
    startDate: "Immediately",
    applyBy: "22 Nov '26",
    postedDaysAgo: "4 hours ago",
    isActivelyHiring: true,
    isPPO: true,
    applicantsCount: 280,
    skills: ["Creative Writing", "SEO Content", "Proofreading", "Research"],
    description: "Write inspiring career guides, educational blog articles, and student success stories read by over 5 million Indian students.",
    responsibilities: [
      "Research and author in-depth blog posts on internship tips and resume templates.",
      "Incorporate on-page SEO best practices and keyword density standards.",
      "Edit student newsletter issues and email campaigns."
    ],
    eligibility: [
      "Impeccable English grammar and conversational writing style.",
      "Available for full-time work-from-home for 3 continuous months."
    ],
    perks: ["Certificate", "Letter of Recommendation", "PPO opportunity", "Flexible hours"]
  },
  {
    id: "jw-107",
    title: "Associate Product Manager (APM)",
    company: "Meesho",
    companyLogo: CompanyLogos.Meesho,
    companyColor: "#F43397",
    roleBanner: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&auto=format&fit=crop&q=80",
    location: "Bengaluru",
    type: "Job",
    category: "Product Management",
    stipendNumber: 120000,
    stipend: "₹14 - ₹18 LPA",
    duration: "Full-Time",
    startDate: "Immediately",
    applyBy: "28 Nov '26",
    postedDaysAgo: "1 day ago",
    isActivelyHiring: true,
    isPPO: false,
    applicantsCount: 1540,
    skills: ["Product Strategy", "User Stories", "A/B Testing", "SQL"],
    description: "Join Meesho's mission to democratize e-commerce for Bharat. Own product roadmap initiatives from ideation to post-launch evaluation.",
    responsibilities: [
      "Define PRDs (Product Requirement Documents) with clear acceptance criteria.",
      "Run quantitative A/B experiments to lift seller engagement and conversion.",
      "Sync daily with engineering, design, and business teams for sprint releases."
    ],
    eligibility: [
      "Any Graduate with strong analytical and problem-solving aptitude.",
      "Demonstrated interest in tech products and consumer apps."
    ],
    perks: ["Competitive Base + Stocks", "Medical Cover", "Wellness Reimbursement", "Unlimited Leaves"]
  },
  {
    id: "jw-108",
    title: "Graphic Design & Social Media Intern",
    company: "boAt Lifestyle",
    companyLogo: CompanyLogos.boAt,
    companyColor: "#D11A2A",
    roleBanner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    location: "Mumbai",
    type: "Internship",
    category: "Design",
    stipendNumber: 25000,
    stipend: "₹20,000 - ₹25,000 /month",
    duration: "4 Months",
    startDate: "Immediately",
    applyBy: "19 Nov '26",
    postedDaysAgo: "5 hours ago",
    isActivelyHiring: true,
    isPPO: true,
    applicantsCount: 410,
    skills: ["Photoshop", "Illustrator", "After Effects", "Branding"],
    description: "Design vibrant visuals, product launch posters, influencer collabs, and Instagram reels for India's #1 audio & wearable brand boAt.",
    responsibilities: [
      "Design static and motion graphics for social channels and website banners.",
      "Create high-energy short video edits and promotional stickers.",
      "Work with the marketing team on festive discount campaigns."
    ],
    eligibility: [
      "Proficiency in Adobe Creative Cloud (Photoshop, Illustrator, Premiere).",
      "Creative eye for youth aesthetics and bold color palettes."
    ],
    perks: ["Certificate", "Free boAt Headphones & Smartwatch", "Letter of Recommendation"]
  },
  {
    id: "jw-109",
    title: "HR & Talent Acquisition Intern",
    company: "Infosys",
    companyLogo: CompanyLogos.Infosys,
    companyColor: "#007CC3",
    roleBanner: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80",
    location: "Pune",
    type: "Internship",
    category: "Human Resources",
    stipendNumber: 18000,
    stipend: "₹18,000 /month",
    duration: "6 Months",
    startDate: "Immediately",
    applyBy: "24 Nov '26",
    postedDaysAgo: "2 days ago",
    isActivelyHiring: false,
    isPPO: true,
    applicantsCount: 390,
    skills: ["Recruitment", "Resume Screening", "HR Operations", "MS Excel"],
    description: "Learn enterprise IT recruitment at scale. Screen resumes, coordinate virtual interview drives, and support campus hiring programs.",
    responsibilities: [
      "Source candidate profiles across LinkedIn, Job Wallah, and campus drives.",
      "Conduct preliminary screening calls to evaluate candidate readiness.",
      "Coordinate interview schedules with technical panel leads."
    ],
    eligibility: [
      "Pursuing or completed MBA / BBA / B.Com with specialization in HR.",
      "Strong verbal and email communication skills in English and Hindi."
    ],
    perks: ["Certificate from Infosys", "Letter of Recommendation", "Corporate exposure", "PPO opportunity"]
  },
  {
    id: "jw-110",
    title: "Cyber Security Analyst Trainee",
    company: "TCS",
    companyLogo: CompanyLogos.TCS,
    companyColor: "#1B365D",
    roleBanner: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=400&auto=format&fit=crop&q=80",
    location: "Hyderabad",
    type: "Job",
    category: "Cybersecurity",
    stipendNumber: 55000,
    stipend: "₹5.5 - ₹7.5 LPA",
    duration: "Full-Time",
    startDate: "Immediately",
    applyBy: "29 Nov '26",
    postedDaysAgo: "3 days ago",
    isActivelyHiring: true,
    isPPO: false,
    applicantsCount: 780,
    skills: ["Network Security", "VAPT", "SIEM", "Linux"],
    description: "Monitor, prevent, and respond to cyber security threats for global banking and telecom clients within the TCS SOC (Security Operations Center).",
    responsibilities: [
      "Perform vulnerability scans and assist in penetration testing routines.",
      "Monitor SIEM alerts and flag suspicious network anomalies.",
      "Document incident responses and suggest security patch deployments."
    ],
    eligibility: [
      "B.Tech / B.E in CS / IT / Cyber Security / ECE.",
      "Basic understanding of TCP/IP, Firewalls, OWASP Top 10, and Linux commands."
    ],
    perks: ["Global Client Exposure", "Health Coverage for family", "Higher Education Support"]
  },
  {
    id: "jw-111",
    title: "Finance & Accounts Intern",
    company: "Urban Company",
    companyLogo: CompanyLogos.UrbanCompany,
    companyColor: "#000000",
    roleBanner: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80",
    location: "Delhi NCR / Gurugram",
    type: "Internship",
    category: "Finance",
    stipendNumber: 25000,
    stipend: "₹25,000 /month",
    duration: "3 - 6 Months",
    startDate: "Immediately",
    applyBy: "21 Nov '26",
    postedDaysAgo: "1 day ago",
    isActivelyHiring: true,
    isPPO: true,
    applicantsCount: 220,
    skills: ["Financial Modeling", "MS Excel", "Tally ERP", "GST Compliance"],
    description: "Work with Urban Company's central finance controller team on partner payouts, vendor invoices, tax reconciliations, and budgeting models.",
    responsibilities: [
      "Reconcile daily service partner collections and bank statements.",
      "Prepare monthly GST return data and TDS deduction reports.",
      "Assist senior finance analysts in monthly variance analysis."
    ],
    eligibility: [
      "B.Com, BAF, BBA Finance, or CA Inter / CMA aspirants.",
      "Advanced Microsoft Excel skills (VLOOKUP, Pivot Tables, SUMIFS)."
    ],
    perks: ["Certificate", "Letter of Recommendation", "Free lunch and snacks", "PPO potential"]
  },
  {
    id: "jw-112",
    title: "Business Development (Sales) Associate",
    company: "Unacademy",
    companyLogo: CompanyLogos.Unacademy,
    companyColor: "#08BD80",
    roleBanner: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&auto=format&fit=crop&q=80",
    location: "Work From Home",
    type: "Job",
    category: "Sales & BD",
    stipendNumber: 60000,
    stipend: "₹6 - ₹9 LPA",
    duration: "Full-Time",
    startDate: "Immediately",
    applyBy: "27 Nov '26",
    postedDaysAgo: "6 hours ago",
    isActivelyHiring: true,
    isPPO: false,
    applicantsCount: 520,
    skills: ["Inside Sales", "Cold Calling", "Negotiation", "CRM"],
    description: "Counsel prospective students and parents on competitive exam test prep subscriptions. Drive admissions and revenue growth.",
    responsibilities: [
      "Connect with inbound leads generated from webinars and app signups.",
      "Conduct academic counselling sessions over phone and video calls.",
      "Pitch suitable subscription plans and close sales targets."
    ],
    eligibility: [
      "Any graduate with high persuasion, energy, and communication skills.",
      "Target-driven mindset with hunger to earn high performance incentives."
    ],
    perks: ["Laptop provided", "Attractive weekly performance incentives", "Medical Insurance"]
  }
];

const categoriesList = [
  { name: "Web Development", count: 480, icon: "code" },
  { name: "Data Science", count: 260, icon: "database" },
  { name: "Design", count: 340, icon: "palette" },
  { name: "Digital Marketing", count: 410, icon: "trending-up" },
  { name: "Content Writing", count: 210, icon: "file-text" },
  { name: "Product Management", count: 150, icon: "compass" },
  { name: "Human Resources", count: 180, icon: "users" },
  { name: "Finance", count: 195, icon: "pie-chart" },
  { name: "Cybersecurity", count: 110, icon: "shield" },
  { name: "Sales & BD", count: 320, icon: "briefcase" }
];

const topLocations = [
  "All Locations",
  "Work From Home",
  "Bengaluru",
  "Delhi NCR / Gurugram",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Chennai"
];

const testimonials = [
  {
    name: "Rohan Verma",
    college: "IIT Roorkee",
    role: "Software Engineer Intern @ Razorpay",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    quote: "Job Wallah changed my trajectory. I applied to 4 internships, got interview calls within 48 hours, and landed my dream stipend at Razorpay!"
  },
  {
    name: "Pooja Sharma",
    college: "Delhi University",
    role: "Content Strategist @ Zomato",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    quote: "As a tier-2 college student, getting noticed by big brands was tough. Job Wallah's verified badge and direct recruiter messaging made it seamless."
  },
  {
    name: "Anand Patel",
    college: "VIT Vellore",
    role: "Data Analyst @ Swiggy",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
    quote: "The filter for 'Work From Home' and 'Fresher Jobs' saved me endless hours. I converted my internship to a full-time 11 LPA PPO!"
  }
];

window.CompanyLogos = CompanyLogos;
window.initialJobs = initialJobs;
window.categoriesList = categoriesList;
window.topLocations = topLocations;
window.testimonials = testimonials;
