import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function App() {  
  const [nomeContratante, setNomeContratante] = useState('');
  const [sobrenomeContratante, setSobrenomeContratante] = useState('');
  const [cpfContratante, setCpfContratante] = useState('');
  const [password, setPassword] = useState('');
  const [emailContratante, setEmailContratante] = useState('');
  const [telefoneContratante, setTelefoneContratante] = useState('');
  const [idEndereco, setIdEndereco] = useState('');

  const verificar = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/clii', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeContratante: nomeContratante,
          sobrenomeContratante:sobrenomeContratante,
          cpfContratante:cpfContratante,
          password:password,
          emailContratante:emailContratante,
          telefoneContratante:telefoneContratante,
          idEndereco:idEndereco
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
        placeholder="Digite o sobrenome do Profissional"
        placeholderTextColor="#888"
        onChangeText={text => setSobrenomeContratante(text)}
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
        placeholder="Endereço"
        placeholderTextColor="#888"
        onChangeText={text => setIdEndereco(text)}
      />
      <Button title="Salvar" onPress={verificar} />
    </View>
  );
}
