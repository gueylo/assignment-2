import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile, Project } from './types';
const PROFILE_KEY = 'kgportfolio_profile';
const PROJECTS_KEY = 'kgportfolio_projects';
export async function loadProfile(): Promise<Profile | null> {
  const saved = await AsyncStorage.getItem(PROFILE_KEY);
  if (!saved) return null;
  try { return JSON.parse(saved) as Profile; } catch { await AsyncStorage.removeItem(PROFILE_KEY); return null; }
}
export async function saveProfile(profile: Profile) { await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); }
export async function clearProfile() { await AsyncStorage.removeItem(PROFILE_KEY); }
export async function loadProjects(): Promise<Project[] | null> {
  const saved = await AsyncStorage.getItem(PROJECTS_KEY);
  if (!saved) return null;
  try { return JSON.parse(saved) as Project[]; } catch { await AsyncStorage.removeItem(PROJECTS_KEY); return null; }
}
export async function saveProjects(projects: Project[]) { await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(projects)); }
