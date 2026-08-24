export type Room = {
  id: string;
  name: string;
  type: "Suite" | "Villa" | "Cottage" | "Room" | "Penthouse";
  category: "Suites" | "Villas" | "Cottages" | "Family Rooms";
  price: number;
  size: number;
  guests: number;
  beds: string;
  view: string;
  floor: string;
  highlights: string[];
  badge?: "MOST POPULAR" | "SEA VIEW" | "NEW";
  images: string[];
  description: string[];
  amenities: string[];
};

export const rooms: Room[] = [
  {
    id: "ocean-pool-villa",
    name: "Ocean Pool Villa",
    type: "Villa",
    category: "Villas",
    price: 52000,
    size: 180,
    guests: 4,
    beds: "2 King",
    view: "Direct Ocean",
    floor: "Ground",
    highlights: ["Private Pool", "Ocean View", "Butler"],
    badge: "MOST POPULAR",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
    ],
    description: [
      "Set along the resort's private cove, the Ocean Pool Villa is a sanctuary of unhurried luxury — 180 square metres of sun-warmed teak, hand-troweled lime walls and an infinity-edge plunge pool that blurs the line between deck and Arabian Sea.",
      "Wake to the sound of waves a few steps from your bed. Sip your morning coffee on a private deck shaded by frangipani. Retire each evening to a king-size canopy bed dressed in 600-thread-count Egyptian cotton.",
      "Every villa is paired with a personal butler, available around the clock to draw a sunset bath, arrange a private chef-led dinner, or simply ensure that nothing is required of you.",
    ],
    amenities: ["Private Pool","Ocean View","Butler Service","Air Conditioning","Free WiFi","Mini Bar","Jacuzzi","Outdoor Deck","Coffee Machine","In-room Safe","65\" Smart TV","Rain Shower"],
  },
  {
    id: "beachfront-suite",
    name: "Beachfront Suite",
    type: "Suite",
    category: "Suites",
    price: 28000,
    size: 95,
    guests: 2,
    beds: "King",
    view: "Beachfront",
    floor: "Ground / 1st",
    highlights: ["Beach Access", "Sea View", "Terrace"],
    badge: "SEA VIEW",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200",
    ],
    description: [
      "Step from your suite directly onto Candolim's powder-soft sand. The Beachfront Suite occupies a privileged position at the resort's edge, with a wide private terrace shaded by swaying coconut palms.",
      "Inside, a layered palette of driftwood, ivory and ocean teal creates an atmosphere of weightless calm.",
    ],
    amenities: ["Beach Access","Sea View","Air Conditioning","Free WiFi","Mini Bar","Outdoor Terrace","Coffee Machine","In-room Safe","Smart TV","Rain Shower","Bath Robes","Daily Turndown"],
  },
  {
    id: "garden-cottage",
    name: "Garden Cottage",
    type: "Cottage",
    category: "Cottages",
    price: 18000,
    size: 65,
    guests: 2,
    beds: "King",
    view: "Tropical Garden",
    floor: "Ground",
    highlights: ["Garden View", "Private Patio", "Quiet"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
    ],
    description: [
      "Tucked among the resort's heritage gardens, the Garden Cottage offers a quieter rhythm — birdsong at dawn, the rustle of palms at dusk, and a private outdoor patio shaded by jasmine and bougainvillea.",
    ],
    amenities: ["Garden View","Private Patio","Air Conditioning","Free WiFi","Mini Bar","Coffee Machine","In-room Safe","Smart TV","Rain Shower"],
  },
  {
    id: "clifftop-panorama-suite",
    name: "Clifftop Panorama Suite",
    type: "Suite",
    category: "Suites",
    price: 35000,
    size: 120,
    guests: 2,
    beds: "King",
    view: "180° Sea",
    floor: "Top",
    highlights: ["180° View", "Wraparound Balcony", "Sunset Vista"],
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200",
    ],
    description: [
      "Perched on the resort's highest ridge, the Clifftop Panorama Suite frames an uninterrupted 180-degree view of the Arabian Sea. The wraparound balcony is the finest sunset seat in Goa.",
    ],
    amenities: ["Panorama View","Wraparound Balcony","Air Conditioning","Free WiFi","Mini Bar","Jacuzzi","Coffee Machine","In-room Safe","Smart TV","Rain Shower"],
  },
  {
    id: "family-ocean-villa",
    name: "Family Ocean Villa",
    type: "Villa",
    category: "Family Rooms",
    price: 68000,
    size: 220,
    guests: 6,
    beds: "1 King + 2 Twin",
    view: "Ocean",
    floor: "Ground",
    highlights: ["Private Pool", "Kid Zone", "Two Bedrooms"],
    badge: "NEW",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200",
    ],
    description: [
      "Designed for multi-generational stays, the Family Ocean Villa offers two distinct bedroom wings, a private pool with shallow children's section, and a covered outdoor lounge for lazy afternoons together.",
    ],
    amenities: ["Private Pool","Two Bedrooms","Kid Zone","Air Conditioning","Free WiFi","Mini Bar","Outdoor Deck","Coffee Machine","In-room Safe","Smart TV","Rain Shower","Butler"],
  },
  {
    id: "deluxe-sea-view",
    name: "Deluxe Sea View Room",
    type: "Room",
    category: "Suites",
    price: 12000,
    size: 45,
    guests: 2,
    beds: "Queen",
    view: "Sea View",
    floor: "1st – 3rd",
    highlights: ["Sea View", "Balcony", "Best Value"],
    images: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200",
    ],
    description: [
      "An elegant introduction to Seagrove — refined interiors, a queen bed dressed in pure cotton, and a private balcony framed by the sea.",
    ],
    amenities: ["Sea View","Balcony","Air Conditioning","Free WiFi","Mini Bar","Coffee Machine","In-room Safe","Smart TV","Rain Shower"],
  },
  {
    id: "honeymoon-pool-cabana",
    name: "Honeymoon Pool Cabana",
    type: "Suite",
    category: "Suites",
    price: 42000,
    size: 110,
    guests: 2,
    beds: "King",
    view: "Ocean / Garden",
    floor: "Ground",
    highlights: ["Plunge Pool", "Private Deck", "Romance Setup"],
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=1200",
      "https://images.unsplash.com/photo-1578898886225-c1f3575b4d50?w=1200",
    ],
    description: [
      "Crafted for two — a plunge pool veiled in jasmine, a sunken outdoor bath, and a private deck dressed in candlelight on arrival.",
    ],
    amenities: ["Plunge Pool","Private Deck","Outdoor Bath","Romance Amenity","Air Conditioning","Free WiFi","Mini Bar","Coffee Machine","Safe","Smart TV"],
  },
  {
    id: "seagrove-penthouse",
    name: "Seagrove Penthouse",
    type: "Penthouse",
    category: "Villas",
    price: 120000,
    size: 350,
    guests: 8,
    beds: "3 King",
    view: "Panoramic Ocean",
    floor: "Top",
    highlights: ["Rooftop Infinity Pool", "Private Butler", "3 Bedrooms"],
    badge: "MOST POPULAR",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200",
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200",
    ],
    description: [
      "The Seagrove Penthouse is the resort's crowning sanctuary — a private floor with three king bedrooms, a rooftop infinity pool, dedicated butler, and an in-residence dining room with sea-view kitchen.",
    ],
    amenities: ["Rooftop Pool","3 Bedrooms","Private Butler","In-residence Dining","Air Conditioning","Free WiFi","Mini Bar","Jacuzzi","Outdoor Deck","Coffee Machine","Safe","Smart TV","Rain Shower"],
  },
];

