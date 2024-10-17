import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import styles from '../css/telaPerfilCss';
import { useImage } from '../ImageContext'; // Ajuste o caminho conforme necessário
import { useUser } from '../cliContext';

const TelaPerfilScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { imageUrl } = useImage();
  const { userData } = useUser(); // Altere para userData

  const goToOutraTela = () => {
    if (imageUrl) {
      navigation.navigate('perfilProfissional'); // Navegar para a tela desejada
    } else {
      Alert.alert('Erro', 'Nenhuma imagem para exibir.');
    }
  };

  return (
    <ImageBackground 
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.fundoBranco}>
        <View style={styles.container}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.imgPerfil} />
          ) : (
            <Image source={Imagens.perfilUsuario} style={styles.imgPerfil} />
          )}

          <View style={styles.cameraIcon}>
            <TouchableOpacity>
              <Entypo name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          {/* Exibindo as informações do usuário */}
          <Text style={styles.nome}>
            {userData ? userData.nomeContratante : 'Nome não disponível'}
          </Text>
          <Text style={styles.textEmail}>
          {userData && userData.emailContratante ? userData.emailContratante : 'Email não disponível'}
          </Text>
          <Text style={styles.textLocalizacao}>
            <Entypo name="location-pin" size={24} color="red" /> 
            {userData && userData.bairroContratante ? userData.bairroContratante : 'Localização não disponível'}
          </Text>

        </View>
      </View>
    </ImageBackground>
  );
};

export default TelaPerfilScreen;
