import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    title: "Chorus: 8-Agent RAG System",
    problem: "Engineers waste hours digging through documentation, old Slack threads, and scattered wikis. Simple questions like 'How did we implement auth?' turn into 30-minute scavenger hunts.",
    solution: "An AI assistant that actually understands your company's knowledge. Ask questions in plain English, and it searches across all your docs, conversations, and code to give you accurate answers with sources. Think of it as having a senior engineer who's read everything and never forgets.",
    impact: [
      "New engineers get answers instantly instead of bothering their teammates",
      "Support teams find solutions across product docs and past tickets in seconds",
      "Teams moving fast can validate decisions without endless document hunting"
    ],
    highlight: "It uses 8 specialized AI agents working together. One understands your question, another searches databases, another fact-checks the answer. They collaborate like a team of experts to help you.",
    tech: ["LangGraph", "AWS Bedrock", "Qdrant", "Neo4j", "Python", "Docker"],
    github: "https://github.com/rohanjoshi1399/chorus",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "ChatFlow - Distributed Chat System",
    problem: "Building chat apps that handle thousands of concurrent users without lag or lost messages is hard. How do you scale when traffic spikes? How do you keep messages in order?",
    solution: "Enterprise-grade chat infrastructure that scales horizontally. Add more servers when traffic increases, remove them when it drops. Messages route intelligently, conversations persist reliably, users get real-time updates.",
    impact: [
      "Gaming companies need in-game chat for millions of concurrent players",
      "SaaS platforms want team collaboration without building from scratch",
      "IoT systems require reliable real-time device communication"
    ],
    highlight: "Handles 3,000+ messages per second with under 100ms latency. That's production-level performance, built to demonstrate distributed systems patterns I learned at Northeastern.",
    tech: ["Java", "WebSocket", "AWS SQS", "Aurora PostgreSQL", "EC2", "AWS ALB"],
    github: "https://github.com/rohanjoshi1399/chatflow",
    gradient: "from-cyan-500 to-blue-600"
  }
];