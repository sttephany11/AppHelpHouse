// AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Imagens from "../../img/img";

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
import PerfilProfissionalScreen from '../views/perfilProfissional';
import { ImageProvider } from '../ImageContext';
import Profissionais from '../views/profissionais';
import PedidoScreen from '../views/PedidoScreen';
import { Image } from 'react-native';
import List from '../functions/testeGet';
import MeusPedidos from '../views/MeusPedidos';
import Chat from '../views/Chat';
import Configuracao from '../views/configuracao';
import MeusContratos from '../views/meusContratos';
import MeuHistorico from '../views/meuHistorico';
import Suporte from '../views/suporte';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente Tabs
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#e9e9e7',
          height: 80,
        },
        tabBarShowLabel: false,  // Oculta os rótulos das abas
      }}
    >
      <Tab.Screen
        name="HomeScreen" 
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => ( // esse focused está importada para não aparecer o titulo
            <Image 
              source={Imagens.iconTab} 
              style={{
                width: 44, 
                height: 44,
              
              }} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="meusPedidos"
        component={MeusPedidos}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image 
              source={Imagens.iconTeste2} 
              style={{
                width: 32, 
                height: 48, 
               top:5
              }} 
            />
          ),
        }}
      />
       <Tab.Screen 
        name="perfil" 
        component={TelaPerfilScreen} 
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={Imagens.iconTab2} style={{ width: 42, height: 40 }} />
          ),
        }} 
      />

    </Tab.Navigator>
  );
};

// Navegador Principal
const AppNavigator = () => {
  return (
      <ImageProvider>
        <Stack.Navigator initialRouteName="bemvindo">
        <Stack.Screen name="List" component={List} options={{ headerShown: false }} />
         <Stack.Screen name="pedidoScreen" component={PedidoScreen} options={{ headerShown: false }} />
         <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
          <Stack.Screen name="bemvindo" component={BemVindoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="confirmeid" component={ConfirmedIdScreen} options={{ headerShown: false }} />
          <Stack.Screen name="loading" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="cadastro2" component={CadastroScreen2} options={{ headerShown: false }} />
          <Stack.Screen name="cadastro3" component={CadastroScreen3} options={{ headerShown: false }} />
          <Stack.Screen name="homeStack" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="telaPerfil" component={TelaPerfilScreen} options={{ headerShown: false }} />
          <Stack.Screen name="profissionais" component={Profissionais} options={{ headerShown: false }} />
          <Stack.Screen name="meusPedidos" component={MeusPedidos} options={{ headerShown: false }} />
          <Stack.Screen name="perfilProfissional" component={PerfilProfissionalScreen} options={{ headerShown: false }} />
          <Stack.Screen name="configuracao" component={Configuracao} options={{ headerShown: false }} />
          <Stack.Screen name="meusContratos" component={MeusContratos} options={{ headerShown: false }} />
          <Stack.Screen name="meuHistorico" component={MeuHistorico} options={{ headerShown: false }} />
          <Stack.Screen name="suporte" component={Suporte} options={{ headerShown: false }} />


        </Stack.Navigator>
      </ImageProvider>
  );
};

export default AppNavigator;
