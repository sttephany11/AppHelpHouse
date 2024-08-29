// Importes
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas
import BemVindoScreen from '../views/bemVindo';
import CadastroScreen from '../views/cadastro';
import ConfirmedIdScreen from '../views/confirmeId';
import LoadingScreen from '../views/loading';
import LoginScreen from '../views/login'; // Renomeado para seguir a convenção
import CadastroScreen2 from '../views/cadastro2';
import CadastroScreen3 from '../views/cadastro3';
import HomeScreen from '../views/home';
import PesquisarScreen from '../views/pesquisar';
import consultaScreen from '../views/consulta';
import insertScreen from '../views/insert'; 
import { isNewExpression } from 'typescript';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente Tabs
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen}   options={{ headerShown: false }} />
      <Tab.Screen name="pesquisar" component={PesquisarScreen}   options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

// Navegador Principal
const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="homeStack">
        <Stack.Screen name="bemvindo" component={BemVindoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" component={CadastroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="confirmeid" component={ConfirmedIdScreen} options={{ headerShown: false }} />
        <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="cadastro2" component={CadastroScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="cadastro3" component={CadastroScreen3} options={{ headerShown: false }} />
        <Stack.Screen name="homeStack" component={Tabs} options={{ headerShown: false }} />
     
      </Stack.Navigator>
  );
};

export default AppNavigator;
