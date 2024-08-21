import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput, ScrollView } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/cadastroCss';

const Cadastro: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [Nome, setNome] = useState('');
    const [Sobrenome, setSobrenome] = useState('');
    const [Nascimento, setNascimento] = useState('');
    const [tel, setTel] = useState('');
    const [Cpf, setCpf] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');


    return (
        <View style={styles.container}>
            <View style={styles.titleCadastro}>
                <Text style={styles.titulo}>CADASTRO</Text>
            </View>
            <View style={styles.fundo}>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Dados <Text style={styles.pessoais}>Pessoais</Text></Text>
                    </View>
                    <ScrollView>
                    <View style={styles.input}>

                        {/* Nome */}
                            <Text style={styles.title3}>Nome</Text>
                            <TextInput placeholder="Digite seu nome..."
                            value={Nome}
                            onChangeText={value => setNome(value)}
                            style={styles.input3}
                            />

                        <Text style={styles.title3}>CPF</Text>
                            <TextInput placeholder="Digite seu cpf..."
                             value={Sobrenome}
                             onChangeText={value => setSobrenome(value)} 
                            style={styles.input3}
                            />

                        <Text style={styles.title3}> Data de Nascimento</Text>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            value={Nascimento}
                            onChangeText={text => setNascimento(text)}
                            placeholder="DD/MM/YYYY"
                            style={styles.input3}
                            />
                            
                        <Text style={styles.title3}> Telefone</Text> 
                        <TextInputMask
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) ',
                            }}
                            value={tel}
                            onChangeText={text => setTel(text)}
                            placeholder="(XX) XXXX-XXXX" 
                            style={styles.input3} 
                            />
                            
                                    
                        <Text style={styles.title3}> Email</Text>
                            <TextInput placeholder="Digite um email..."
                             value={Email}
                             onChangeText={value => setEmail(value)} 
                            style={styles.input3}
                            />
                                    
                        <Text style={styles.title3}> Senha</Text>
                            <TextInput placeholder="Sua senha..."
                             value={Senha}
                             onChangeText={value => setSenha(value)} 
                             style={styles.input3}
                             
                            />

                 <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('cadastro2')}>
                <Text style={styles.buttonText2}>Próximo</Text>
                </TouchableOpacity>

                    </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Cadastro;
