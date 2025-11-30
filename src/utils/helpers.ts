export const getSentimentColor = (sentiment: string): string => {
  switch (sentiment) {
    case 'positive':
      return '#FFD700';
    case 'negative':
      return '#B0B0B0';
    case 'neutral':
      return '#87CEEB';
    default:
      return '#FFFFFF';
  }
};

export const getSentimentEmoji = (sentiment: string): string => {
  switch (sentiment) {
    case 'positive':
      return '😊';
    case 'negative':
      return '😔';
    case 'neutral':
      return '😐';
    default:
      return '🤔';
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Bugün';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Dün';
  } else {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
};
