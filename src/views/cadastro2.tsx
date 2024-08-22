import React, { useState } from 'react';
import { View, Text ,TouchableOpacity, Alert,TextInput} from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/cadastro2Css';
import Imagens from '../../img/img';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';  // Importando o MapView e Marker
import Map from '../../componentes/Map/map';  // Importe o componente Map
import Api from '../../componentes/apiCep/api'
import AntDesign from '@expo/vector-icons/AntDesign';


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
                            <View style={styles.inputsCep}>
                            <Text style={styles.title3}> CEP  </Text>
                            <Text style={styles.title4}> <AntDesign style={styles.icon} name="search1" size={24} color="black" onPress={buscarCep} /></Text>
                            </View> 
                            <TextInput style={styles.input3} 
                             placeholder="XXXXX-XX" 
                             value={Cep}
                             keyboardType="numeric"
                             returnKeyType='done'
                             maxLength={8}
                             onChangeText={value => setCep(value)} 
                            
                            />
 
                            <Text style={styles.title3}> Bairro</Text>
                            <TextInput placeholder=""
                             value={Bairro}
                             onChangeText={value => setBairro(value)} 
                            style={styles.input3}
                            />

                  

                        {/* Rua */}
                        <Text style={styles.title3}> Rua</Text>
                            <TextInput placeholder=""
                             value={Rua}
                             onChangeText={value => setRua(value)} 
                            style={styles.input3}
                            />
                     
                        
                      
                            {/* Numero */}
                            <Text style={styles.title3}> Número</Text>
                            <TextInput placeholder="..."
                             value={Numero}
                            returnKeyType='done'
                             onChangeText={value => setNumero(value)}
                             keyboardType="numeric"
                            style={styles.inputNum}
                            
                            />
                     
                        {/* Complemento, tem que ser feito */}
                     
                          
                   
               
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
