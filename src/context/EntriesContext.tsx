import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import {Entry} from '../types';
import {getEntries, saveEntry as saveEntryToStorage} from '../services/storageService';

interface EntriesContextType {
  entries: Entry[];
  addEntry: (entry: Entry) => Promise<void>;
  refreshEntries: () => Promise<void>;
  loading: boolean;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export const EntriesProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshEntries = async () => {
    setLoading(true);
    try {
      const loadedEntries = await getEntries();
      setEntries(loadedEntries);
    } catch (error) {
      console.error('Refresh Entries Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry: Entry) => {
    await saveEntryToStorage(entry);
    await refreshEntries();
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{entries, addEntry, refreshEntries, loading}}>
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error('useEntries must be used within EntriesProvider');
  }
  return context;
};
