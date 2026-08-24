export type Course = {
  id: string;
  title: string;
  exam: "JEE" | "NEET" | "Boards" | "Foundation";
  classLevel: string;
  duration: string;
  fee: string;
  short: string;
  description: string;
  icon: string;
  features: string[];
  benefits: string[];
  syllabus: string[];
  material: string[];
};

export const courses: Course[] = [
  {
    id: "iit-jee-advanced",
    title: "IIT-JEE (Main + Advanced)",
    exam: "JEE",
    classLevel: "11-12",
    duration: "2 Years",
    fee: "₹1,45,000 / year",
    short: "Comprehensive 2-year program for IIT aspirants with rank-focused mentoring.",
    description:
      "Our flagship JEE program is designed by ex-IITians and crafted for serious rank seekers. Concept-first teaching, weekly tests, and personal mentorship ensure every student is exam-ready.",
    icon: "Atom",
    features: [
      "600+ live classroom hours",
      "Weekly JEE-pattern mock tests",
      "Doubt-clearing sessions 6 days/week",
      "Personalized rank predictor reports",
    ],
    benefits: [
      "Top 100 AIR mentorship pool",
      "Lifetime alumni network",
      "Direct access to ex-IITian faculty",
    ],
    syllabus: [
      "Physics: Mechanics, Electrodynamics, Modern Physics, Optics",
      "Chemistry: Physical, Organic, Inorganic (full NCERT + advanced)",
      "Mathematics: Calculus, Algebra, Coordinate, Vectors & 3D",
    ],
    material: ["Printed modules (60+ books)", "Daily Practice Problems", "Past 25-year solved papers"],
  },
  {
    id: "neet-ug",
    title: "NEET-UG Medical",
    exam: "NEET",
    classLevel: "11-12",
    duration: "2 Years",
    fee: "₹1,35,000 / year",
    short: "Future doctors begin here. NCERT-rooted preparation with NEET-pattern rigor.",
    description:
      "Built around NCERT mastery and high-yield NEET problem solving. Our biology faculty includes AIIMS-trained doctors and our test series mirrors the real NEET pattern.",
    icon: "Stethoscope",
    features: [
      "NCERT line-by-line coverage",
      "AIIMS-pattern Biology lectures",
      "Bi-weekly full-length mocks",
      "One-on-one mentor for every student",
    ],
    benefits: ["Medical college selection guidance", "Counselling support post-NEET"],
    syllabus: [
      "Physics: Mechanics, Thermodynamics, Modern Physics",
      "Chemistry: Full NCERT focus",
      "Biology: Botany + Zoology (Class 11 & 12)",
    ],
    material: ["Bio diagrams handbook", "NCERT companion booklets", "10-year NEET PYQs"],
  },
  {
    id: "class-12-boards",
    title: "Class 12 Board Mastery",
    exam: "Boards",
    classLevel: "12",
    duration: "1 Year",
    fee: "₹65,000",
    short: "Score 95%+ in CBSE/ICSE boards with structured chapter-wise drilling.",
    description:
      "Designed for board toppers — covers PCM/PCB or Commerce streams with sample paper marathons, viva prep, and writing-style coaching for 90+ marks.",
    icon: "GraduationCap",
    features: ["Chapter-wise tests", "Answer-writing workshops", "Pre-board mock series"],
    benefits: ["Topper-style notes provided", "Project & practical guidance"],
    syllabus: ["Stream-wise full CBSE/ICSE syllabus", "Sample papers (last 10 years)"],
    material: ["Topper notes set", "Marking-scheme handbook"],
  },
  {
    id: "class-10-boards",
    title: "Class 10 Board Champions",
    exam: "Boards",
    classLevel: "10",
    duration: "1 Year",
    fee: "₹55,000",
    short: "Build a strong base for boards and competitive exams ahead.",
    description:
      "Combines Class 10 board excellence with early JEE/NEET foundation exposure so students transition into Class 11 with a head start.",
    icon: "BookOpen",
    features: ["All 5 subjects", "Bi-weekly tests", "Olympiad enrichment"],
    benefits: ["Foundation for JEE/NEET", "Habit-building study planner"],
    syllabus: ["Maths, Science, Social, English, Hindi (CBSE)"],
    material: ["Concept booklets", "MCQ workbooks"],
  },
  {
    id: "foundation-junior",
    title: "Foundation (Class 6-8)",
    exam: "Foundation",
    classLevel: "6-8",
    duration: "1 Year",
    fee: "₹40,000",
    short: "Spark curiosity early with logic, math, and science foundations.",
    description:
      "An NTSE/Olympiad-flavored program for younger learners. Builds reasoning, scientific temper, and a love for problem solving.",
    icon: "Sparkles",
    features: ["Olympiad & NTSE prep", "Activity-based learning", "Monthly progress reports"],
    benefits: ["Confidence in math & science", "Olympiad medal coaching"],
    syllabus: ["Math, Science, Mental Ability, English"],
    material: ["Activity workbooks", "Olympiad question banks"],
  },
  {
    id: "foundation-senior",
    title: "Foundation (Class 9-10)",
    exam: "Foundation",
    classLevel: "9-10",
    duration: "2 Years",
    fee: "₹75,000",
    short: "Early-bird JEE/NEET foundation with board excellence baked in.",
    description:
      "The perfect launchpad. Two years of integrated school + foundation coaching that takes a Class 9 student to JEE/NEET Class 11 readiness.",
    icon: "Rocket",
    features: ["Integrated school + competition", "Olympiad training", "Career counselling"],
    benefits: ["Ahead-of-class concepts", "Stream selection support"],
    syllabus: ["School syllabus + JEE/NEET foundation modules"],
    material: ["Foundation modules", "DPPs", "Olympiad bank"],
  },
];

