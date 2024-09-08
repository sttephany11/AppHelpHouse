import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import styles from '../css/telaPerfilCss';

const telaPerfilScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [image, setImage] = useState<string | null>(null); // Imagem selecionada pelo usuário
  const [uploading, setUploading] = useState<boolean>(false); // Estado de carregamento
  const [imageUrl, setImageUrl] = useState<string | null>(null); // URL da imagem carregada no Firebase

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Armazena a URI da imagem local
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

      // Recuperar a URL da imagem após o upload
      const url = await getDownloadURL(storageRef);
      setImageUrl(url); // Atualiza o estado com a URL da imagem enviada

      setImage(null); // Limpa a seleção de imagem após o upload
      Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar a imagem:', error);
      Alert.alert('Erro', 'Falha ao enviar a imagem.');
    } finally {
      setUploading(false);
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
          <TouchableOpacity>
            {/* Exibe a URL da imagem carregada no Firebase ou a imagem padrão */}
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.imgPerfil} />
            ) : (
              <Image source={Imagens.perfil} style={styles.imgPerfil} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.nome}>Clodoaldo Oliveira</Text>
          <Text style={styles.textLocalizacao}>
            <Entypo name="location-pin" size={24} color="red" /> São Paulo, Guaianazes
          </Text>

          {/* Botão para selecionar uma nova imagem */}
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Escolher Imagem</Text>
          </TouchableOpacity>

          {/* Exibe a imagem selecionada e o botão para enviá-la */}
          {image && <Image source={{ uri: image }} style={styles.image} />}
          {image && (
            <TouchableOpacity onPress={uploadMedia} style={styles.button} disabled={uploading}>
              <Text style={styles.buttonText}>{uploading ? 'Enviando...' : 'Enviar Imagem'}</Text>
            </TouchableOpacity>
          )}

          
        </View>
      </View>
    </ImageBackground>
  );
};

export default telaPerfilScreen;
