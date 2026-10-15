// TypeScript interfaces for portfolio data structure

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  availability: string;       // full availability line, e.g. "Open to full-time roles from May 2027"
  availabilityShort: string;  // compact version for tight chrome (phone options bar)
  summary: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  period: string;
  courses: string[];
  current: boolean;
  gpa?: string;             // shown as a badge next to the degree
}

export interface Project {
  title: string;
  problem: string;
  solution: string;
  impact: string[];
  highlight: string;
  tech: string[];
  github: string;
  live?: string;            // optional live demo URL
  status?: string;          // optional badge, e.g. "In Progress", "Research"
  impactLabel?: string;     // overrides the impact-section heading (default "How It Works")
  highlightLabel?: string;  // overrides the highlight heading (default "The Results")
}

// Smaller work shown as compact rows under the featured case studies
export interface CompactProject {
  title: string;
  summary: string;
  tech: string[];
  github?: string;
  live?: string;
  status?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  solution: string;          // one-line summary of the role
  achievements: string[];
  tech: string[];
  link?: { label: string; href: string };
}

export interface SkillCategory {
  category: string;
  skills: string[];
  icon: 'zap' | 'code' | 'cloud' | 'database';
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
  location: string;
  src: string;
}