export type Topper = {
  name: string;
  rank: string;
  exam: string;
  photo: string;
  quote?: string;
};

export const toppers: Topper[] = [
  { name: "Aarav Mehta", rank: "AIR 7", exam: "JEE Advanced 2025", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=faces", quote: "ExcelEdge faculty made the toughest concepts feel obvious." },
  { name: "Ishita Sharma", rank: "AIR 12", exam: "NEET 2025", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces", quote: "The mock test rigor here is unmatched." },
  { name: "Rohan Verma", rank: "AIR 23", exam: "JEE Advanced 2025", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces" },
  { name: "Ananya Iyer", rank: "AIR 41", exam: "NEET 2025", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces" },
  { name: "Karan Singh", rank: "AIR 58", exam: "JEE Main 2025", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces" },
  { name: "Priya Nair", rank: "AIR 84", exam: "NEET 2025", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces" },
  { name: "Devansh Kumar", rank: "AIR 102", exam: "JEE Advanced 2025", photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=faces" },
  { name: "Sneha Reddy", rank: "AIR 117", exam: "NEET 2025", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces" },
];

export const faculty = [
  { name: "Dr. Rajeev Kapoor", subject: "Physics", experience: "22 yrs · Ex-IIT Delhi", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop" },
  { name: "Prof. Meera Subramanian", subject: "Chemistry", experience: "18 yrs · Ph.D IIT Bombay", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop" },
  { name: "Mr. Anuj Bhardwaj", subject: "Mathematics", experience: "15 yrs · Author, JEE Math", photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&h=600&fit=crop" },
  { name: "Dr. Kavita Rao", subject: "Biology", experience: "20 yrs · AIIMS Trained", photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=600&fit=crop" },
  { name: "Mr. Siddharth Jain", subject: "Physics", experience: "12 yrs · Ex-FIITJEE", photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=500&h=600&fit=crop" },
  { name: "Ms. Pooja Mishra", subject: "Organic Chemistry", experience: "14 yrs · IIT Kanpur", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop" },
];

export const testimonials = [
  { name: "Aarav Mehta", role: "AIR 7 · JEE Advanced", text: "Two years at ExcelEdge transformed how I think about problems. The mentors don't just teach — they coach.", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces" },
  { name: "Ishita Sharma", role: "AIR 12 · NEET", text: "The biology faculty here is hands-down the best. Every NCERT line was made memorable.", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces" },
  { name: "Rohan Verma", role: "AIR 23 · JEE Advanced", text: "From a confused Class 10 student to AIR 23 — ExcelEdge made it possible.", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces" },
];

export const stats = [
  { label: "Students Trained", value: 10000, suffix: "+" },
  { label: "Top Selections", value: 500, suffix: "+" },
  { label: "Expert Faculty", value: 50, suffix: "+" },
  { label: "Success Rate", value: 95, suffix: "%" },
];

export const timeline = [
  { year: "2008", title: "Founded in Kota", text: "Started with a single classroom of 30 students and one mission — make excellence accessible." },
  { year: "2012", title: "First AIR 1", text: "Our student secured All India Rank 1 in JEE Advanced, putting ExcelEdge on the national map." },
  { year: "2016", title: "Expansion", text: "Opened 4 new centers across India, training over 3,000 students annually." },
  { year: "2020", title: "Hybrid Learning", text: "Launched a world-class online + offline hybrid platform during the pandemic." },
  { year: "2025", title: "10,000 Toppers", text: "Crossed 10,000 students trained and 500+ selections in IITs & top medical colleges." },
];
