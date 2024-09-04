import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button";
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';


import styles from '../css/homeCss';
const AreaAtuacao: React.FC<{ navigation: any }> = ({ navigation }) => {
    

    return (
        <ImageBackground
            source={Imagens.fundoBemVindo}
            style={styles.background}  // Define o estilo para a imagem de fundo
            resizeMode="cover"   // Ajusta a imagem para cobrir a tela
        >

    
            <View style={styles.container1}>
                <Text style={styles.boasVindas}>Boas vindas! </Text>

                <TouchableOpacity>
                <Image  style={styles.ImgPerfil} source={Imagens.perfil} />
                </TouchableOpacity>
            </View>


       
        </ImageBackground>
    );
};

export default AreaAtuacao;






