import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { defaultProfile, projects as defaultProjects } from './portfolioData';
import { clearProfile, loadProfile, loadProjects, saveProfile, saveProjects } from './storage';
import { Profile, Project } from './types';
type Value = { profile: Profile; projects: Project[]; isLoading: boolean; updateProfile: (profile: Profile) => Promise<void>; resetProfile: () => Promise<void>; upsertProject: (project: Project) => Promise<void>; deleteProject: (projectId: string) => Promise<void> };
const PortfolioContext = createContext<Value | undefined>(undefined);
export function PortfolioProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState(defaultProfile); const [projects, setProjects] = useState(defaultProjects); const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { Promise.all([loadProfile(), loadProjects()]).then(([storedProfile, storedProjects]) => { if (storedProfile) setProfile(storedProfile); if (storedProjects) setProjects(storedProjects); }).finally(() => setIsLoading(false)); }, []);
  async function updateProfile(next: Profile) { await saveProfile(next); setProfile(next); }
  async function resetProfile() { await clearProfile(); setProfile(defaultProfile); }
  async function upsertProject(project: Project) { const next = projects.some((item) => item.id === project.id) ? projects.map((item) => item.id === project.id ? project : item) : [...projects, project]; await saveProjects(next); setProjects(next); }
  async function deleteProject(projectId: string) { const next = projects.filter((item) => item.id !== projectId); await saveProjects(next); setProjects(next); }
  return <PortfolioContext.Provider value={{ profile, projects, isLoading, updateProfile, resetProfile, upsertProject, deleteProject }}>{children}</PortfolioContext.Provider>;
}
export function usePortfolio() { const value = useContext(PortfolioContext); if (!value) throw new Error('usePortfolio must be used inside PortfolioProvider'); return value; }
