import React, { useState } from 'react';
import { View, Text ,TouchableOpacity, Alert,TextInput} from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/cadastro2Css';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';  // Importando o MapView e Marker
import Map from '../../componentes/Map/map';  // Importe o componente Map
import Api from '../../componentes/apiCep/api'
import AntDesign from '@expo/vector-icons/AntDesign';


const CadastroScreen2: React.FC<{route: any, navigation: any }> = ({route, navigation }) => {
    const {nomeContratante,cpfContratante,telefoneContratante,emailContratante,password}= route.params;
    const [cepContratante, setCepContratante] = useState('');
    const [bairroContratante, setBairroContratante] = useState('');
    const [ruaContratante, setRuaContratante] = useState('');
    const [numCasaContratante    , setNumCasaContratante] = useState('');
    const [complementoContratante, setComplementoContratante] = useState('');

    const verificar = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/clii', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              nomeContratante: nomeContratante,
              cpfContratante: cpfContratante,
              password: password,
              emailContratante: emailContratante,
              telefoneContratante: telefoneContratante,
              ruaContratante: ruaContratante,
              cepContratante: cepContratante,
              numCasaContratante: numCasaContratante,
              complementoContratante: complementoContratante,
              bairroContratante: bairroContratante
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro na resposta da API:', errorData);
            throw new Error(`Erro ${response.status}: ${errorData.error}`);
          }
      
          const result = await response.json();
          Alert.alert('Success', 'Dados salvos com sucesso!');
          console.log(result);
        } catch (error) {
          Alert.alert('Error', 'Ocorreu um erro ao salvar os dados.');
          console.error('Error:', error);
        }
      };
      

        //função para chamar o cep do clinete.(bem nítido ne amigão)
       async function buscarCep() {
        // Se Cep for vazio vai aparecer um alerta
        if (cepContratante == "") {
            Alert.alert('Cep inválido')
            setCepContratante("")
        }
        try {
            // await serve para esperar a resposta que vai ser passada
            const response = await Api.get(`/${cepContratante}/json/`)
            //Esse get, serve para puxar a info la do servidor da API 


            //Os set São as infos que você vai pegar da API
            setBairroContratante(response.data.bairro)
            setRuaContratante(response.data.logradouro);
       
            
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
                   
                            {/* Cep */}
                            <View style={styles.inputsCep}>
                            <Text style={styles.title3}> CEP  </Text>
                            <Text style={styles.title4}> <AntDesign style={styles.icon} name="search1" size={24} color="black" onPress={buscarCep} /></Text>
                            </View> 
                            <TextInput style={styles.input3} 
                             placeholder="" 
                             value={cepContratante}
                             keyboardType="numeric"
                             returnKeyType='done'
                             maxLength={8}
                             onChangeText={value => setCepContratante(value)} 
                            
                            />
 
                            <Text style={styles.title3}> Bairro</Text>
                            <TextInput placeholder=""
                             value={bairroContratante}
                             onChangeText={value => setBairroContratante(value)} 
                            style={styles.input3}
                            />

                  

                        {/* Rua */}
                        <Text style={styles.title3}> Rua</Text>
                            <TextInput placeholder=""
                             value={ruaContratante}
                             onChangeText={value => setRuaContratante(value)} 
                            style={styles.input3}
                            />
                     
               
                     
                        {/* Complemento, tem que ser feito */}
                        <Text style={styles.title3}> Complemento</Text>
                            <TextInput placeholder=""
                             value={complementoContratante}
                            returnKeyType='done'
                             onChangeText={value => setComplementoContratante(value)}
                            style={styles.input3}
                            
                            />
                     
                                   
                      
                            {/* Numero */}
                            <Text style={styles.title3}> Número</Text>
                            <TextInput placeholder=""
                             value={numCasaContratante}
                            returnKeyType='done'
                             onChangeText={value => setNumCasaContratante(value)}
                             keyboardType="numeric"
                            style={styles.inputNum}
                            
                            />
                   
               
                 <TouchableOpacity style={styles.button2}  onPress={async () => {
                            await verificar();// Aguarda a conclusão da verificação
                            navigation.navigate('login'); // Navega para a tela 'login'
                            }}>
                <Text style={styles.buttonText2}>Próximo</Text>
                </TouchableOpacity>

                    </View>
                </View>
            </View>
    
        </View>
    );
};
    

export default CadastroScreen2;
