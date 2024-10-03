import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import styles from '../css/criarPedidoCss'; // Seu arquivo de estilo

const PedidoScreen = () => {
  const [descricaoPedido, setDescricaoPedido] = useState(''); // Armazena a descrição do pedido
  const [idServicos, setIdServicos] = useState(''); // Armazena o ID do serviço

  const handleSubmit = async () => {
    // Verifica se os campos obrigatórios estão preenchidos
    if (!descricaoPedido || !idServicos) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Faz a requisição para o backend (ajuste a URL para o ambiente de produção se necessário)
      const response = await fetch('http://localhost/api/pedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Se estiver usando autenticação via token, adicione o token no header:
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          descricaoPedido, // Envia a descrição do pedido
          idServicos: parseInt(idServicos), // Converte o idServicos para número, se necessário
        }),
      });

      const data = await response.json(); // Converte a resposta para JSON
      if (response.ok) {
        Alert.alert('Sucesso', data.message); // Exibe mensagem de sucesso
        // Aqui você pode navegar para outra tela ou limpar o formulário
        setDescricaoPedido(''); // Limpa o campo após envio
        setIdServicos(''); // Limpa o campo após envio
      } else {
        Alert.alert('Erro', data.error || 'Erro desconhecido'); // Exibe mensagem de erro
      }
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao enviar o pedido.'); // Exibe mensagem de erro de rede
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.navChat}>
        <View style={styles.navContent}>
          <View style={styles.navbar}>
            <Text style={styles.textNav}>Pedido</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={styles.tab}>Criar um pedido</Text>
          <Text style={styles.tab1}>Agendadas</Text>
        </View>
      </View>

      {/* Request Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Solicitação para <Text style={styles.highlightedText}>Leila Pereira</Text> {/* Nome da pessoa que está solicitando */}
        </Text>
        <Text style={styles.category}>Categoria:</Text>
        <Text style={styles.location}>São Paulo, Guaianases <Text style={styles.distance}>A 2 km de você</Text></Text>

        {/* Request Description */}
        <View style={styles.requestDescription}>
          <TextInput
            style={styles.inputDesc}
            placeholder="Descreva o pedido"
            value={descricaoPedido}
            onChangeText={setDescricaoPedido} // Captura a descrição do pedido
          />
        </View>

        {/* Input do Serviço (ID do Serviço) */}
        {/* <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="ID do Serviço"
            value={idServicos}
            keyboardType="numeric" // Define o teclado numérico para IDs de serviços
            onChangeText={setIdServicos} // Captura o ID do serviço
          />
        </View> */}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PedidoScreen;
