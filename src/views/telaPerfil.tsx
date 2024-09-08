import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";


import styles from '../css/telaPerfilCss';
const telaPerfilScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
       
    return (
        <ImageBackground 
          source={Imagens.fundoBemVindo}
          style={styles.background}  // Define o estilo para a imagem de fundo
          resizeMode="cover"  // Ajusta a imagem para cobrir a tela
        >

    
        <View style={styles.fundoBranco}>
        <View style={styles.container}>
        <TouchableOpacity ><Image source={Imagens.perfil} style={styles.imgPerfil}/></TouchableOpacity>
        </View>

        <View style={styles.container}>
        <Text style={styles.nome}> Clodoaldo Oliveira</Text>
        <Text style={styles.textLocalizacao} ><Entypo name="location-pin" size={24} color="red" /> São Paulo, Guaianazes</Text>

        <Text style={styles.maisProcurados}> Mais procurados por clodoaldo </Text>
        </View>

  
   

        </View>
        
        </ImageBackground>
      );
};

export default telaPerfilScreen;






