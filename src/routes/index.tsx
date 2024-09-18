import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './stack'; 
import { ImageProvider } from '../ImageContext';
import { UserProvider } from '../cliContext';

export default function App() {
  return (
    <NavigationContainer>
      <ImageProvider>
        <UserProvider>
          <AppNavigator />
        </UserProvider>
      </ImageProvider>
    </NavigationContainer>
  );
}
