import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./stack";
import React from 'react';




export default function  App(){
  return (

    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    
    );
}
