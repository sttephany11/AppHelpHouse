import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground } from 'react-native';
import Imagens from "../../img/img";
import styles from '../css/loadingCss';


function Loading() {
 
  return (
    <ImageBackground 
      source={Imagens.fundoLoading}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}> AGORA MAIS</Text>
        <Text style={styles.title}> CLIENTES PERTO </Text>
        <Text style={styles.title}> DE <Text style={styles.voce}>VOCÊ.</Text></Text>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

export default Loading;
