export type Project = {
  id: string;
  title: string;
  client: string;
  category: "YouTube" | "Reels" | "Ads" | "Podcasts";
  thumbnail: string;
  views: string;
  engagement: string;
  description: string;
  duration: string;
};

export const projects: Project[] = [
  { id: "neon-nights", title: "Neon Nights Vlog Series", client: "Kai Mercer", category: "YouTube", thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", views: "12.4M", engagement: "9.8%", duration: "12:42", description: "A cinematic Tokyo night-life vlog series cut into a slow-burn narrative arc with custom sound design and color graded for OLED screens." },
  { id: "alpine-drift", title: "Alpine Drift", client: "RedRiver Auto", category: "Ads", thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80", views: "4.1M", engagement: "11.2%", duration: "0:45", description: "A hero ad spot for the new electric SUV — frame-perfect motion tracking and atmospheric snow-storm composites." },
  { id: "studio-talks", title: "Studio Talks Podcast", client: "Mona Reyes", category: "Podcasts", thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80", views: "2.8M", engagement: "7.4%", duration: "58:10", description: "Multi-cam podcast edit with dynamic captions, B-roll storytelling and a custom intro reel." },
  { id: "gym-shred", title: "Gym Shred Reels Pack", client: "ApexFit", category: "Reels", thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80", views: "18.6M", engagement: "14.1%", duration: "0:28", description: "30-piece short-form pack engineered for the algorithm — punchy hooks, beat-matched cuts and viral captions." },
  { id: "wave-runner", title: "Wave Runner", client: "Salt & Sun Co.", category: "Ads", thumbnail: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80", views: "3.5M", engagement: "10.3%", duration: "0:30", description: "A summer apparel campaign cut from 6 hours of drone and slow-mo footage into a 30-second anthem." },
  { id: "founders-files", title: "The Founders Files", client: "Aria Khan", category: "YouTube", thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80", views: "6.7M", engagement: "12.6%", duration: "18:21", description: "Long-form interview series with documentary-grade pacing, motion graphics and chapter design." },
  { id: "midnight-menu", title: "Midnight Menu", client: "Nori House", category: "Reels", thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80", views: "9.2M", engagement: "13.7%", duration: "0:24", description: "Food reels pack — macro cuts, ASMR sound design and beat-driven transitions." },
  { id: "voltage", title: "Voltage Launch Film", client: "Helix Audio", category: "Ads", thumbnail: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=80", views: "5.3M", engagement: "9.1%", duration: "1:10", description: "Product launch film with CGI integration and a custom score sync edit." },
  { id: "deep-dive", title: "Deep Dive Documentary", client: "Blue Atlas", category: "YouTube", thumbnail: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80", views: "8.9M", engagement: "10.8%", duration: "22:08", description: "Underwater documentary edited for emotional pacing with original color science." },
  { id: "chat-cuts", title: "Chat Cuts Podcast", client: "Two Mics", category: "Podcasts", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80", views: "1.6M", engagement: "8.0%", duration: "1:02:33", description: "Weekly podcast with multi-cam, animated lower thirds and full clip-cutting workflow." },
  { id: "skate-city", title: "Skate City Reels", client: "GroundUp", category: "Reels", thumbnail: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80", views: "11.3M", engagement: "15.4%", duration: "0:21", description: "Street skate reels with kinetic typography and custom sound design." },
  { id: "boardroom", title: "Boardroom Stories", client: "Northpeak", category: "YouTube", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80", views: "3.2M", engagement: "9.5%", duration: "14:55", description: "Business storytelling channel — broadcast-grade edits with motion graphics." },
];
