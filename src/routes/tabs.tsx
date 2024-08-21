import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loading from '../views/loading';
import BemVindo from '../views/bemVindo';
import login from '../views/login';
import ConfirmedId from '../views/confirmeId'
import cadastro from '../views/cadastro'
import { NavigationContainer } from '@react-navigation/native';
import CadastroScreen3 from '../views/cadastro3';
import CadastroScreen2 from '../views/cadastro2';
import Home from '../views/home';
import Pesquisar from '../views/pesquisar';




const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen 
        name="Loading" 
        component={Loading} 
        options={{headerShown:false}} 
        />
        <Tab.Screen 
        name="bemVindo" 
        component={BemVindo} 
        options={{headerShown:false}} 
        />
         <Tab.Screen 
        name="Login" 
        component={login} 
        options={{headerShown:false}} 
        />
         <Tab.Screen 
        name="confirme" 
        component={ConfirmedId} 
        options={{headerShown:false}} 
        />
         <Tab.Screen 
        name="Cadastro" 
        component={cadastro} 
        options={{headerShown:false}} 
        />
         <Tab.Screen 
        name="Cadastro2" 
        component={CadastroScreen2} 
        options={{headerShown:false}} 
        />
           <Tab.Screen 
        name="Cadastro3" 
        component={CadastroScreen3} 
        options={{headerShown:false}} 
        />
        <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{headerShown:false}} 
        />
        <Tab.Screen 
        name="Pesquisar" 
        component={Pesquisar} 
        options={{headerShown:false}} 
        />
        
      </Tab.Navigator>

    );
  };
  
  export default Tabs;


