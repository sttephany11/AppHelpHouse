import React, {useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground } from 'react-native';
import Imagens from "../../img/img";
import styles from '../css/loadingCss';




  function Loading({ navigation }) {
    useEffect(() => {
      // Define um temporizador para 4 segundos
      const timer = setTimeout(() => {
        // Navega para a tela de login após 4 segundos
        navigation.navigate('bemvindo');
      }, 2000);
  
      // Limpa o temporizador quando o componente for desmontado
      return () => clearTimeout(timer);
    }, [navigation]);
 
  return (
    <ImageBackground 
      source={Imagens.fundoLoading}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}> AGORA MAIS</Text>
        <Text style={styles.title}> PROFISSIONAIS PERTO </Text>
        <Text style={styles.title}> DE <Text style={styles.voce}>VOCÊ.</Text></Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

export default Loading;
