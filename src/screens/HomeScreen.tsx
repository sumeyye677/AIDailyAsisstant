import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {TextInput, Button, Card, Text, ActivityIndicator} from 'react-native-paper';
import {analyzeText} from '../services/aiService';
import {useEntries} from '../context/EntriesContext';
import {Entry} from '../types';
import {getSentimentColor, getSentimentEmoji} from '../utils/helpers';

const HomeScreen = () => {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Entry | null>(null);
  const {addEntry} = useEntries();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir metin girin.');
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const analysis = await analyzeText(text);
      const entry: Entry = {
        id: Date.now().toString(),
        text: text.trim(),
        sentiment: analysis.sentiment,
        summary: analysis.summary,
        suggestion: analysis.suggestion,
        score: analysis.score,
        date: new Date().toISOString(),
      };

      await addEntry(entry);
      setResult(entry);
      setText('');
      Alert.alert('Başarılı', 'Analiz tamamlandı ve kaydedildi!');
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Bir hata oluştu.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bugün Nasıl Hissediyorsun?</Text>
        <TextInput
          mode="outlined"
          label="Duygularını yaz..."
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
          style={styles.input}
          disabled={analyzing}
        />
        <Button
          mode="contained"
          onPress={handleAnalyze}
          loading={analyzing}
          disabled={analyzing}
          style={styles.button}>
          {analyzing ? 'Analiz Ediliyor...' : 'Analiz Et'}
        </Button>

        {analyzing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200ee" />
            <Text style={styles.loadingText}>AI analiz yapıyor...</Text>
          </View>
        )}

        {result && (
          <Card
            style={[
              styles.resultCard,
              {backgroundColor: getSentimentColor(result.sentiment)},
            ]}>
            <Card.Content>
              <Text style={styles.resultEmoji}>
                {getSentimentEmoji(result.sentiment)}
              </Text>
              <Text style={styles.resultTitle}>Analiz Sonucu</Text>
              <Text style={styles.resultText}>{result.summary}</Text>
              <Text style={styles.resultSuggestion}>{result.suggestion}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  resultCard: {
    marginTop: 16,
    elevation: 4,
  },
  resultEmoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  resultSuggestion: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