export const restaurants = [
  {
    id: "tides",
    name: "Tides",
    tag: "Seafood & Grill",
    vibe: "Beachfront, sunset",
    timings: "Lunch 12–3PM · Dinner 7–11PM",
    dress: "Smart casual",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200",
    description:
      "An open-air pavilion at the water's edge with a live fire grill and a daily catch board chalked at sunset. The Goan coast on a plate — chargrilled tiger prawns, whole pomfret in recheado, and lobster thermidor under the stars.",
    signature: ["Goan-spiced Tiger Prawns", "Whole Grilled Pomfret", "Lobster Thermidor"],
  },
  {
    id: "ember",
    name: "Ember",
    tag: "Rooftop Bar & Lounge",
    vibe: "Starlit rooftop",
    timings: "5PM – Midnight",
    dress: "Smart casual",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200",
    description:
      "Seagrove's rooftop bar — a slow-burning fire pit, low-slung sofas, and a cocktail list built around regional spirits and sun-ripened fruits. Tapas plates from the open kitchen turn cocktails into an evening.",
    signature: ["Cardamom Old Fashioned", "Goan Feni Martini", "Smoked Almond Tapas"],
  },
  {
    id: "saffron",
    name: "Saffron",
    tag: "Indian Fine Dining",
    vibe: "Indoor, candlelit",
    timings: "Dinner 7–11PM",
    dress: "Smart elegant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
    description:
      "A modern Indian tasting room set inside a colonial-era courtyard. Eight courses that travel from Kerala's backwaters to Kashmir's high meadows, paired with regional wines and rare spirits.",
    signature: ["Saffron Tasting Menu (8 courses)", "Slow-cooked Lamb Rogan Josh", "Malabar Prawn Moilee"],
  },
];

