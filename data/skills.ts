import { SkillCategory } from '@/types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    category: "AI/ML Technologies",
    skills: [
      "LangChain",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "HuggingFace",
      "OpenAI API"
    ],
    icon: "zap"
  },
  {
    category: "Programming Languages",
    skills: [
      "Python",
      "Java",
      "C++",
      "JavaScript",
      "TypeScript",
      "SQL"
    ],
    icon: "code"
  },
  {
    category: "Cloud & Infrastructure",
    skills: [
      "AWS (Bedrock, SageMaker, Glue)",
      "Lambda",
      "Aurora",
      "DynamoDB",
      "Docker"
    ],
    icon: "cloud"
  },
  {
    category: "Web Development",
    skills: [
      "React.js",
      "Node.js",
      "Flask",
      "FastAPI",
      "Tailwind CSS"
    ],
    icon: "git-branch"
  }
];

// Additional skills that don't fit in main categories
export const additionalSkills = {
  aiDevelopmentTools: ["Cursor IDE", "GitHub Copilot"],
  databases: ["PostgreSQL", "MongoDB", "Redis"],
  tools: ["Git", "Figma", "Postman", "Linux", "VS Code"]
};