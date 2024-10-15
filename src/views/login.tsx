import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import Imagens from "../../img/img";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/loginCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenar o token


const Login: React.FC<{ navigation: any }> = ({navigation}) => {
    const [emailContratante, setEmailContratante] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage]= useState ('')
    const [loading, setLoading] = useState(false);
   // Defina a função handleLoginPress para campos obrigatórios

   // Função para fazer login
   const handleLogin = async () => {
    if (!emailContratante || !password) {
        setMessage('Preencha todos os campos');
        return;
    }

    setLoading(true); // Inicia o estado de loading
    try {
        const response = await axios.post('http://localhost:8000/api/auth', {
            emailContratante,
            password,
        });

        console.log('datata',response);

        // Verifica se o login foi bem-sucedido e se o token está presente
        if (response.data && response.data.status === 'Sucesso' && response.data.token) {
            console.log("Token recebido:", response.data.token);
            console.log("Seja bem vindo novamente! ")

            // Armazena o token no AsyncStorage
            await AsyncStorage.setItem('authToken', response.data.token);

            // Navega para a próxima tela após login bem-sucedido
            navigation.navigate('homeStack', { screen: 'home' });
        } else {
            setMessage('Credenciais incorretas, tente novamente.');
        }

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        setMessage('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    } finally {
        setLoading(false); // Desativa o estado de loading
    }
};
    
    return (
        <View style={styles.container}>
            <Image source={Imagens.helpHouse} style={styles.help} />

            <View style={styles.input}>
                <FloatingLabelInput
                    label="Email"
                    value={emailContratante}
                    staticLabel
                    hintTextColor={'#aaa'}
                    hint="exemple@exemple.com"
                    containerStyles={{
                        borderWidth: 2,
                        paddingHorizontal: 10,
                        backgroundColor: '#fff',
                        borderColor: '#FF8F49',
                        borderRadius: 50,
                        borderTopWidth: 5,
                        borderLeftWidth: 5,
                        borderRightWidth: 5,
                        borderBottomWidth: 5,
                    }}
                    customLabelStyles={{
                        colorFocused: '#FF8F49',
                        fontSizeFocused: 12,
                    }}
                    labelStyles={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 5,
                        color: '#FF8F49',
                    }}
                    inputStyles={{
                        color: '#000',
                        paddingHorizontal: 10,
                    }}
                    onChangeText={setEmailContratante}
                />
                     <Text style={styles.errorMessage}>{message}</Text> 

            </View>

            <View style={styles.input}>
                <FloatingLabelInput
                    label="Senha"
                    isPassword
                    staticLabel
                    togglePassword={show}
                    value={password}
                    onChangeText={setPassword}
                    customShowPasswordComponent={<Text>Mostrar</Text>}
                    customHidePasswordComponent={<Text>Esconder</Text>}
                    containerStyles={{
                        borderWidth: 2,
                        paddingHorizontal: 10,
                        backgroundColor: '#fff',
                        borderColor: '#ff9238',
                        borderRadius: 50,
                        borderTopWidth: 5,
                        borderLeftWidth: 5,
                        borderRightWidth: 5,
                        borderBottomWidth: 5,
                    }}
                    customLabelStyles={{
                        colorFocused: '#FF8F49',
                        fontSizeFocused: 12,
                    }}
                    labelStyles={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 5,
                        color: '#FF8F49',
                    }}
                    inputStyles={{
                        color: '#000',
                        paddingHorizontal: 10,
                    }}
                />
            </View>

            <Button
                style={styles.button}
                color='#004AAD'
                variant="primary"
                title="Entrar" 
                //onPress={() => navigation.navigate('cadastro')} 

                 onPress={handleLogin} 
    />


                <View>
                    <View style={[styles.conta ]}>
                        <Text>Ainda não tem uma conta</Text>
                        <Text>Profissional <Text style={styles.helpText} >Help</Text><Text style={styles.houseText}>House</Text>? </Text>
                    </View>
                </View>
                    
                <Button
                style={[styles.buttonCad, { backgroundColor: '#004AAD' }]} // Defina a cor de fundo desejada aqui
                color='#004AAD'
                variant="primary"
                title="Cadastre-se" 
                onPress={() => navigation.navigate('cadastro')} 
    />
        </View>
    );
};

export default Login;
function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

