import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {useEntries} from '../context/EntriesContext';
import EntryCard from '../components/EntryCard';

const HistoryScreen = () => {
  const {entries, loading} = useEntries();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (entries.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>📝</Text>
        <Text style={styles.emptySubtext}>
          Henüz kayıt yok. İlk günlük kaydını oluştur!
        </Text>
      </View>
    );
  }

  const positiveCount = entries.filter(e => e.sentiment === 'positive').length;
  const negativeCount = entries.filter(e => e.sentiment === 'negative').length;
  const neutralCount = entries.filter(e => e.sentiment === 'neutral').length;

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Haftalık Özet</Text>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>😊 {positiveCount}</Text>
          <Text style={styles.statItem}>😐 {neutralCount}</Text>
          <Text style={styles.statItem}>😔 {negativeCount}</Text>
        </View>
      </View>
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({item}) => <EntryCard entry={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    fontSize: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default HistoryScreen;
