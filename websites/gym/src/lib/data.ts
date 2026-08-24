// Hardcoded data for the entire Iron Peak Circle site. No backend, no DB.
import trainerMarcus from "@/assets/trainer-marcus.jpg";
import trainerPriya from "@/assets/trainer-priya.jpg";
import trainerDerek from "@/assets/trainer-derek.jpg";
import trainerAisha from "@/assets/trainer-aisha.jpg";
import trainerRohan from "@/assets/trainer-rohan.jpg";
import trainerKabir from "@/assets/trainer-kabir.jpg";
import classBoxing from "@/assets/class-boxing.jpg";

export type ClassCategory = "Strength" | "Cardio" | "Mind & Body" | "Combat" | "Recovery";
export type Intensity = "LOW" | "MEDIUM" | "HIGH" | "EXTREME";

export interface GymClass {
  id: string;
  name: string;
  category: ClassCategory;
  trainer: string;
  duration: number;
  maxParticipants: number;
  intensity: Intensity;
  image: string;
  description: string;
}

export const HOME_CLASSES: GymClass[] = [
  { id: "hiit-blitz", name: "HIIT Blitz", category: "Cardio", trainer: "Derek Cole", duration: 45, maxParticipants: 20, intensity: "EXTREME",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
    description: "45 minutes of relentless intervals designed to torch fat and build raw conditioning." },
  { id: "powerlifting", name: "Powerlifting", category: "Strength", trainer: "Marcus Reid", duration: 60, maxParticipants: 12, intensity: "HIGH",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
    description: "Master the big three — squat, bench, deadlift — under elite coaching." },
  { id: "boxing", name: "Boxing Fundamentals", category: "Combat", trainer: "Derek Cole", duration: 50, maxParticipants: 16, intensity: "HIGH",
    image: classBoxing,
    description: "Footwork, jabs, combinations. Build confidence and conditioning round by round." },
  { id: "yoga-flow", name: "Yoga Flow", category: "Mind & Body", trainer: "Priya Sharma", duration: 60, maxParticipants: 24, intensity: "LOW",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
    description: "Vinyasa flow that opens hips, decompresses the spine, and resets your nervous system." },
  { id: "spin", name: "Spin Cycle", category: "Cardio", trainer: "Aisha Khan", duration: 45, maxParticipants: 22, intensity: "HIGH",
    image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=800&q=80",
    description: "High-energy ride with thunder-loud sound system and watt-tracked performance." },
  { id: "crossfit", name: "CrossFit WOD", category: "Strength", trainer: "Marcus Reid", duration: 60, maxParticipants: 18, intensity: "EXTREME",
    image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800&q=80",
    description: "The Workout of the Day. Constantly varied, high-intensity, functional movement." },
];

export const ALL_CLASSES: GymClass[] = [
  ...HOME_CLASSES,
  { id: "deadlift-club", name: "Deadlift Club", category: "Strength", trainer: "Marcus Reid", duration: 75, maxParticipants: 10, intensity: "EXTREME",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
    description: "Deep technique work and progressive overload for serious pullers." },
  { id: "kickboxing", name: "Kickboxing", category: "Combat", trainer: "Derek Cole", duration: 55, maxParticipants: 18, intensity: "HIGH",
    image: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=800&q=80",
    description: "Strikes, kicks, and full-body conditioning for explosive power." },
  { id: "mobility", name: "Mobility & Recovery", category: "Recovery", trainer: "Priya Sharma", duration: 45, maxParticipants: 20, intensity: "LOW",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&q=80",
    description: "Foam rolling, banded drills, and breathwork to bulletproof your joints." },
  { id: "spartan-circuit", name: "Spartan Circuit", category: "Cardio", trainer: "Aisha Khan", duration: 50, maxParticipants: 16, intensity: "EXTREME",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    description: "Obstacle-style circuits that build grit, grip, and full-body endurance." },
  { id: "meditation", name: "Guided Meditation", category: "Mind & Body", trainer: "Priya Sharma", duration: 30, maxParticipants: 30, intensity: "LOW",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    description: "Breath-led sessions to lower cortisol and sharpen focus." },
  { id: "olympic-lifting", name: "Olympic Lifting", category: "Strength", trainer: "Marcus Reid", duration: 70, maxParticipants: 10, intensity: "HIGH",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    description: "Snatch and clean & jerk technique under platform-certified coaching." },
];

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  years: number;
  certs: string[];
  achievements: string[];
  bio: string;
  image: string;
}

