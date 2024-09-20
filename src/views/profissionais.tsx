import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from '../css/profissionaisCss';
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';



const Profissionais: React.FC<{ navigation: any, route: any }> = ({ route }) => {

  const { valor1, valor2} = route.params || {}; //rota para trazer os valores

    return (
      <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
    
      <View style={styles.fundoBranco}>
      <View style={styles.inputContainer}>
        <AntDesign name="leftcircle" size={24} color="white" style={styles.searchIcon} />
        <Text style={styles.input}>{valor1}  -   {valor2}</Text>
      </View>

      <View style={styles.containerProfissionais}>
     
     </View>

     <View style={styles.margin}></View>

     <View style={styles.containerProfissionais}>
    
     </View>







      </View>
    </ImageBackground>
    );
};

export default Profissionais;
