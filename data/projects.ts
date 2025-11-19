import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    title: "Multi-Agent RAG System",
    description: "Built a conversational AI system with multi-agent orchestration that achieves 90% retrieval precision on benchmark queries. Implemented vector search with Qdrant for semantic matching across 10K+ documents. The agent architecture uses tool invocation patterns for database queries, web searches, and document retrieval, with conversation context management. Deployed as containerized microservices using Docker with horizontal scaling to handle concurrent users.",
    tech: ["LangChain", "AWS Bedrock", "Qdrant", "Python", "Docker", "Vector Search"],
    github: "https://github.com/yourusername/multi-agent-rag",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    title: "AI-Powered Document Assistant",
    description: "Built a full-stack web application where users can upload documents and interact with an AI agent through a chat interface. The React frontend provides a clean upload and chat experience, while the FastAPI backend handles document processing with chunking and embedding generation. Designed the conversation flow with proper loading states and error handling for a smooth user experience.",
    tech: ["React", "FastAPI", "Python", "LangChain", "RAG", "Vector Embeddings"],
    github: "https://github.com/yourusername/doc-assistant",
    gradient: "from-cyan-500 to-blue-600"
  }
];