import React, { useState } from 'react';
import { View, Text ,TouchableOpacity, Alert,Image,ScrollView} from 'react-native';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import * as ImagePicker from 'expo-image-picker';
import Imagens from '../../img/img';
import styles from '../css/cadastro3Css';


    const CadastroScreen3: React.FC<{ navigation: any }> = ({ navigation }) => {
        const [Cep, setCep] = useState('');
        const [Bairro, setBairro] = useState('');



    return(
        <View style={styles.container}>
          <ScrollView>
         <View style={styles.containerPerfil}>
                   
                   <TouchableOpacity>
                   <Image source={Imagens.perfil} style={styles.photo}  />
                   </TouchableOpacity>
   
                   <TouchableOpacity style={styles.button} >
                   <Text style={styles.buttonText}>Adicione uma foto de perfil</Text>
                   </TouchableOpacity>
                   </View>
   

                   <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('homeStack')}>
                <Text style={styles.buttonText2}>Próximo</Text>
                </TouchableOpacity>

                </ScrollView>
                    </View>
             
            );
    }

export default CadastroScreen3;
