// Central export file for all portfolio data
// Import all data from this single file in your components

export { personalInfo } from './personal';
export { education } from './education';
export { experience } from './experience';
export { projects, moreProjects } from './projects';
export { skillCategories } from './skills';
export {
  // quickStats,
  contactMethods,
  seekingOpportunities
} from './staticContent';

// You can also export types from here if needed
export type {
  PersonalInfo,
  Education,
  Experience,
  Project,
  CompactProject,
  SkillCategory,
  QuickStat,
  ContactMethod,
  Section
} from '@/types/portfolio';
