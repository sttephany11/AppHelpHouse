import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import * as ImagePicker from 'expo-image-picker';
import Imagens from '../../img/img';
import styles from '../css/cadastro3Css';
import Entypo from '@expo/vector-icons/Entypo';

const CadastroScreen3: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { nomeContratante, cpfContratante, telefoneContratante, nascContratante } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailContratante, setEmailContratante] = useState('');

    const dadosCli = () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }
        
        navigation.navigate('cadastro2', {
            emailContratante: emailContratante,
            password: password,
            nomeContratante: nomeContratante,
            cpfContratante: cpfContratante,
            telefoneContratante: telefoneContratante,
            nascContratante: nascContratante, 
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.fundo}>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Últimos <Text style={styles.passos}> passos</Text></Text>
                        <Text style={styles.subtitulo}> Adicione seu email e uma foto de perfil</Text>
                    </View>

                    <View style={styles.containerPerfil}>
                        <TouchableOpacity>
                            <Image source={Imagens.perfil} style={styles.photo} />
                            <View style={styles.cameraIcon}>
                                <TouchableOpacity>
                                    <Entypo name="camera" size={26} color="white" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.title3}> Email</Text>
                        <TextInput 
                            placeholder="Digite um email..."
                            value={emailContratante}
                            onChangeText={value => setEmailContratante(value)}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}> Senha</Text>
                        <TextInput 
                            placeholder="Sua senha..."
                            value={password}
                            onChangeText={value => setPassword(value)}
                            style={styles.input3}
                            secureTextEntry={true} // Oculta o texto para a senha
                        />

                        <Text style={styles.title3}> Confirmar Senha</Text>
                        <TextInput 
                            placeholder="Confirme sua senha..."
                            value={confirmPassword}
                            onChangeText={value => setConfirmPassword(value)}
                            style={styles.input3}
                            secureTextEntry={true} 
                        />

                        <TouchableOpacity style={styles.button2} onPress={dadosCli}>
                            <Text style={styles.buttonText2}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CadastroScreen3;