export const experiences = [
  { id: 1, title: "Private Beach Bonfire", category: "On Land", duration: "2.5 hrs", price: 8500, image: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=900", description: "Exclusive sunset bonfire with personal butler, signature cocktails and live acoustic guitar." },
  { id: 2, title: "Kayaking & Paddleboarding", category: "On Water", duration: "1.5 hrs", price: 3500, image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=900", description: "Guided sea kayak tours along the Candolim coastline at dawn." },
  { id: 3, title: "Cooking with the Chef", category: "Culinary", duration: "3 hrs", price: 6500, image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900", description: "Learn three signature Goan recipes with our executive chef in the herb garden kitchen." },
  { id: 4, title: "Sunset Dolphin Cruise", category: "On Water", duration: "2 hrs", price: 12000, image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900", description: "Private yacht dolphin spotting at golden hour with chilled champagne." },
  { id: 5, title: "Yoga on the Beach", category: "Wellness", duration: "1 hr", price: 2500, image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900", description: "Sunrise yoga with a certified instructor on a private stretch of sand." },
  { id: 6, title: "Heritage Goa Tour", category: "Cultural", duration: "5 hrs", price: 9500, image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900", description: "Curated walking tour of Old Goa's colonial churches and fortifications." },
  { id: 7, title: "Ayurvedic Consultation", category: "Wellness", duration: "1 hr", price: 4500, image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900", description: "Personal dosha consultation with our resident ayurvedic physician." },
  { id: 8, title: "Spice Plantation Drive", category: "Cultural", duration: "4 hrs", price: 7500, image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=900", description: "Visit a working spice plantation with traditional thali lunch." },
];

export const testimonials = [
  { name: "Aryan & Meghna Singhania", city: "Mumbai", room: "Ocean Pool Villa", stay: "5 nights", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200", text: "We've stayed at Aman Tokyo and Six Senses Ibiza. Seagrove belongs in that conversation. The Ocean Pool Villa's private deck at sunrise is a memory we'll carry forever." },
  { name: "Priya Krishnamurthy", city: "Bengaluru", room: "Beachfront Suite", stay: "3 nights", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200", text: "The spa team remembered my preference for cooler room temperature from a previous stay. That level of care is rare. We won't holiday anywhere else." },
  { name: "Rahul & Anika Mehta", city: "Delhi", room: "Honeymoon Pool Cabana", stay: "7 nights", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200", text: "Booked for our honeymoon. Left feeling like family. Every detail — from the jasmine-scented bath on arrival to the surprise sunset cruise — was perfectly judged." },
  { name: "James Whitmore", city: "London", room: "Clifftop Panorama Suite", stay: "10 nights", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200", text: "I travel for work three weeks a month and stay in luxury hotels constantly. Seagrove is genuinely one of the finest properties in Asia. Service is invisible yet faultless." },
  { name: "Kavya Iyer", city: "Chennai", room: "Garden Cottage", stay: "4 nights", photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200", text: "Solo travel as a woman in India can be tense. Seagrove made me feel completely safe and gently looked after, without ever being intrusive." },
  { name: "Vikram Bhatia", city: "Pune", room: "Family Ocean Villa", stay: "6 nights", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200", text: "Travelled with my parents and two young children. The villa's two-bedroom layout, the kids' menu at Tides, the babysitting service — they thought of everything." },
  { name: "Isabel Fernandes", city: "Lisbon", room: "Seagrove Penthouse", stay: "4 nights", photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200", text: "The penthouse rooftop pool at sunset is one of the most extraordinary spaces I've ever stayed in. Worth every euro." },
  { name: "Arjun Kapoor", city: "Hyderabad", room: "Deluxe Sea View Room", stay: "2 nights", photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200", text: "Even the entry-level room felt considered. Real linen, real coffee, real care. Will absolutely return." },
];

export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900", cat: "Beach" },
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900", cat: "Spa" },
  { src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900", cat: "Spa" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=900", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=900", cat: "Beach" },
  { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=900", cat: "Beach" },
  { src: "https://images.unsplash.com/photo-1560053608-13721e7a3e29?w=900", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900", cat: "Rooms" },
  { src: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900", cat: "Spa" },
  { src: "https://images.unsplash.com/photo-1591291621164-2c6367723315?w=900", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=900", cat: "Rooms" },
];

export const awards = [
  { year: "2024", title: "Top 10 India Resorts", source: "Condé Nast Traveller" },
  { year: "2023", title: "Best Beach Resort", source: "Times Travel Awards" },
  { year: "2024", title: "Travellers' Choice", source: "TripAdvisor" },
  { year: "2023", title: "Luxury Beach Resort — Winner", source: "World Luxury Hotel Awards" },
  { year: "2024", title: "Best Spa in Goa", source: "Vogue Wellness" },
  { year: "2022", title: "Hotel of the Year", source: "Condé Nast Johansens" },
];

export const timeline = [
  { year: "2010", text: "Opened with 12 garden cottages on Candolim Beach." },
  { year: "2012", text: "Tides seafood restaurant launches; TripAdvisor Certificate of Excellence." },
  { year: "2014", text: "The Seagrove Spa opens with six treatment rooms." },
  { year: "2016", text: "Expanded to 48 suites; Ember rooftop bar opens." },
  { year: "2018", text: "Named Top 10 India Resorts — Condé Nast Traveller." },
  { year: "2020", text: "Launched Work from Paradise long-stay programme." },
  { year: "2022", text: "Spa expands to eight rooms; Ocean Pool Villas debut." },
  { year: "2024", text: "Rated #1 Resort in Goa — 1,200+ five-star reviews." },
];

export const spaTreatments = {
  Massages: [
    { name: "Signature Seagrove Ritual", duration: "120 min", price: 12500 },
    { name: "Hot Stone Massage", duration: "90 min", price: 9500 },
    { name: "Deep Tissue", duration: "60 min", price: 6500 },
    { name: "Ayurvedic Abhyanga", duration: "60 min", price: 7000 },
  ],
  "Body Treatments": [
    { name: "Balinese Body Wrap", duration: "75 min", price: 8500 },
    { name: "Coconut & Coffee Scrub", duration: "60 min", price: 6500 },
    { name: "Detox Clay Cocoon", duration: "90 min", price: 9000 },
  ],
  "Facial Rituals": [
    { name: "Marine Glow Facial", duration: "60 min", price: 7500 },
    { name: "Anti-Age Gold Facial", duration: "90 min", price: 11000 },
    { name: "Hydra-Lift Facial", duration: "75 min", price: 9000 },
  ],
  "Couples' Journeys": [
    { name: "Couples' Sanctuary", duration: "150 min", price: 24000 },
    { name: "Honeymoon Ritual", duration: "180 min", price: 28000 },
  ],
};
