import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/cadastroCss';

import moment from 'moment';


const Cadastro: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const [nomeContratante, setNomeContratante] = useState('');
    const [cpfContratante, setCpfContratante] = useState('');
    const [telefoneContratante, setTelefoneContratante] = useState('');
    const [nascContratante, setNascContratante] = useState('');

    const dadosCli = () => {
        // Agora envia para a próxima tela com a data convertida
        navigation.navigate('cadastro3', {
            nomeContratante: nomeContratante,
            cpfContratante: cpfContratante,
            telefoneContratante: telefoneContratante,
            nascContratante:nascContratante , // Data convertida no formato correto
            
        });
    }
    
     const handleDateChange = (text : any) => {
        setNascContratante(text);
        
        // Convertendo a data para o formato do backend (YYYY-MM-DD)
        const formattedDate = moment(text, 'DD/MM/YYYY').format('YYYY-MM-DD');
        
        // Aqui você pode usar 'formattedDate' para enviar para o backend
        console.log('Data formatada para o backend:', formattedDate);
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={60}
            style={styles.container}>
                
            <View style={styles.titleCadastro}>
                <Text style={styles.titulo}>CADASTRO</Text>
            </View>
            <View style={styles.fundo}>
                <ScrollView>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Dados <Text style={styles.pessoais}>Pessoais</Text></Text>
                    </View>

                    <View style={styles.input}>

                        {/* Nome */}
                        <Text style={styles.title3}>Nome</Text>
                        <TextInput
                         placeholder="Digite seu nome..."
                            value={nomeContratante}
                            onChangeText={value => setNomeContratante(value)}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}>Data de Nascimento</Text>

                        <TextInputMask
                             type={'datetime'}
                             options={{
                               format: 'DD/MM/YYYY'
                             }}
                           
                     
                            value={nascContratante}
                            onChangeText={handleDateChange}
                            style={{
                                borderBottomWidth: 2,
                                borderColor: '#fff',
                                height: 40,
                                marginBottom: 5,
                                fontSize: 16,
                                color:'#fff',
                                paddingHorizontal: 10,
                            }}
                            placeholder="Digite a data em que nasceu..."
                            //placeholderTextColor="#fff"
                            returnKeyType='done'
                        />

                        <Text style={styles.title3}>Cpf</Text>
                        <TextInputMask
                            type={'cpf'}
                            placeholder="Digite seu CPF..."
                            value={cpfContratante}
                            keyboardType="number-pad"
                            returnKeyType='done'
                            maxLength={14}
                            onChangeText={value => setCpfContratante(value)}
                            style={styles.input3}

                        />

                        <Text style={styles.title3}> Telefone</Text>
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            returnKeyType='done'
                            value={telefoneContratante}
                            onChangeText={text => setTelefoneContratante(text)}
                            placeholder="(XX) XXXX-XXXX"
                            style={styles.input3}
                        />



                        <TouchableOpacity style={styles.button2} onPress={dadosCli} >
                            <Text style={styles.buttonText2}>Próximo</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
        
    );

     
   
};

export default Cadastro;
//onPress={() => navigation.navigate('cadastro2')}