import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/cadastroCss';

const Cadastro: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [Nascimento, setNascimento] = useState('');
    const [phone, setPhone] = useState('');
    const [Cpf, setCpf] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titulo}>CADASTRE-SE</Text>
            </View>
            <View style={styles.fundo}>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Dados <Text style={styles.pessoais}>Pessoais</Text></Text>
                    </View>
                    <View style={styles.input}>

                        {/* Nome */}
                        <FloatingLabelInput
                            label="Nome"
                            value={Nome}
                            onChangeText={value => setNome(value)}
                            containerStyles={{
                                borderBottomWidth: 5,
                                borderColor: '#fff',
                                marginTop: 5,
                            }}
                            customLabelStyles={{
                                topFocused: -20,  // Move o label para cima 20px quando focado
                                colorFocused: '#fff',
                                fontSizeFocused: 20,
                               
                            }}
                            labelStyles={{
                                paddingHorizontal:5,
                                color: '#fff',
                                fontWeight:900,
                                fontSize: 50,
                                
                            }}
                            inputStyles={{
                                color: '#fff',
                                fontSize: 20,
                            }}
                        />

                        {/* Sobrenome */}
                        <FloatingLabelInput
                            label="Sobrenome"
                            value={Sobrenome}
                            onChangeText={value => setSobrenome(value)}
                            containerStyles={{
                                borderBottomWidth: 5,
                                borderColor: '#fff',
                                marginTop: 35,
                            }}
                            customLabelStyles={{
                                topFocused: -20,  // Move o label para cima 20px quando focado
                                colorFocused: '#fff',
                                fontSizeFocused: 20,
                            }}
                            labelStyles={{
                                paddingHorizontal: 5,
                                color: '#FF8F49',
                                fontWeight:900,
                                fontSize: 25,
                            }}
                            inputStyles={{
                                color: '#fff',
                                fontSize: 19,
                                marginTop:5
                            }}
                        />

                        {/* Data de Nascimento */}
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            value={Nascimento}
                            onChangeText={text => setNascimento(text)}
                            customTextInput={FloatingLabelInput}
                            customTextInputProps={{
                                label: "Data de Nascimento",
                                containerStyles: {
                                    borderBottomWidth: 5,
                                    borderColor: '#fff',
                                    marginTop: 30,
                                    fontWeight:800
                                },
                                customLabelStyles: {
                                    topFocused: -20,  // Move o label para cima 20px quando focado
                                    colorFocused: '#fff',
                                    fontSizeFocused: 16,
                                },
                                labelStyles: {
                                    paddingHorizontal: 5,
                                    color: '#FF8F49',
                                    fontWeight:900,
                                    fontSize: 25,
                                },
                                inputStyles: {
                                
                                    fontSize: 18,
                                    color: '#fff',
                                },
                            }}
                        />

                        {/* Telefone */}
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) ',
                            }}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            customTextInput={FloatingLabelInput}
                            customTextInputProps={{
                                label: "Telefone",
                                containerStyles: {
                                    borderBottomWidth: 5,
                                    borderColor: '#fff',
                                    marginTop: 30,
                                },
                                customLabelStyles: {
                                    topFocused: -20,  // Move o label para cima 20px quando focado
                                    colorFocused: '#fff',
                                    fontSizeFocused: 16,
                                },
                                labelStyles: {
                                    paddingHorizontal: 5,
                                    color: '#FF8F49',
                                    fontWeight:900,
                                     fontSize: 25,
                                },
                                inputStyles: {
                                  
                                    fontSize: 18,
                                    color: '#fff',
                                },
                            }}
                        />
                     {/* Email */}
                     <FloatingLabelInput
                            label="Email"
                            value={Email}
                            hint="exemple@exemple.com"
                            onChangeText={value => setNome(value)}
                            containerStyles={{
                                borderBottomWidth: 5,
                                borderColor: '#fff',
                                marginTop: 30,
                            }}
                            customLabelStyles={{
                                topFocused: -20,  // Move o label para cima 20px quando focado
                                colorFocused: '#fff',
                                fontSizeFocused: 20,
                               
                            }}
                            labelStyles={{
                                paddingHorizontal:5,
                                color: '#fff',
                                fontWeight:900,
                                fontSize: 50,
                                
                            }}
                            inputStyles={{
                                color: '#fff',
                                fontSize: 20,
                            }}
                        />


                         {/* Senha */}
                         <FloatingLabelInput
                            label="Senha"
                            isPassword
                            value={Senha}
                            
                            onChangeText={value => setNome(value)}
                            containerStyles={{
                                borderBottomWidth: 5,
                                borderColor: '#fff',
                                marginTop: 30,
                            }}
                            customLabelStyles={{
                                topFocused: -20,  // Move o label para cima 20px quando focado
                                colorFocused: '#fff',
                                fontSizeFocused: 20,
                               
                            }}
                            labelStyles={{
                                paddingHorizontal:5,
                                color: '#fff',
                                fontWeight:900,
                                fontSize: 50,
                                
                            }}
                            inputStyles={{
                                color: '#fff',
                                fontSize: 20,
                            }}
                        />


                       


               
                 <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('cadastro2')}>
                <Text style={styles.buttonText2}>Próximo</Text>
                </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );
};

export default Cadastro;
