import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import styles from '../css/cadastro2Css';
import Api from '../../componentes/apiCep/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useUser } from '../cliContext';
import Map from '../../componentes/Map/map';

const CadastroScreen2: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const { nomeContratante, cpfContratante, telefoneContratante, nascContratante, emailContratante, password } = route.params;
    const [cepContratante, setCepContratante] = useState('');
    const [bairroContratante, setBairroContratante] = useState('');
    const [ruaContratante, setRuaContratante] = useState('');
    const [cidadeContratante, setCidadeContratante] = useState('');
    const [numCasaContratante, setNumCasaContratante] = useState('');
    const [complementoContratante, setComplementoContratante] = useState('');
    
    const { userId, setUserId, setUserData } = useUser();

    const verificar = async () => {
        try {
            const response = await fetch('http://192.168.1.13:8000/api/clii', {
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
                    cidadeContratante,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro ${response.status}: ${errorData.error}`);
            }
    
            const result = await response.json();
            const idCli = result.data.idContratante;
    
            if (idCli) {
                setUserId(idCli);   
                await fetchDadosCli(idCli);
            }
            Alert.alert('Success', 'Dados salvos com sucesso!');
            navigation.navigate('login');
        } catch (error) {
            Alert.alert('Error', 'Ocorreu um erro ao salvar os dados.');
            console.error('Error:', error);
        }
    };
        
    const fetchDadosCli = async (idCli) => {
        try {
            const response = await fetch(`http://192.168.1.13:8000/api/cli/${idCli}`);
            const data = await response.json();
    
            if (response.ok) {
                setUserData(data);
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
            const response = await Api.get(`/${cepContratante.replace(/\D/g, '')}/json/`);
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
        <View style={styles.container}>
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
        </View>
    );
};

export default CadastroScreen2;
