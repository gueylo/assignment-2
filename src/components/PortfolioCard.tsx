import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
export function PortfolioCard({ title, children }: PropsWithChildren<{ title?: string }>) {
  return <View style={styles.card}>{title ? <Text style={styles.title}>{title}</Text> : null}{children}</View>;
}
const styles = StyleSheet.create({ card: { backgroundColor: '#FFF', borderColor: '#D9E4E3', borderRadius: 16, borderWidth: 1, gap: 8, padding: 18 }, title: { color: '#17383A', fontSize: 19, fontWeight: '700' } });
