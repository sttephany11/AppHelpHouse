import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Imagens from "../../img/img";


const ProfilePhotoChanger = ({navigation}) => {
  const [photo, setPhoto] = useState(null);

const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 1,
    });

  };

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
      <TouchableOpacity>
      <Image source={Imagens.fundoBemVindo} style={styles.photo} onPress={handleChoosePhoto} />
        </TouchableOpacity>

 
</View>
</View>
);
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212', // Cor de fundo 
      justifyContent: 'center',
      alignItems: 'center',
    },

      
    photoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop:60,
    },
    photo: {
      width: 200,
      height: 200,
      borderRadius: 100, // Foto redonda
    },
    
    });
    
    export default ProfilePhotoChanger;  
        