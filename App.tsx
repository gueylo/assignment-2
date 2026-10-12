import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PortfolioProvider } from './src/PortfolioContext';
import { AboutScreen } from './src/screens/AboutScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ProjectDetailsScreen } from './src/screens/ProjectDetailsScreen';
import { ProjectEditorScreen } from './src/screens/ProjectEditorScreen';
import { ProjectsScreen } from './src/screens/ProjectsScreen';
import { SkillsScreen } from './src/screens/SkillsScreen';
import { ProjectsStackParamList, RootTabParamList } from './src/types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const ProjectsStack = createNativeStackNavigator<ProjectsStackParamList>();

function ProjectsNavigator() {
  return (
    <ProjectsStack.Navigator screenOptions={{
      headerStyle: { backgroundColor: '#17383A' },
      headerTintColor: '#FFFFFF',
      headerTitleAlign: 'center',
      headerTitleStyle: { color: '#FFFFFF', fontWeight: '800' },
    }}>
      <ProjectsStack.Screen name="ProjectsList" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <ProjectsStack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project Details' }} />
      <ProjectsStack.Screen name="ProjectEditor" component={ProjectEditorScreen} options={({ route }) => ({ title: route.params?.projectId ? 'Edit Project' : 'Add Project' })} />
    </ProjectsStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PortfolioProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Tab.Navigator screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: '#17383A' },
            headerTintColor: '#FFFFFF',
            headerTitleAlign: 'center',
            headerTitleStyle: { color: '#FFFFFF', fontWeight: '800' },
            tabBarActiveTintColor: '#7DE2D1', tabBarInactiveTintColor: '#D3DEDD',
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
            tabBarStyle: { backgroundColor: '#17383A', borderTopColor: '#2D5557', minHeight: 64, paddingTop: 6, paddingBottom: 8 },
            tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 17 }}>{route.name.slice(0, 1)}</Text>,
          })}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Personal Profile',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#17383A' },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: { color: '#FFFFFF', fontWeight: '800' },
              }}
            />
            <Tab.Screen name="Skills" component={SkillsScreen} />
            <Tab.Screen name="Projects" component={ProjectsNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </PortfolioProvider>
    </SafeAreaProvider>
  );
}
