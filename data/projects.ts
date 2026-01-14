import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    title: "Multi-Agent RAG System",
    description: "Built a conversational AI system with multi-agent orchestration that achieves 90% retrieval precision on benchmark queries. Implemented vector search with Qdrant for semantic matching across 10K+ documents. The agent architecture uses tool invocation patterns for database queries, web searches, and document retrieval, with conversation context management. Deployed as containerized microservices using Docker with horizontal scaling to handle concurrent users.",
    tech: ["LangChain", "AWS Bedrock", "Qdrant", "Python", "Docker", "Vector Search"],
    github: "https://github.com/rohanjoshi1399/chorus",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "ChatFlow - Distributed Chat System",
    description: "Designed and built a scalable distributed chat system with a multi-tier architecture for real-time messaging. The system uses WebSocket connections distributed across multiple server instances with load balancing and sticky sessions. Implemented a message broker pattern using FIFO queues to ensure ordered message delivery across chat rooms. Developed a batch processing pipeline for efficient database persistence, with materialized views for real-time analytics. The architecture handles high concurrency and massive message throughput through horizontal scaling and asynchronous message processing.",
    tech: ["Java", "WebSocket", "AWS SQS", "Aurora PostgreSQL", "EC2", "AWS ALB"],
    github: "https://github.com/rohanjoshi1399/chatflow",
    gradient: "from-cyan-500 to-blue-600"
  }
];