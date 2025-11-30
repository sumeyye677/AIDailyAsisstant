import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import {EntriesProvider} from './src/context/EntriesContext';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <PaperProvider>
      <EntriesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#6200ee',
              tabBarInactiveTintColor: '#666',
            }}>
            <Tab.Screen
              name="Günlük"
              component={HomeScreen}
              options={{
                tabBarIcon: () => <Text style={{fontSize: 20}}>✍️</Text>,
                headerTitle: 'AI Günlük Asistanım',
              }}
            />
            <Tab.Screen
              name="Geçmiş"
              component={HistoryScreen}
              options={{
                tabBarIcon: () => <Text style={{fontSize: 20}}>📚</Text>,
                headerTitle: 'Geçmiş Kayıtlar',
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </EntriesProvider>
    </PaperProvider>
  );
};

export default App;
