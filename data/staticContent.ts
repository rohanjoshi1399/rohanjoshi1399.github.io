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
    value: "rohan.joshi.1399@gmail.com",
    href: "mailto:rohan.joshi.1399@gmail.com",
    gradient: "from-cyan-500 to-blue-600",
    action: "Send Email"
  },
  {
    icon: "github",
    label: "GitHub",
    value: "",
    href: "https://github.com/rohanjoshi1399",
    gradient: "from-slate-600 to-slate-800",
    action: "View Profile"
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/therohanjoshi",
    href: "https://linkedin.com/in/therohanjoshi",
    gradient: "from-blue-600 to-blue-800",
    action: "Connect"
  }
  // {
  //   icon: "file-text",
  //   label: "Resume",
  //   value: "Download my resume",
  //   href: "#",
  //   gradient: "from-purple-600 to-pink-600",
  //   action: "Download PDF"
  // }
];

// Seeking opportunities
export const seekingOpportunities = {
  title: "What I'm Looking For",
  areas: [
    "AI/ML Engineering",
    "RAG Systems",
    "Multi-Agent AI",
    "Distributed Systems",
    "Backend Development",
    "Cloud Infrastructure"
  ],
  description: "I'm interested in companies tackling problems that matter, whether that's building cutting-edge AI applications, scaling systems to millions of users, or creating the infrastructure that powers the next generation of technology. I learn quickly, collaborate well, and love diving into hard technical problems."
};

// Section descriptions
export const sectionDescriptions = {
  contact: "I'm actively looking for AI/ML Software Engineering internships for Summer 2026. If you're working on interesting problems in AI systems, distributed architectures, or backend infrastructure, I'd love to chat."
};