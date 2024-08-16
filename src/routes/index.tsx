import { NavigationContainer } from "@react-navigation/native";
import TabRoutes from './tabs'
import {View, Text, StyleSheet} from "react-native";
import AppNavigator from "./stack";


export default function  App(){
  return (

    <NavigationContainer>
    <AppNavigator />
    </NavigationContainer>
    
    );
}
