import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {Entry} from '../types';
import {getSentimentColor, getSentimentEmoji, formatDate} from '../utils/helpers';

interface EntryCardProps {
  entry: Entry;
}

const EntryCard: React.FC<EntryCardProps> = ({entry}) => {
  const backgroundColor = getSentimentColor(entry.sentiment);
  const emoji = getSentimentEmoji(entry.sentiment);

  return (
    <Card style={[styles.card, {backgroundColor}]}>
      <Card.Content>
        <View style={styles.header}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.date}>{formatDate(entry.date)}</Text>
        </View>
        <Text style={styles.text}>{entry.text}</Text>
        <Text style={styles.summary}>{entry.summary}</Text>
        <Text style={styles.suggestion}>{entry.suggestion}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  summary: {
    fontSize: 14,
    marginBottom: 4,
    fontStyle: 'italic',
  },
  suggestion: {
    fontSize: 14,
    color: '#555',
  },
});

export default EntryCard;
