// TypeScript interfaces for portfolio data structure

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  availability: string;
  summary: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  courses: string[];
  current: boolean;
}

export interface Project {
  title: string;
  problem: string;
  solution: string;
  impact: string[];
  highlight: string;
  tech: string[];
  github: string;
  gradient: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  challenge?: string;
  solution: string;
  impact: string[];
  technical?: string;
  achievements: string[];  // Keep for backward compatibility if needed
  tech: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
  icon: 'zap' | 'code' | 'cloud' | 'git-branch';
}

export interface QuickStat {
  label: string;
  value: string;
  icon: 'award' | 'graduation-cap' | 'zap' | 'map-pin';
}

export interface ContactMethod {
  icon: 'mail' | 'github' | 'linkedin' | 'file-text';
  label: string;
  value: string;
  href: string;
  gradient: string;
  action: string;
}

export interface Section {
  id: string;
  label: string;
  icon: 'user' | 'graduation-cap' | 'briefcase' | 'code' | 'mail';
  color: string;
}

export interface GalleryPhoto {
  id: number;
  title: string;
  caption: string;
  src: string;
}
