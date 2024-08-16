import React, { useState } from 'react';
import { View, Text ,TouchableOpacity, Alert,Image} from 'react-native';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import * as ImagePicker from 'expo-image-picker';
import {ImageLibraryOptions,  launchImageLibrary} from 'react-native-image-picker';
import Imagens from '../../img/img';
import styles from '../css/cadastro3Css';


const CadastroScreen3: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [Cep, setCep] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Rua, setRua] = useState('');
    const [Numero, setNumero] = useState('');
    const [Complemento, setComplemento] = useState('');

    return(
        <View style={styles.container}>
         
         <View style={styles.containerPerfil}>
                   
                   <TouchableOpacity>
                   <Image source={Imagens.perfil} style={styles.photo}  />
                   </TouchableOpacity>
   
                   <TouchableOpacity style={styles.button} >
                   <Text style={styles.buttonText}>Adicione uma foto de perfil</Text>
                   </TouchableOpacity>
                   </View>
   

                   <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('cadastro3')}>
                <Text style={styles.buttonText2}>Próximo</Text>
                </TouchableOpacity>

                    </View>
             
            );
        };

export default CadastroScreen3;
