export type Availability = 'Available' | 'Open to Opportunities' | 'Not Currently Available';
export type Profile = { headline: string; biography: string; primarySkill: string; availability: Availability; imageUri: string | null };
export type Project = { id: string; title: string; problem: string; contribution: string; technologies: string[]; description: string; learning: string };
export type EducationItem = { id: string; year: string; institution: string; programme: string; note: string };
export type RootTabParamList = { Home: undefined; Skills: undefined; Projects: undefined; Profile: undefined; About: undefined };
export type ProjectsStackParamList = {
  ProjectsList: undefined;
  ProjectDetails: { projectId: string };
  ProjectEditor: { projectId?: string } | undefined;
};
