import { Experience } from '@/types/portfolio';

export const experience: Experience[] = [
  {
    title: "Teaching Assistant, CS 5800 Algorithms",
    company: "Northeastern University",
    location: "Seattle, WA",
    period: "Sept. 2026 – Present",
    solution: "Each week I build an interactive model of the recitation problem, so students can poke at it and build intuition before writing anything down.",
    achievements: [
      "Built 4 problem visualizations so far, from bipartite constraint checking to scheduling and time-dependent shortest paths. They never solve the problem; they only report the consequences of the student's own choices.",
      "Plain HTML, CSS, and SVG with no dependencies, fully keyboard accessible, with live status updates for screen readers and reduced-motion support."
    ],
    tech: ["JavaScript", "SVG", "HTML/CSS", "Accessibility", "Vercel"],
    link: { label: "Try the visualizations", href: "https://cs5800-visualizations.vercel.app" }
  },
  {
    title: "Software Engineer II",
    company: "Cloudwick Technologies",
    location: "Bengaluru, India",
    period: "May 2024 – Jul. 2025",
    solution: "Clients had millions of documents and no fast way to get answers out of them. I built the AI platforms that turn plain English questions into answers they can act on.",
    achievements: [
      "Architected Amorphic AI, a production RAG framework (LangChain, AWS Bedrock, pgvector) that answers questions like 'What are our Q2 contractual obligations?' across a client's entire document collection in seconds. Users only see documents they're authorized to access, even when the AI searches everything.",
      "Built an agentic SQL chatbot so analysts get database answers without writing SQL. An error recovery loop reads failed queries, pulls in more schema context, and tries again, while post-query access controls enforce row-level security by user role. Earned a Cloudwick Spotlight Award.",
      "Designed automated daily ETL pipelines on AWS Glue, exposed as REST APIs with S3 event triggers and LLM summarization nodes feeding client reporting dashboards.",
      "Mentored 3 junior engineers and led a 4-person intern team through sprint planning and code reviews."
    ],
    tech: ["Python", "AWS Bedrock", "LangChain", "RAG", "Multi-Agent AI", "AWS Glue"]
  },
  {
    title: "Software Engineer I",
    company: "Cloudwick Technologies",
    location: "Bengaluru, India",
    period: "Jun. 2021 – May 2024",
    solution: "Built scalable document processing and ML infrastructure for large-scale data operations.",
    achievements: [
      "Built Intelligent Document Processing system handling large volumes of OCR documents with 95% accuracy, implementing custom business rule engine and human-in-the-loop verification.",
      "Developed ETL pipelines using AWS Glue and ML training workflows with SageMaker, improving query performance through efficient data partitioning.",
      "Designed and deployed 15+ REST APIs for ML model serving with request validation, error handling, and production monitoring."
    ],
    tech: ["Python", "AWS SageMaker", "AWS Glue", "ETL", "REST APIs", "ML Pipelines"]
  },
  {
    title: "Software Development Intern",
    company: "MapMyIndia",
    location: "Remote",
    period: "Aug. 2020 – Dec. 2020",
    solution: "Developed GeoPark, a web application for real-time parking availability prediction.",
    achievements: [
      "Built full-stack application using React and Node.js, implementing geospatial indexing for location-based search.",
      "Designed application from requirements gathering to production deployment with responsive UI and RESTful backend services."
    ],
    tech: ["React", "Node.js", "JavaScript", "REST APIs", "Figma"]
  }
];
