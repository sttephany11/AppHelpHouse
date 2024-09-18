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
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const { imageUrl, setImageUrl } = useImage();
  const { userData } = useUser(); // Altere para userData

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    if (!image) {
      Alert.alert('Erro', 'Nenhuma imagem selecionada.');
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const storageRef = ref(storage, `images/${filename}`);

      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url); // Atualiza a URL da imagem no contexto
      setImage(null);
      Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
      Alert.alert('Erro', 'Falha ao enviar a imagem.');
    } finally {
      setUploading(false);
    }
  };

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
            <Image source={Imagens.perfil} style={styles.imgPerfil} />
          )}

          <View style={styles.cameraIcon}>
            <TouchableOpacity onPress={pickImage}>
              <Entypo name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          {/* Exibindo as informações do usuário */}
          <Text style={styles.nome}>
            {userData ? userData.nomeContratante : 'Nome não disponível'}
          </Text>
          <Text style={styles.textLocalizacao}>
            <Entypo name="location-pin" size={24} color="red" /> 
            {userData && userData.bairroContratante ? userData.bairroContratante : 'Localização não disponível'}
          </Text>

          {image && <Image source={{ uri: image }} style={styles.image} />}
          {image && (
            <TouchableOpacity onPress={uploadMedia} style={styles.button} disabled={uploading}>
              <Text style={styles.buttonText}>{uploading ? 'Enviando...' : 'Enviar Imagem'}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={goToOutraTela} style={styles.button}>
            <Text style={styles.buttonText}>Ir para Perfil Profissional</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TelaPerfilScreen;
