import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function App() {  
  const [nomeContratante, setNomeContratante] = useState('');
  //const [sobrenomeContratante, setSobrenomeContratante] = useState('');
  const [cpfContratante, setCpfContratante] = useState('');
  const [password, setPassword] = useState('');
  const [emailContratante, setEmailContratante] = useState('');
  const [telefoneContratante, setTelefoneContratante] = useState('');
  const [ruaContratante, setRuaContratante] = useState('');
  const [cepContratante, setCepContratante] = useState('');
  const [numCasaContratante, setNumCasaContratante] = useState('');
  const [complementoContratante, setComplementoContratante] = useState('');
  const [bairroContratante, setBairroContratante] = useState('');
  const [ufContratante, setUfContratante] = useState('');
  const [cidadeContratante, setCidadeContratante] = useState('');
	
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
          cpfContratante:cpfContratante,
          password:password,
          emailContratante:emailContratante,
          telefoneContratante:telefoneContratante,
          ruaContratante:ruaContratante,
          cepContratante:cepContratante,
          numCasaContratante:numCasaContratante,
          complementoContratante:complementoContratante,
          bairroContratante:bairroContratante,
          ufContratante:ufContratante,
          cidadeContratante:cidadeContratante,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      Alert.alert('Success', 'Dados salvos com sucesso!');
      console.log(result);

    } catch (error) {
      Alert.alert('Error', 'Ocorreu um erro ao salvar os dados.');
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TextInput
        placeholder="Digite o nome do Profissional"
        placeholderTextColor="#888"
        onChangeText={text => setNomeContratante(text)}
      />
      <TextInput
        placeholder="Digite o cpf do Profissional"
        placeholderTextColor="#888"
        onChangeText={text => setCpfContratante(text)}
      />
      <TextInput
        placeholder="Digite a senha do Profissional"
        placeholderTextColor="#888"
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Digite o email do Profissional"
        placeholderTextColor="#888"
        onChangeText={text => setEmailContratante(text)}
      />
      <TextInput
        placeholder="Digite o telefone do Profissional"
        placeholderTextColor="#888"
        onChangeText={text => setTelefoneContratante(text)}
      />
      <TextInput
        placeholder="Rua"
        placeholderTextColor="#888"
        onChangeText={text => setRuaContratante(text)}
      />
      <TextInput
        placeholder="Cep"
        placeholderTextColor="#888"
        onChangeText={text => setCepContratante(text)}
      />
       <TextInput
        placeholder="numCasa"
        placeholderTextColor="#888"
        onChangeText={text => setNumCasaContratante(text)}
      />
       <TextInput
        placeholder="complemento"
        placeholderTextColor="#888"
        onChangeText={text => setComplementoContratante(text)}
      />
      
      <TextInput
        placeholder="bairro"
        placeholderTextColor="#888"
        onChangeText={text => setBairroContratante(text)}
      />
      
      <TextInput
        placeholder="uf"
        placeholderTextColor="#888"
        onChangeText={text => setUfContratante(text)}
      />
      
      <TextInput
        placeholder="cidade"
        placeholderTextColor="#888"
        onChangeText={text => setCidadeContratante(text)}
      />
      <Button title="Salvar" onPress={verificar} />
    </View>
  );
}
