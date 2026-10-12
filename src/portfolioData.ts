import { EducationItem, Profile, Project } from './types';

// TODO: Replace every clearly marked value below with KAWAYA GUEYLORD's genuine data.
export const defaultProfile: Profile = {
  headline: 'TODO: Add your professional headline',
  biography: 'TODO: Add a genuine short biography of at least twenty characters.',
  primarySkill: 'TODO: Add your primary skill',
  availability: 'Open to Opportunities', imageUri: null,
};
export const skills = ['Mobile App Developer', 'Full Stack Web Developer', 'Video Editor', 'Graphic Designer', 'TODO: Add one more genuine skill'];
export const education: EducationItem[] = [
  { id: 'education-1', year: 'TODO', institution: 'TODO: Institution', programme: 'TODO: Programme or course', note: 'TODO: Short note' },
  { id: 'education-2', year: 'TODO', institution: 'TODO: Institution', programme: 'TODO: Programme or course', note: 'TODO: Short note' },
];
export const projects: Project[] = [
  { id: 'project-1', title: 'TODO: Genuine student project 1', problem: 'TODO: Explain the genuine problem this project addressed.', contribution: 'TODO: Explain your personal contribution.', technologies: ['TODO: Technology used'], description: 'TODO: Add a short, accurate project description.', learning: 'TODO: State what you learned.' },
  { id: 'project-2', title: 'TODO: Genuine student project 2', problem: 'TODO: Explain the genuine problem this project addressed.', contribution: 'TODO: Explain your personal contribution.', technologies: ['TODO: Technology used'], description: 'TODO: Add a short, accurate project description.', learning: 'TODO: State what you learned.' },
];
export const identity = { name: 'KAWAYA GUEYLORD', registrationNumber: '25/27953', verificationCode: 'MOB-A2-25/27953', appName: 'KGPortfolio', version: '1.0.0' };
