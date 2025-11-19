import { Experience } from '@/types/portfolio';

export const experience: Experience[] = [
  {
    title: "Software Engineer II",
    company: "Cloudwick Technologies",
    location: "Bengaluru, India",
    period: "May 2024 – Jul. 2025",
    achievements: [
      "Led development of Amorphic AI, a production RAG framework serving millions of document records with multi-agent orchestration for document retrieval, summarization, and query processing",
      "Built SQL AI chatbot using AWS Bedrock with Agentic RAG design, cutting query resolution time by 40% through prompt optimization and response caching — earned Cloudwick Spotlight Award for this work",
      "Architected data pipelines processing large document volumes daily using AWS Glue for ETL operations, with LLM-based summarization and automated report generation",
      "Mentored 3 junior engineers and supervised a 4-person intern capstone project, conducting code reviews and establishing cloud-native development standards"
    ],
    tech: ["Python", "AWS Bedrock", "LangChain", "RAG", "Multi-Agent AI", "AWS Glue"]
  },
  {
    title: "Software Engineer I",
    company: "Cloudwick Technologies",
    location: "Bengaluru, India",
    period: "Jun. 2021 – May 2024",
    achievements: [
      "Designed scalable Intelligent Document Processing system handling 100K+ OCR documents monthly with 95% accuracy, featuring customizable business rules and human-in-the-loop verification",
      "Built ETL pipelines using AWS Glue and ML model training workflows with SageMaker, optimizing data preprocessing for large-scale document processing",
      "Collaborated with cross-functional teams during agile sprints, delivering 15+ backend integrations including REST APIs for ML model serving"
    ],
    tech: ["Python", "AWS SageMaker", "AWS Glue", "ETL", "REST APIs", "ML Pipelines"]
  },
  {
    title: "Software Development Intern",
    company: "MapMyIndia",
    location: "Remote",
    period: "Aug. 2020 – Dec. 2020",
    achievements: [
      "Built GeoPark web application using React and Node.js, implementing frontend components and backend APIs for geolocation-based parking availability"
    ],
    tech: ["React", "Node.js", "JavaScript", "REST APIs"]
  }
];