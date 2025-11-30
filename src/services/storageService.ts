import AsyncStorage from '@react-native-async-storage/async-storage';
import {Entry} from '../types';

const STORAGE_KEY = '@ai_gunluk_entries';

export const saveEntry = async (entry: Entry): Promise<void> => {
  try {
    const entries = await getEntries();
    entries.unshift(entry);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Save Entry Error:', error);
    throw new Error('Kayıt sırasında bir hata oluştu.');
  }
};

export const getEntries = async (): Promise<Entry[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Get Entries Error:', error);
    return [];
  }
};

export const clearEntries = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Clear Entries Error:', error);
    throw new Error('Silme sırasında bir hata oluştu.');
  }
};
