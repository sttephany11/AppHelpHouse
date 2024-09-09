import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './stack'; 
import { ImageProvider } from '../ImageContext'; 

export default function App() {
  return (
    <NavigationContainer>
      <ImageProvider>
        <AppNavigator />
      </ImageProvider>
    </NavigationContainer>
  );
}
