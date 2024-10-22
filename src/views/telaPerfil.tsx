import React, { useState, useContext } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";
import styles from '../css/telaPerfilCss';
import { useImage } from '../ImageContext'; // Ajuste o caminho conforme necessário
import { useUser } from '../cliContext';
import myContext from '../functions/authContext';
const TelaPerfilScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { imageUrl } = useImage();
  const { userData } = useUser(); // Altere para userData
  const { user } = useContext(myContext);

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
            {user ? user.nomeContratante : 'Nome não disponível'}
          </Text>
          <Text style={styles.textEmail}>
          {user ? user.emailContratante : 'Email não disponível'}
          </Text>
          <Text style={styles.textLocalizacao}>
            <Entypo name="location-pin" size={24} color="red" /> 
            {user ? user.bairroContratante : 'Localização não disponível'}
          </Text>

        </View>
      </View>
    </ImageBackground>
  );
};

export default TelaPerfilScreen;