export const TRAINERS: Trainer[] = [
  { id: "marcus-reid", name: "Marcus Reid", specialty: "Strength & Conditioning", years: 12,
    certs: ["NSCA-CSCS", "USA Weightlifting L2", "Westside Barbell Cert"],
    achievements: ["Coached 4 national-level powerlifters", "Total: 720kg @ 93kg", "Featured in MensXP Fitness 2023"],
    bio: "Marcus has spent over a decade refining the art of getting people genuinely strong. He believes in slow, deliberate progression and zero ego in the gym.",
    image: trainerMarcus },
  { id: "priya-sharma", name: "Priya Sharma", specialty: "Yoga & Mobility", years: 9,
    certs: ["RYT-500", "FRC Mobility Specialist", "Yin Yoga L2"],
    achievements: ["10,000+ taught hours", "Yoga Journal contributor", "Trained at the Sivananda Ashram"],
    bio: "Priya bridges the gap between strength athletes and yogis. Her sessions are demanding, intelligent, and deeply restorative.",
    image: trainerPriya },
  { id: "derek-cole", name: "Derek Cole", specialty: "Boxing & HIIT", years: 11,
    certs: ["USA Boxing Coach L3", "NASM-CPT", "Precision Nutrition L1"],
    achievements: ["Former amateur welterweight (15-2)", "Cornered 3 pro fighters", "Featured trainer at Mumbai Fight Week"],
    bio: "Derek brings real fight-camp intensity to every class. Expect technical detail, hard rounds, and a coach who actually watches your hands.",
    image: trainerDerek },
  { id: "aisha-khan", name: "Aisha Khan", specialty: "Spin & Endurance", years: 7,
    certs: ["Schwinn Cycling Cert", "ACSM-CPT", "TRX Suspension L1"],
    achievements: ["Completed Ironman 70.3 Goa", "300+ spin classes taught", "Brand athlete for Decathlon India"],
    bio: "Aisha builds engines. Whether you're chasing a PR or your first 10K, her programming meets you where you are.",
    image: trainerAisha },
  { id: "rohan-mehta", name: "Rohan Mehta", specialty: "Bodybuilding & Hypertrophy", years: 8,
    certs: ["ISSA-CPT", "PN Nutrition L2", "Mike Israetel Hypertrophy Cert"],
    achievements: ["IHFF Classic Physique Top 5", "Coached 200+ transformations", "MD India contributor"],
    bio: "Rohan obsesses over the details: tempo, mind-muscle connection, and recovery. His clients build the kind of physiques people stop and stare at.",
    image: trainerRohan },
  { id: "kabir-jain", name: "Kabir Jain", specialty: "Functional & CrossFit", years: 10,
    certs: ["CrossFit L3", "USAW L1", "Animal Flow Instructor"],
    achievements: ["Asia CrossFit Regionals qualifier", "Sub-3 Fran (2:48)", "Box owner before joining Iron Peak Circle"],
    bio: "Kabir builds athletes that move well in every plane. His sessions are gritty, smart, and always meet you at your level.",
    image: trainerKabir },
];

export interface Plan {
  id: string;
  name: string;
  monthly: number;
  annual: number;
  features: string[];
  highlight?: boolean;
  elite?: boolean;
  tagline: string;
}

export const PLANS: Plan[] = [
  { id: "starter", name: "STARTER", monthly: 1999, annual: 19190, tagline: "Get moving.",
    features: ["Gym access 6AM\u201310PM", "2 group classes / week", "Locker access", "Basic fitness assessment"] },
  { id: "pro", name: "PRO", monthly: 3499, annual: 33590, tagline: "Most popular.", highlight: true,
    features: ["24/7 gym access", "Unlimited group classes", "1 PT session / month", "Nutrition consultation", "App access + progress tracking", "Locker + towel service"] },
  { id: "elite", name: "ELITE", monthly: 5999, annual: 57590, tagline: "All access. No limits.", elite: true,
    features: ["Everything in Pro", "4 PT sessions / month", "Dedicated locker", "Monthly DEXA body scan", "Priority class booking", "2 guest passes / month", "Recovery room access"] },
];

