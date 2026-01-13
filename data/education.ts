import { Education } from '@/types/portfolio';

export const education: Education[] = [
  {
    degree: "M.S. in Computer Science",
    school: "Northeastern University",
    location: "Seattle, WA",
    period: "Sept. 2025 – May 2027 (Expected)",
    courses: [
      "Scalable Distributed Systems",
      "Natural Language Processing",
      "Reinforcement Learning"
    ],
    current: true
  },
  {
    degree: "B.E. in Computer Science",
    school: "Birla Institute of Technology and Science (BITS Pilani)",
    location: "Goa, India",
    period: "Aug. 2017 – May 2021",
    courses: [
      "Data Structures",
      "Neural Networks and Fuzzy Logic",
      "Artificial Intelligence",
      "Machine Learning"
    ],
    current: false
  }
]; 
