import React, { useState, useContext } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Imagens from "../../img/img";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/loginCss';
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage para armazenar o token
import myContext from '../functions/authContext';

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [emailContratante, setEmailContratante] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { user, setUser } = useContext(myContext);

    // Função para fazer login
    const handleLogin = async () => {
        // Verificar se os campos estão preenchidos
        if (!emailContratante || !password) {
            setMessage('Preencha todos os campos');
            return;
        }

        setLoading(true); // Inicia o estado de loading
        setMessage(''); // Limpa a mensagem anterior

        try {
            const response = await api.post('/auth', {
                emailContratante,
                password,
            });

            console.log('data', response);

            // Verificar se o login foi bem-sucedido
            if (response.data && response.data.status === 'Sucesso' && response.data.token) {
                console.log("Token recebido:", response.data.token);
                console.log("Seja bem-vindo novamente!");

                setUser(response.data.user);
                await AsyncStorage.setItem('authToken', response.data.token); // Armazena o token no AsyncStorage
                navigation.navigate('homeStack', { screen: 'home' });
            } else {
                setMessage('Credenciais incorretas, tente novamente.');
            }

        } catch (error) {
            // Manipular o erro de login
            const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais e tente novamente.';
            console.error('Erro ao fazer login:', errorMessage);
            setMessage(errorMessage);
        } finally {
            setLoading(false); // Desativa o estado de loading
        }
    };

    return (
        <View style={styles.container}>
            <Image source={Imagens.helpHouse} style={styles.help} />

            {/* Campo de Email */}
            <View style={[styles.input, { width: 350, height: 70 }]}>
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
                        fontSize: 22
                    }}
                    inputStyles={{
                        color: '#000',
                        paddingHorizontal: 10,
                    }}
                    onChangeText={setEmailContratante}
                />
                <Text style={styles.errorMessage}>{message}</Text>
            </View>

            {/* Campo de Senha */}
            <View style={[styles.input, { width: 350 }]}>
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
                        fontSize: 22
                    }}
                    inputStyles={{
                        color: '#000',
                        paddingHorizontal: 10,
                        borderColor:'red'
                    }}
                />
            </View>

            <TouchableOpacity style={styles.button3} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText2}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>

           
            <View>
                <View style={[styles.conta]}>
                    <Text>Ainda não tem uma conta</Text>
                    <Text>Profissional <Text style={styles.helpText}>Help</Text><Text style={styles.houseText}>House</Text>? </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('cadastro')}>
                <Text style={styles.buttonText2}>Cadastre-se</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
