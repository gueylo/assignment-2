import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { PortfolioCard } from '../components/PortfolioCard';
import { Screen } from '../components/Screen';
import { usePortfolio } from '../PortfolioContext';
import { identity } from '../portfolioData';
export function HomeScreen() {
  const { profile, isLoading } = usePortfolio();
  return <Screen>
    <Text style={s.identity}>My name is KAWAYA GUEYLORD.</Text>
    {isLoading ? <ActivityIndicator color="#0B6E69" accessibilityLabel="Loading saved profile" /> : null}
    <View style={s.hero}>{profile.imageUri ? <Image source={{ uri: profile.imageUri }} style={s.avatar} accessibilityLabel={`${identity.name}'s profile`} /> : <View style={s.placeholder} accessibilityLabel="Profile image placeholder"><Text style={s.initials}>KG</Text></View>}<View style={s.heroText}><Text style={s.headline}>{profile.headline}</Text><Text style={s.availability}>{profile.availability}</Text></View></View>
    <PortfolioCard title="About me"><Text style={s.body}>{profile.biography}</Text></PortfolioCard>
    <PortfolioCard title="Primary skill"><Text style={s.body}>{profile.primarySkill}</Text></PortfolioCard>
    <Text style={s.code}>Verification: {identity.verificationCode}</Text>
  </Screen>;
}
const s = StyleSheet.create({ identity: { color: '#17383A', fontSize: 28, fontWeight: '800', lineHeight: 35 }, hero: { alignItems: 'center', flexDirection: 'row', gap: 16 }, heroText: { flex: 1, gap: 7 }, avatar: { borderRadius: 42, height: 84, width: 84 }, placeholder: { alignItems: 'center', backgroundColor: '#CBE7E3', borderRadius: 42, height: 84, justifyContent: 'center', width: 84 }, initials: { color: '#0B5451', fontSize: 26, fontWeight: '800' }, headline: { color: '#17383A', fontSize: 20, fontWeight: '700' }, availability: { color: '#0B6E69', fontSize: 15, fontWeight: '600' }, body: { color: '#3B4D4E', fontSize: 16, lineHeight: 24 }, code: { color: '#637274', fontSize: 14, textAlign: 'center' } });
