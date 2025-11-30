import axios from 'axios';
import {AnalysisResult} from '../types';

const HUGGING_FACE_API = 'https://router.huggingface.co/hf-inference/models/';
const SENTIMENT_MODEL = 'cardiffnlp/twitter-roberta-base-sentiment-latest';
// Token'ı .env dosyasından al veya direkt kullan
const HF_TOKEN = 'YOUR_HUGGING_FACE_TOKEN'; // Kendi token'ınızı buraya ekleyin

// Simple keyword-based sentiment analysis as fallback
const analyzeLocally = (text: string): 'positive' | 'neutral' | 'negative' => {
  const lowerText = text.toLowerCase();
  
  const positiveWords = ['mutlu', 'harika', 'güzel', 'iyi', 'süper', 'mükemmel', 'seviyorum', 'happy', 'great', 'good', 'love', 'amazing', 'wonderful', 'excited', 'motive', 'enerjik'];
  const negativeWords = ['üzgün', 'kötü', 'yorgun', 'stres', 'mutsuz', 'sad', 'bad', 'tired', 'stress', 'angry', 'hate', 'terrible', 'awful', 'depressed', 'anxious'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  try {
    // Try Hugging Face API first
    const response = await axios.post(
      `${HUGGING_FACE_API}${SENTIMENT_MODEL}`,
      {inputs: text},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HF_TOKEN}`,
        },
        timeout: 10000,
      },
    );

    const result = response.data[0];
    let positiveScore = 0;
    let negativeScore = 0;

    let neutralScore = 0;
    for (const item of result) {
      const label = item.label.toLowerCase();
      if (label === 'positive') positiveScore = item.score;
      else if (label === 'negative') negativeScore = item.score;
      else if (label === 'neutral') neutralScore = item.score;
    }

    let sentiment: 'positive' | 'neutral' | 'negative';
    let score: number;

    // Find highest score
    if (positiveScore >= negativeScore && positiveScore >= neutralScore) {
      sentiment = 'positive';
      score = positiveScore;
    } else if (negativeScore >= positiveScore && negativeScore >= neutralScore) {
      sentiment = 'negative';
      score = negativeScore;
    } else {
      sentiment = 'neutral';
      score = neutralScore;
    }

    return {sentiment, summary: generateSummary(sentiment), suggestion: generateSuggestion(sentiment), score};
  } catch {
    // Fallback to local analysis
    const sentiment = analyzeLocally(text);
    return {
      sentiment,
      summary: generateSummary(sentiment),
      suggestion: generateSuggestion(sentiment),
      score: 0.7,
    };
  }
};

const generateSummary = (sentiment: string): string => {
  const summaries = {
    positive: ['Bugün genel olarak olumlu bir gün geçirmişsin! 🌟', 'Harika bir enerji hissediyorsun! ✨', 'Bugün kendini iyi hissediyorsun! 😊'],
    neutral: ['Bugün normal bir gün geçiriyorsun. 😌', 'Duygusal olarak dengeli görünüyorsun. ⚖️', 'Bugün sakin bir gün. 🌤️'],
    negative: ['Bugün biraz zorlu bir gün geçiriyorsun. 💙', 'Kendini biraz yorgun hissediyorsun. 🌧️', 'Bugün duygusal olarak zorlayıcı. 💭'],
  };
  const options = summaries[sentiment as keyof typeof summaries];
  return options[Math.floor(Math.random() * options.length)];
};

const generateSuggestion = (sentiment: string): string => {
  const suggestions = {
    positive: ['Bu enerjiyi korumak için sevdiğin bir aktivite yapabilirsin! 🎨', 'Bugünkü motivasyonunu yarın için not alabilirsin. 📝', 'Bu güzel enerjiyi sevdiklerinle paylaşabilirsin! 💫'],
    neutral: ['Kendine 10 dakikalık bir mola verebilirsin. ☕', 'Kısa bir yürüyüş yapabilirsin. 🚶', 'Sevdiğin bir müzik dinleyebilirsin. 🎵'],
    negative: ['Derin nefes egzersizleri yapabilirsin. 🧘', 'Kendine nazik ol, bu da geçecek. 💚', 'Bir arkadaşınla konuşmak iyi gelebilir. 💬'],
  };
  const options = suggestions[sentiment as keyof typeof suggestions];
  return options[Math.floor(Math.random() * options.length)];
};
