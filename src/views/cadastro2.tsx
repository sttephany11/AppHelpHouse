import React, { useState } from 'react';
import { View, Text ,TouchableOpacity, Alert,Image} from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/cadastro2Css';
import Imagens from '../../img/img';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';  // Importando o MapView e Marker
import Map from '../../componentes/Map/map';  // Importe o componente Map
import Api from '../../componentes/apiCep/api'




const CadastroScreen2: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [Cep, setCep] = useState('');
    const [Bairro, setBairro] = useState('');
    const [Rua, setRua] = useState('');
    const [Numero, setNumero] = useState('');
    const [Complemento, setComplemento] = useState('');

    async function buscarCep() {
        // Se Cep for vazio vai aparecer um alerta
        if (Cep == "") {
            Alert.alert('Cep inválido')
            setCep("")
        }
        try {
            // await serve para esperar a resposta que vai ser passada
            const response = await Api.get(`/${Cep}/json/`)
            //Esse get, serve para puxar a info la do servidor da API 


            //Os set São as infos que você vai pegar da API
            setBairro(response.data.bairro)
            setRua(response.data.logradouro);

            // Caso não carregue retornara um erro
        } catch (error) {
            console.log('ERROGAY' + error)
        }
    }

    const formatCep = (text: string) => {
        // Remove todos os caracteres que não são números
        let cleaned = text.replace(/\D/g, '');

        // Aplica a formatação para CEP
        if (cleaned.length > 5) {
            // Formato completo: XXXXX-XXX
            cleaned = cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
        } else {
            // Caso ainda não tenha 8 dígitos, apenas retorna os números sem formatação
            cleaned = cleaned.slice(0, 5);
        }

        // Retorna o CEP formatado ou parcialmente formatado
        return cleaned;
    };


    const handleCepChange = (text) => {
        setCep(formatCep(text));
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

                            {/* Cep */}
                    <FloatingLabelInput
                        label="Cep"
                        value={Cep}
                        keyboardType="numeric"
                        maxLength={9}
                        onChangeText={handleCepChange}
                        containerStyles={{
                            borderBottomWidth: 5,
                            borderColor: '#fff',
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                        customLabelStyles={{
                            topFocused: -20,
                            colorFocused: '#fff',  // Cor do label quando o input está em foco
                            fontSizeFocused: 16,
                            colorBlurred: '#004AAD',  // Cor do label quando o input não está em foco
                        }}
                        labelStyles={{
                            paddingHorizontal: 5,
                            fontWeight: 'bold',
                        }}
                        inputStyles={{
                            color: '#fff',
                            fontSize: 16,
                        }}
                        
                    />

                        <FloatingLabelInput
                        label="Bairro"
                        value={Bairro}
                        onChangeText={value => setBairro(value)}
                        containerStyles={{
                            borderBottomWidth: 5,
                            borderColor: '#fff',
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                        customLabelStyles={{
                            topFocused: -20,
                            colorFocused: '#fff',
                            colorBlurred: '#004AAD',  // Cor do label quando o input não está em foco

                            fontSizeFocused: 16,
                        }}
                        labelStyles={{
                            paddingHorizontal: 5,
                            color: '#FF8F49',
                            fontWeight: 'bold'
                        }}
                        inputStyles={{
                            color: '#fff',
                            fontSize: 16,
                        }}
                    />

                        <View style={styles.inputRow}>
                        {/* Rua */}
                        <FloatingLabelInput
                            label="Rua"
                            value={Rua}
                            onChangeText={value => setRua(value)}
                            containerStyles={{
                                borderBottomWidth: 5,
                                borderColor: '#fff',
                                marginTop: 20,
                                marginBottom: 10,


                            }}
                            customLabelStyles={{
                                topFocused: -20,
                                colorFocused: '#fff',
                                fontSizeFocused: 16,
                                colorBlurred: '#004AAD',  // Cor do label quando o input não está em foco

                            }}
                            labelStyles={{
                                paddingHorizontal: 5,
                                color: '#FF8F49',
                                fontWeight: 'bold'

                            }}
                            inputStyles={{
                                color: '#fff',
                                fontSize: 16,
                            }}
                        />
                        <View style={styles.inputNum}>

                            {/* Numero */}
                            <FloatingLabelInput
                                label="Número"
                                value={Numero}

                                onChangeText={value => setNumero(value)}
                                keyboardType="numeric"
                                containerStyles={{
                                    borderBottomWidth: 5,
                                    borderColor: '#fff',
                                    marginTop: 20,
                                    marginBottom: 10,
                                    marginLeft: 10,  // Espaçamento entre os inputs
                                    width: 60,       // Largura fixa para o campo de número
                                }}
                                
                                customLabelStyles={{
                                    topFocused: -20,
                                    colorFocused: '#fff',
                                    fontSizeFocused: 16,
                                    colorBlurred: '#004AAD',  // Cor do label quando o input não está em foco
                                  

                                }}
                                labelStyles={{
                                    paddingHorizontal: 1,
                                    color: '#FF8F49',
                                    fontWeight: 'bold'

                                }}
                                inputStyles={{
                                    color: '#fff',
                                    fontSize: 16,
                                }}


                            />



                        </View>

                    </View>

                        {/* Complemento */}
                        <FloatingLabelInput
                            label="Complemento"
                            value={Complemento}
                            onChangeText={value => setComplemento(value)}
                            containerStyles={{
                                borderBottomWidth: 5,
                                borderColor: '#fff',
                                marginTop: 20,
                                marginBottom: 10,
                                width: 0,


                            }}
                            customLabelStyles={{
                                topFocused: -20,
                                colorFocused: '#fff',
                                fontSizeFocused: 16,
                                colorBlurred: '#004AAD',  // Cor do label quando o input não está em foco

                            }}
                            labelStyles={{
                                paddingHorizontal: 5,
                                color: '#FF8F49',
                                fontWeight: 'bold'

                            }}
                            inputStyles={{
                                color: '#fff',
                                fontSize: 16,
                            }}
                        />
                   
                   <Button
                        style={[styles.buttonEnviar, {
                            backgroundColor: '#004AAD',
                            width: '40%'
                        }]} // Defina a cor de fundo desejada aqui
                        color='#FF914D'
                        variant="primary"
                        title="Buscar Cep"
                        onPress={buscarCep}
                    />
                 <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('cadastro3')}>
                <Text style={styles.buttonText2}>Próximo</Text>
                </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );
};
    

export default CadastroScreen2;
