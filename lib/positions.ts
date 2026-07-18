export type Position = {
  title: string
  category: "Software" | "BPO"
  location: string
  type: string
  experience: string
  summary: string
  /** ISO date when the posting was published (Google JobPosting requires this). */
  datePosted: string
  /** ISO date when the posting expires. */
  validThrough: string
}

export const positions: Position[] = [
  {
    title: "Senior Software Engineer",
    category: "Software",
    location: "Bengaluru / Hybrid",
    type: "Full-time",
    experience: "5+ years",
    summary:
      "Design and deliver scalable enterprise applications with strong focus on architecture, code quality and mentoring.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior Full Stack Developer",
    category: "Software",
    location: "Bengaluru / Remote",
    type: "Full-time",
    experience: "5+ years",
    summary: "Build end-to-end products using React, Next.js and Node.js with cloud-ready APIs and modern UI systems.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior Frontend Engineer",
    category: "Software",
    location: "Bengaluru / Hybrid",
    type: "Full-time",
    experience: "4+ years",
    summary: "Craft high-performance web interfaces with React/Next.js, accessibility and polished product experiences.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior Backend Engineer",
    category: "Software",
    location: "Bengaluru / Hybrid",
    type: "Full-time",
    experience: "5+ years",
    summary: "Own services and data layers with Node.js, secure APIs, databases and reliable cloud deployments.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior BPO Operations Manager",
    category: "BPO",
    location: "Bengaluru / On-site",
    type: "Full-time",
    experience: "6+ years",
    summary: "Lead multi-process BPO operations, drive SLAs, quality frameworks and continuous performance improvement.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior BPO Team Lead",
    category: "BPO",
    location: "Bengaluru / On-site",
    type: "Full-time",
    experience: "4+ years",
    summary: "Coach and manage BPO teams, handle escalations, and ensure consistent customer and process outcomes.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior Process Associate — BPO",
    category: "BPO",
    location: "Bengaluru / On-site",
    type: "Full-time",
    experience: "3+ years",
    summary:
      "Handle complex process workflows, quality checks and stakeholder communication in high-volume BPO programs.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
  {
    title: "Senior Customer Support Specialist — BPO",
    category: "BPO",
    location: "Bengaluru / Hybrid",
    type: "Full-time",
    experience: "3+ years",
    summary: "Deliver senior-level support across voice and digital channels with ownership of CSAT and issue resolution.",
    datePosted: "2026-06-01",
    validThrough: "2026-12-31",
  },
]
