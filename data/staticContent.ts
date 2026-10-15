import { QuickStat, ContactMethod } from '@/types/portfolio';

// // Quick stats displayed in About section
// export const quickStats: QuickStat[] = [
//   {
//     label: "Experience",
//     value: "4+ Years",
//     icon: "award"
//   },
//   {
//     label: "Education",
//     value: "M.S. in Progress",
//     icon: "graduation-cap"
//   },
//   {
//     label: "Specialization",
//     value: "AI/ML & RAG",
//     icon: "zap"
//   },
//   {
//     label: "Location",
//     value: "Seattle, WA",
//     icon: "map-pin"
//   }
// ];

// Contact methods
export const contactMethods: ContactMethod[] = [
  {
    icon: "mail",
    label: "Email",
    value: "joshi.rohan@northeastern.edu",
    href: "mailto:joshi.rohan@northeastern.edu",
    action: "Send Email"
  },
  {
    icon: "github",
    label: "GitHub",
    value: "github.com/rohanjoshi1399",
    href: "https://github.com/rohanjoshi1399",
    action: "View Profile"
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/therohanjoshi",
    href: "https://linkedin.com/in/therohanjoshi",
    action: "Connect"
  },
  {
    icon: "file-text",
    label: "Résumé",
    value: "PDF, 1 page",
    href: "/resume.pdf",
    action: "View PDF"
  }
];

// Seeking opportunities
export const seekingOpportunities = {
  title: "What I'm Looking For",
  areas: [
    "AI/ML engineering (LLMs, RAG, agents)",
    "Backend and distributed systems",
    "ML infrastructure on AWS"
  ],
  description: "I want to own AI and data systems end to end, from retrieval quality to the infrastructure underneath. I learn quickly, collaborate well, and love diving into hard technical problems."
};
