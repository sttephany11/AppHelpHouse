import React from 'react';
import { Text, View, ImageBackground,Image,TouchableOpacity } from 'react-native';
import Imagens from "../../img/img";
import styles from '../css/MeusPedidosCss';
import AntDesign from '@expo/vector-icons/AntDesign';

 function MeusPedidos({navigation}) {

  const voltarHome = () => {
    navigation.navigate('homeStack'); // Nome correto da tela
  };

  return (
    <ImageBackground 
      source={Imagens.fundoBemVindo}
      style={styles.background} 
      resizeMode="cover"  
    >
  
  <View style={styles.navContent}>
          <View style={styles.navbar}>
          <TouchableOpacity>
          <AntDesign name="leftcircle" size={30} color="#fff" style={{ marginLeft: 15 }} onPress={voltarHome} />
          </TouchableOpacity>

            <Text style={styles.textNav}>Meus Pedidos</Text>
          </View>
          <View style={styles.tabs}>
          <Text style={styles.tab}>Agendados</Text>
         
        </View>
        </View>

    <View style={styles.containerPedidos}>

    </View>

      
   
    </ImageBackground>
  );
};


export default MeusPedidos;