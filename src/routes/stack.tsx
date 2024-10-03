// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas
import BemVindoScreen from '../views/bemVindo';
import CadastroScreen from '../views/cadastro';
import ConfirmedIdScreen from '../views/confirmeId';
import LoadingScreen from '../views/loading';
import LoginScreen from '../views/login'; 
import CadastroScreen2 from '../views/cadastro2';
import CadastroScreen3 from '../views/cadastro3';
import Home from '../views/home';
import TelaPerfilScreen from '../views/telaPerfil';
import PesquisarScreen from '../views/pesquisar';
import PerfilProfissionalScreen from '../views/perfilProfissional';
import { ImageProvider } from '../ImageContext';
import Profissionais from '../views/profissionais';
import PedidoScreen from '../views/PedidoScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente Tabs
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="perfil" component={TelaPerfilScreen} options={{ headerShown: false }} />


    </Tab.Navigator>
  );
};

// Navegador Principal
const AppNavigator = () => {
  return (
      <ImageProvider>
        <Stack.Navigator initialRouteName="bemvindo">
         <Stack.Screen name="pedidoScreen" component={PedidoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="bemvindo" component={BemVindoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="confirmeid" component={ConfirmedIdScreen} options={{ headerShown: false }} />
          <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="cadastro2" component={CadastroScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="homeStack" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="telaPerfil" component={TelaPerfilScreen} options={{ headerShown: false }} />
          <Stack.Screen name="pesquisar" component={PesquisarScreen} options={{ headerShown: false }} />
          <Stack.Screen name="profissionais" component={Profissionais} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ImageProvider>
  );
};

export default AppNavigator;
