import { Experience } from '@/types/portfolio';

export const experience: Experience[] = [
  {
    title: "Software Engineer II",
    company: "Cloudwick Technologies",
    location: "Bengaluru, India",
    period: "May 2024 – Jul. 2025",
    challenge: "Clients had millions of documents but no way to extract insights quickly. Legal teams spent days searching contracts. Analysts manually aggregated hundreds of reports.",
    solution: "Built AI platforms that ingest millions of documents and turn plain English questions into actionable insights.",
    impact: [
      "Legal teams find contract terms across 10M+ docs in seconds instead of days",
      "Business analysts get database answers in minutes without knowing SQL",
      "Finance aggregates quarterly metrics without manual spreadsheet work"
    ],
    technical: "Combined semantic search with row-level security controls. Built access permissions that check after queries run, critical for multi-tenant enterprise environments.",
    achievements: [
      "Architected Amorphic AI: An AI platform that answers questions like 'What are our Q2 contractual obligations?' across millions of documents. Users only see documents they're authorized to access, even when AI searches the entire database.",
      "Built SQL AI chatbot that turns plain English into SQL. Product managers validate ideas with real data without learning SQL. Implemented post-query access controls enforcing row-level security based on user roles.",
      "Designed automated ETL pipelines processing 500K+ records daily for real-time data summarization, integrating with client reporting dashboards.",
      "Mentored 3 junior engineers and led 4-person intern team through sprint planning and code reviews."
    ],
    tech: ["Python", "AWS Bedrock", "LangChain", "RAG", "Multi-Agent AI", "AWS Glue"]
  },
  {
    title: "Software Engineer I",
    company: "Cloudwick Technologies",
    location: "Bengaluru, India",
    period: "Jun. 2021 – May 2024",
    solution: "Built scalable document processing and ML infrastructure for large-scale data operations.",
    impact: [],
    technical: "",
    achievements: [
      "Built Intelligent Document Processing system processing 100K+ OCR documents monthly with 95% accuracy, implementing custom business rule engine and human-in-the-loop verification.",
      "Developed ETL pipelines using AWS Glue and ML training workflows with SageMaker, improving query performance by 30% through efficient data partitioning.",
      "Designed and deployed 15+ REST APIs for ML model serving with request validation, error handling, and production monitoring."
    ],
    tech: ["Python", "AWS SageMaker", "AWS Glue", "ETL", "REST APIs", "ML Pipelines"]
  },
  {
    title: "Software Development Intern",
    company: "MapMyIndia",
    location: "Remote",
    period: "Aug. 2020 – Dec. 2020",
    solution: "Developed GeoPark web application for real-time parking availability prediction.",
    impact: [],
    technical: "",
    achievements: [
      "Built full-stack application using React and Node.js, implementing geospatial indexing for location-based search.",
      "Designed application from requirements gathering to production deployment with responsive UI and RESTful backend services."
    ],
    tech: ["React", "Node.js", "JavaScript", "REST APIs", "Figma"]
  }
];