export const TESTIMONIALS = [
  { name: "Ananya Kapoor", result: "Lost 18kg in 6 months", quote: "I'd tried every gym in Andheri. Iron Peak Circle was the first place where the coaches actually remembered my goals between sessions.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "Vikram Singh", result: "Bench: 60kg → 120kg", quote: "Marcus completely rebuilt my technique. Doubled my bench in 14 months and never felt healthier.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
  { name: "Meera Iyer", result: "First half-marathon at 38", quote: "Aisha's programming made running feel possible. Crossed the finish line in Goa earlier this year.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
  { name: "Arjun Desai", result: "Dropped 12% body fat", quote: "Best money I've spent in a decade. The community here genuinely shows up for each other.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Kavya Nair", result: "Fixed chronic back pain", quote: "Priya's mobility work changed my life. I haven't had a back flare-up in over a year.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80" },
];

export const TIMELINE = [
  { year: "2015", title: "Founded in Andheri", text: "An 800 sqft basement, one trainer, and a stubborn belief that Mumbai deserved a better gym." },
  { year: "2017", title: "Expanded to 5,000 sqft", text: "Added group classes, a dedicated lifting platform, and our first class of certified coaches." },
  { year: "2019", title: "Powai Branch Opens", text: "Our second location goes live and we cross the 1,000 active member milestone." },
  { year: "2021", title: "Iron Peak Circle App Launches", text: "Live class booking, progress tracking, and trainer chat. 50,000+ downloads in the first year." },
  { year: "2023", title: "Bandra West Location", text: "Our third flagship opens \u2014 4 lifting platforms, recovery room, and a rooftop yoga deck." },
  { year: "2025", title: "500+ Active Members", text: "15 elite trainers, 50+ classes a week, and a community that keeps showing up." },
];

export const LOCATIONS = [
  { id: "andheri", name: "Andheri West", address: "12, Veera Desai Road, Andheri West, Mumbai 400053", phone: "+91 98765 43210", hours: "24/7 (PRO & ELITE)" },
  { id: "powai", name: "Powai", address: "B-204, Hiranandani Galleria, Powai, Mumbai 400076", phone: "+91 98765 43211", hours: "5AM \u2013 11PM" },
  { id: "bandra", name: "Bandra West", address: "8, Linking Road, Bandra West, Mumbai 400050", phone: "+91 98765 43212", hours: "5AM \u2013 11PM" },
];

export const FAQS = [
  { q: "Is there a joining fee?", a: "No. The price you see is the price you pay. No registration fees, no hidden charges." },
  { q: "Can I freeze my membership?", a: "Yes \u2014 PRO and ELITE members can freeze their membership for up to 30 days per year at no cost." },
  { q: "Do you offer trial sessions?", a: "Absolutely. Walk into any of our three locations for a complimentary day pass and a fitness consultation." },
  { q: "Are personal trainers included?", a: "PRO includes 1 PT session per month. ELITE includes 4. Additional sessions can be purchased \u00e0 la carte." },
  { q: "Can I use all three locations?", a: "Yes. Every membership tier includes access to Andheri, Powai, and Bandra." },
  { q: "What's the cancellation policy?", a: "Monthly plans can be cancelled with 30 days' notice. Annual plans are non-refundable but transferable." },
  { q: "Do you have showers and lockers?", a: "Every location has full locker rooms, showers, and grooming amenities. Towel service is included with PRO and ELITE." },
  { q: "Is there parking?", a: "Yes \u2014 free covered parking at Powai and Bandra; valet at Andheri." },
];

export const GALLERY = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80", cat: "Equipment" },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80", cat: "Equipment" },
  { src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=900&q=80", cat: "Classes" },
  { src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=900&q=80", cat: "Equipment" },
  { src: classBoxing, cat: "Classes" },
  { src: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=900&q=80", cat: "Classes" },
  { src: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=900&q=80", cat: "Classes" },
  { src: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=900&q=80", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80", cat: "Equipment" },
  { src: trainerMarcus, cat: "Transformations" },
  { src: trainerDerek, cat: "Transformations" },
  { src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=80", cat: "Equipment" },
  { src: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=900&q=80", cat: "Classes" },
  { src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80", cat: "Events" },
  { src: trainerRohan, cat: "Transformations" },
];

export const GALLERY_FILTERS = ["All", "Equipment", "Classes", "Events", "Transformations"] as const;

// Schedule
export const SCHEDULE_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const SCHEDULE_TIMES = ["6:00 AM", "7:30 AM", "9:00 AM", "12:00 PM", "5:00 PM", "6:30 PM", "8:00 PM"];

export type SchedColor = "red" | "blue" | "green" | "orange";

export interface ScheduleEntry {
  day: string; time: string; name: string; trainer: string; duration: number; spots: number; color: SchedColor;
}

export const SCHEDULE: ScheduleEntry[] = [
  // Mon
  { day: "Mon", time: "6:00 AM", name: "HIIT Blitz", trainer: "Derek Cole", duration: 45, spots: 4, color: "red" },
  { day: "Mon", time: "7:30 AM", name: "Powerlifting", trainer: "Marcus Reid", duration: 60, spots: 2, color: "blue" },
  { day: "Mon", time: "5:00 PM", name: "Boxing", trainer: "Derek Cole", duration: 50, spots: 6, color: "orange" },
  { day: "Mon", time: "6:30 PM", name: "Yoga Flow", trainer: "Priya Sharma", duration: 60, spots: 12, color: "green" },
  // Tue
  { day: "Tue", time: "6:00 AM", name: "Spin Cycle", trainer: "Aisha Khan", duration: 45, spots: 8, color: "red" },
  { day: "Tue", time: "9:00 AM", name: "Mobility", trainer: "Priya Sharma", duration: 45, spots: 14, color: "green" },
  { day: "Tue", time: "5:00 PM", name: "CrossFit WOD", trainer: "Kabir Jain", duration: 60, spots: 3, color: "blue" },
  { day: "Tue", time: "8:00 PM", name: "Kickboxing", trainer: "Derek Cole", duration: 55, spots: 7, color: "orange" },
  // Wed
  { day: "Wed", time: "6:00 AM", name: "HIIT Blitz", trainer: "Derek Cole", duration: 45, spots: 5, color: "red" },
  { day: "Wed", time: "12:00 PM", name: "Olympic Lifting", trainer: "Marcus Reid", duration: 70, spots: 4, color: "blue" },
  { day: "Wed", time: "6:30 PM", name: "Spin Cycle", trainer: "Aisha Khan", duration: 45, spots: 9, color: "red" },
  // Thu
  { day: "Thu", time: "7:30 AM", name: "Deadlift Club", trainer: "Marcus Reid", duration: 75, spots: 2, color: "blue" },
  { day: "Thu", time: "5:00 PM", name: "Yoga Flow", trainer: "Priya Sharma", duration: 60, spots: 10, color: "green" },
  { day: "Thu", time: "8:00 PM", name: "Boxing", trainer: "Derek Cole", duration: 50, spots: 5, color: "orange" },
  // Fri
  { day: "Fri", time: "6:00 AM", name: "Spartan Circuit", trainer: "Aisha Khan", duration: 50, spots: 6, color: "red" },
  { day: "Fri", time: "9:00 AM", name: "Powerlifting", trainer: "Marcus Reid", duration: 60, spots: 3, color: "blue" },
  { day: "Fri", time: "6:30 PM", name: "CrossFit WOD", trainer: "Kabir Jain", duration: 60, spots: 4, color: "blue" },
  // Sat
  { day: "Sat", time: "9:00 AM", name: "Open Gym Lift", trainer: "Marcus Reid", duration: 90, spots: 12, color: "blue" },
  { day: "Sat", time: "12:00 PM", name: "Kickboxing", trainer: "Derek Cole", duration: 55, spots: 8, color: "orange" },
  { day: "Sat", time: "5:00 PM", name: "Meditation", trainer: "Priya Sharma", duration: 30, spots: 18, color: "green" },
  // Sun
  { day: "Sun", time: "9:00 AM", name: "Yoga Flow", trainer: "Priya Sharma", duration: 60, spots: 15, color: "green" },
  { day: "Sun", time: "6:30 PM", name: "HIIT Blitz", trainer: "Derek Cole", duration: 45, spots: 7, color: "red" },
];
