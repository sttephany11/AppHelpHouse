import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native';
import styles from '../css/cadastro2Css';
import cep from '../../componentes/apiCep/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from '../cliContext';
import api from '../../axios';
import myContext from '../functions/authContext';

const CadastroScreen2: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { nomeContratante, cpfContratante, telefoneContratante, nascContratante, emailContratante, password } = route.params;
    const [cepContratante, setCepContratante] = useState('');
    const [bairroContratante, setBairroContratante] = useState('');
    const [ruaContratante, setRuaContratante] = useState('');
    const [cidadeContratante, setCidadeContratante] = useState('');
    const [numCasaContratante, setNumCasaContratante] = useState('');
    const [complementoContratante, setComplementoContratante] = useState('');
    
    const { userId, setUserId, setUserData } = useUser();

    const userContext = useContext(myContext);
    const { user, setUser } = useContext(myContext);


    const verificar = async () => {
        try {
            // Using Axios to send the POST request
            const response = await api.post('/clii', {
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
                cidadeContratante,
            });
    
            const result = response.data; 
            
            const idCli = result.data.idContratante;
            console.log(result)
            console.log(idCli)
            if (idCli) {
                setUserId(idCli);
                await fetchDadosCli(idCli); // Assuming fetchDadosCli uses Axios too
            }
    
            Alert.alert('Success', 'Dados salvos com sucesso!');
            navigation.navigate('homeStack');
    
        } catch (error) {
            // Axios error messages can be accessed via error.response
            const errorMessage = error.response?.data?.message || 'Ocorreu um erro ao salvar os dados.';
            Alert.alert('Error', errorMessage);
            console.error('Error:', error);
        }
    };
    
        
    const fetchDadosCli = async (idCli) => {
    try {
        // Axios GET request to fetch user data
        const response = await api.get(`cli/${idCli}`);

        // Axios already parses the JSON response, no need for .json()
        const data = response.data;

        // No need for response.ok, Axios throws an error for non-200 responses
        setUserData(data);
        setUser(data);
    } catch (error) {
        // Axios errors can be handled here
        const errorMessage = error.response?.data?.message || 'Error fetching user data';
        console.error('Error fetching user data:', errorMessage);
    }
};


    const buscarCep = async () => {
        if (cepContratante === "") {
            Alert.alert('Cep inválido');
            return;
        }
        try {
            const response = await cep.get(`/${cepContratante.replace(/\D/g, '')}/json/`);
            setBairroContratante(response.data.bairro);
            setRuaContratante(response.data.logradouro);
            setCidadeContratante(response.data.estado);
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
        const formattedCep = formatCep(text);
        setCepContratante(formattedCep);

        if (formattedCep.replace(/\D/g, '').length === 8) {
            buscarCep();
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.fundo}>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Para finalizar,<Text style={styles.passos}> adicione </Text><Text style={styles.passos}>seu endereço</Text></Text>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.title3}>Cep</Text>
                        
                        <View style={styles.inputContainer}> 
                           <AntDesign name="search1" size={24} color="white" style={styles.iconStyle} onPress={buscarCep} />
                            
                          
                            <TextInput
                                style={styles.input3}
                                placeholder="Digite seu cep..."
                                value={cepContratante}
                                keyboardType="numeric"
                                returnKeyType='done'
                                maxLength={9}
                                onChangeText={handleCepChange} 
                            />
                        </View>

                        <Text style={styles.title3}>Bairro</Text>
                        <TextInput
                            placeholder="Seu bairro..."
                            value={bairroContratante}
                            onChangeText={setBairroContratante}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}>Cidade</Text>
                        <TextInput
                            placeholder=""
                            value={cidadeContratante}
                            onChangeText={setCidadeContratante}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}>Rua</Text>
                        <TextInput
                            placeholder="Sua Rua..."
                            value={ruaContratante}
                            onChangeText={setRuaContratante}
                            style={styles.input3}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 3, marginRight: 15 }}>
                                <Text style={styles.title3}>Complemento</Text>
                                <TextInput
                                    placeholder="Digite um complemento..."
                                    value={complementoContratante}
                                    onChangeText={setComplementoContratante}
                                    style={styles.input3}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title3}>Número</Text>
                                <TextInput
                                    placeholder="Número..."
                                    value={numCasaContratante}
                                    onChangeText={setNumCasaContratante}
                                    keyboardType="numeric"
                                    style={styles.inputNum}
                                    returnKeyType='done'
                                />
                            </View>
                        </View>




                        <TouchableOpacity style={styles.button2} onPress={verificar}>
                            <Text style={styles.buttonText2}>Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default CadastroScreen2;
