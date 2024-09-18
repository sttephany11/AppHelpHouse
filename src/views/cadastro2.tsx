import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import styles from '../css/cadastro2Css';
import Api from '../../componentes/apiCep/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from '../cliContext';

const CadastroScreen2: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { nomeContratante, cpfContratante, telefoneContratante, emailContratante, password } = route.params;
    const [cepContratante, setCepContratante] = useState('');
    const [bairroContratante, setBairroContratante] = useState('');
    const [ruaContratante, setRuaContratante] = useState('');
    const [numCasaContratante, setNumCasaContratante] = useState('');
    const [complementoContratante, setComplementoContratante] = useState('');
    
    // Desestruturando corretamente
    const { userId, setUserId, setUserData } = useUser();

    const verificar = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/clii', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomeContratante,
                    cpfContratante,
                    password,
                    emailContratante,
                    telefoneContratante,
                    ruaContratante,
                    cepContratante,
                    numCasaContratante,
                    complementoContratante,
                    bairroContratante,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ${response.status}: ${errorData.error}`);
            }
    
            const result = await response.json();
            console.log('Resultado da criação:', result); // Log para depuração
    
            const idCli = result.data.idContratante; // Acesse idContratante dentro de data
    
            if (idCli) {
                setUserId(idCli); // Armazena o ID do usuário no contexto
                console.log('Chamando fetchDadosCli com ID:', idCli); // Para depuração
                await fetchDadosCli(idCli);
            } else {
                console.error('ID do contratante não foi retornado. Resposta:', result);
            }
    
            Alert.alert('Success', 'Dados salvos com sucesso!');
            navigation.navigate('login'); // Navega para a tela 'login'
        } catch (error) {
            Alert.alert('Error', 'Ocorreu um erro ao salvar os dados.');
            console.error('Error:', error);
        }
    };
        
    
    
    const fetchDadosCli = async (idCli) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cli/${idCli}`); // Chamada à API com o ID do usuário
            const data = await response.json();
    
            if (response.ok) {
                setUserData(data); // Armazena os dados do usuário no contexto
            } else {
                console.error('Error fetching user data:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };  

    const buscarCep = async () => {
        if (cepContratante === "") {
            Alert.alert('Cep inválido');
            return;
        }
        try {
            const response = await Api.get(`/${cepContratante}/json/`);
            setBairroContratante(response.data.bairro);
            setRuaContratante(response.data.logradouro);
        } catch (error) {
            console.log('Erro ao buscar CEP:', error);
        }
    };

    const formatCep = (text: string) => {
        let cleaned = text.replace(/\D/g, '');
        if (cleaned.length > 5) {
            cleaned = cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        return cleaned;
    };

    const handleCepChange = (text: string) => {
        setCepContratante(formatCep(text));
    };

    return (
        <View style={styles.container}>
            <View style={styles.fundo}>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Últimos <Text style={styles.passos}>Passos</Text></Text>
                        <Text style={styles.titulo3}>Já estamos acabando, adicione as últimas informações para construirmos sua conta!</Text>
                    </View>

                    <View style={styles.input}>
                        <View style={styles.inputsCep}>
                            <Text style={styles.title3}>CEP</Text>
                            <AntDesign style={styles.icon} name="search1" size={24} color="black" onPress={buscarCep} />
                        </View>
                        <TextInput
                            style={styles.input3}
                            placeholder=""
                            value={cepContratante}
                            keyboardType="numeric"
                            returnKeyType='done'
                            maxLength={10}
                            onChangeText={handleCepChange}
                        />

                        <Text style={styles.title3}>Bairro</Text>
                        <TextInput
                            placeholder=""
                            value={bairroContratante}
                            onChangeText={setBairroContratante}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}>Rua</Text>
                        <TextInput
                            placeholder=""
                            value={ruaContratante}
                            onChangeText={setRuaContratante}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}>Complemento</Text>
                        <TextInput
                            placeholder=""
                            value={complementoContratante}
                            onChangeText={setComplementoContratante}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}>Número</Text>
                        <TextInput
                            placeholder=""
                            value={numCasaContratante}
                            onChangeText={setNumCasaContratante}
                            keyboardType="numeric"
                            style={styles.inputNum}
                        />

                        <TouchableOpacity style={styles.button2} onPress={verificar}>
                            <Text style={styles.buttonText2}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CadastroScreen2;
