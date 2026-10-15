import { SkillCategory } from '@/types/portfolio';

// Mirrors the Technical Skills section of public/resume.pdf
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      "Python",
      "Java",
      "SQL",
      "JavaScript",
      "TypeScript",
      "C++"
    ],
    icon: "code"
  },
  {
    category: "ML & AI",
    skills: [
      "PyTorch",
      "TensorFlow",
      "LangChain",
      "LangGraph",
      "Scikit-learn",
      "Pandas",
      "NumPy"
    ],
    icon: "zap"
  },
  {
    category: "Cloud & Tools",
    skills: [
      "AWS (Bedrock, SageMaker, Glue, Lambda, EC2, SQS, ALB)",
      "Docker",
      "Git",
      "Linux"
    ],
    icon: "cloud"
  },
  {
    category: "Databases",
    skills: [
      "PostgreSQL",
      "Aurora",
      "Qdrant",
      "Neo4j",
      "MongoDB",
      "Redis"
    ],
    icon: "database"
  }
];
