import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentProps, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '../components/Screen';
import { usePortfolio } from '../PortfolioContext';
import { Project, ProjectsStackParamList } from '../types';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectEditor'>;
type Form = Omit<Project, 'technologies'> & { technologies: string };
type Field = keyof Omit<Form, 'id'>;
type Errors = Partial<Record<Field, string>>;

const emptyForm: Form = { id: '', title: '', problem: '', contribution: '', technologies: '', description: '', learning: '' };

export function ProjectEditorScreen({ navigation, route }: Props) {
  const { projects, upsertProject, deleteProject } = usePortfolio();
  const existing = projects.find((project) => project.id === route.params?.projectId);
  const [form, setForm] = useState<Form>(existing ? { ...existing, technologies: existing.technologies.join(', ') } : emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  function setField(field: Field, value: string) { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })); }
  function validate() {
    const next: Errors = {};
    if (form.title.trim().length < 3) next.title = 'Enter a project title of at least 3 characters.';
    if (form.problem.trim().length < 10) next.problem = 'Explain the problem in at least 10 characters.';
    if (form.contribution.trim().length < 10) next.contribution = 'Explain your contribution in at least 10 characters.';
    if (!form.technologies.trim()) next.technologies = 'Add at least one technology.';
    if (form.description.trim().length < 10) next.description = 'Add a description of at least 10 characters.';
    if (form.learning.trim().length < 5) next.learning = 'Briefly explain what you learned.';
    setErrors(next); return Object.keys(next).length === 0;
  }
  async function save() {
    if (!validate()) return;
    const project: Project = { id: existing?.id ?? `project-${Date.now()}`, title: form.title.trim(), problem: form.problem.trim(), contribution: form.contribution.trim(), technologies: form.technologies.split(',').map((item) => item.trim()).filter(Boolean), description: form.description.trim(), learning: form.learning.trim() };
    try { setSaving(true); await upsertProject(project); navigation.replace('ProjectDetails', { projectId: project.id }); } catch { Alert.alert('Could not save project', 'Please try again.'); } finally { setSaving(false); }
  }
  function confirmDelete() {
    if (!existing) return;
    Alert.alert('Delete project?', 'This project will be removed from this device.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: async () => { try { await deleteProject(existing.id); navigation.popTo('ProjectsList'); } catch { Alert.alert('Could not delete project', 'Please try again.'); } } }]);
  }

  return <Screen>
    <Text style={s.heading}>{existing ? 'Edit project' : 'Add a genuine project'}</Text>
    <Field label="Title" value={form.title} error={errors.title} onChangeText={(value) => setField('title', value)} />
    <Field label="Problem addressed" value={form.problem} error={errors.problem} onChangeText={(value) => setField('problem', value)} multiline />
    <Field label="My contribution" value={form.contribution} error={errors.contribution} onChangeText={(value) => setField('contribution', value)} multiline />
    <Field label="Technologies (separate with commas)" value={form.technologies} error={errors.technologies} onChangeText={(value) => setField('technologies', value)} />
    <Field label="Short description" value={form.description} error={errors.description} onChangeText={(value) => setField('description', value)} multiline />
    <Field label="What I learned" value={form.learning} error={errors.learning} onChangeText={(value) => setField('learning', value)} multiline />
    <Pressable accessibilityRole="button" disabled={saving} style={[s.save, saving && s.disabled]} onPress={save}><Text style={s.saveText}>{saving ? 'Saving…' : 'Save project'}</Text></Pressable>
    {existing ? <Pressable accessibilityRole="button" style={s.deleteButton} onPress={confirmDelete}><Text style={s.deleteText}>Delete project</Text></Pressable> : null}
  </Screen>;
}

function Field({ label, error, ...props }: { label: string; error?: string } & ComponentProps<typeof TextInput>) {
  return <View style={s.field}><Text style={s.label}>{label}</Text><TextInput style={[s.input, props.multiline && s.multiline, error && s.inputError]} placeholderTextColor="#758385" {...props} />{error ? <Text style={s.error}>{error}</Text> : null}</View>;
}
const s = StyleSheet.create({ heading: { color: '#17383A', fontSize: 28, fontWeight: '800' }, field: { gap: 7 }, label: { color: '#17383A', fontSize: 16, fontWeight: '700' }, input: { backgroundColor: '#FFF', borderColor: '#B8C9C7', borderRadius: 10, borderWidth: 1, color: '#17383A', fontSize: 16, minHeight: 50, paddingHorizontal: 14, paddingVertical: 12 }, multiline: { minHeight: 100, textAlignVertical: 'top' }, inputError: { borderColor: '#B3261E', borderWidth: 2 }, error: { color: '#B3261E', fontSize: 14 }, save: { alignItems: 'center', backgroundColor: '#0B6E69', borderRadius: 10, justifyContent: 'center', minHeight: 52 }, saveText: { color: '#FFF', fontSize: 17, fontWeight: '700' }, disabled: { opacity: 0.6 }, deleteButton: { alignItems: 'center', justifyContent: 'center', minHeight: 48 }, deleteText: { color: '#A13D3D', fontSize: 16, fontWeight: '700' } });
