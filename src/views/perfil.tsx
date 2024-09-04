import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import styles from '../css/perfilCss';
import axios from 'axios';

function Perfil({ navigation }: { navigation: any }) {
  const [fotoPerfil, setFotoPerfil] =  useState<string | null>(null);

  const dadosCli = () => {
    navigation.navigate('cadastro',{
       fotoPerfil:fotoPerfil,
    });
          
}

  const selectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões para acessar a galeria!');
      return;
    }
    else{
    const  result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64:false,
      aspect: [4,4],
      quality: 1
    }); 
  

    if (result.canceled) {
      ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT)
    }else{
      const filename = result.assets[0].uri.substring
      (
       result.assets[0].uri.lastIndexOf('/') + 1,
       result.assets[0].uri.length
      );
      const formData = new FormData();
      formData.append('file', JSON.parse(JSON.stringify({
          name: filename,
          uri: result.assets[0].uri,
          type: 'image/' + filename.split('.')[1]
      })));

      try{
        const cpp = await axios.post('http://127.0.0.1:8000/api/fotoPerfil',
          formData, 
          {
            headers:
            {
              Accept:'application/json',
              'Contente-Type':'multipart/form-data',
            },
          }
        );
        if(cpp.data.erro){
          Alert.alert('Erro', 'Não foi possovel enviar sua imagem. por favor, tente novamente.')
        }else{
          Alert.alert('Sucesso', 'foi possovel enviar sua imagem')
          const response = await fetch('http://127.0.0.1:8000/api/fotoPerfilGet');
          const jsno = await response.json();
          setFotoPerfil(jsno)
          
        }
      }catch{

      }
    }
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SEJA <Text style={styles.voce}>BEM-VINDO</Text></Text>

      {fotoPerfil && (
        <Image
          source={{ uri: fotoPerfil }}
          style={styles.image}
        />
      )}

      <TouchableOpacity style={styles.button2} onPress={selectPhoto}>
        <Text style={styles.buttonText2}>Selecionar Foto</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.button2} onPress={() => {
        dadosCli();}}>
        <Text style={styles.buttonText2}>Continuar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View> 
  );
}


export default Perfil;
