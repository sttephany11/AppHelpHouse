import React,{useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput  } from 'react-native';
import styles from '../css/criarPedidoCss';




 

const PedidoScreen = () => {
  const [descricaoPedido, setDescricaoPedido] = useState('');
  const [idServicos, setIdServicos] = useState(null); // Armazena o ID do serviço selecionado

  const handleSubmit = async () => {
    if (!descricaoPedido || !idServicos) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descricaoPedido,
         
          // Inclua outros dados necessários, como idContratante
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', data.message);
      } else {
        Alert.alert('Erro', data.error);
      }
    } catch (error) {
      Alert.alert('Erro', 'Houve um problema ao enviar o pedido.');
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
        <Text style={styles.tab}>      Criar um pedido</Text>
        <Text style={styles.tab1}>Agendadas</Text>
      </View>
       </View>

      {/* Request Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Solicitação para <Text style={styles.highlightedText}>Leila Pereira</Text>    {/* Nome da pessoa que ta pedindo*/}
        </Text>
        <Text style={styles.category}>
           Categoria:
     
           {/*<Text style={styles.categoryText}>Pintura</Text> */}
        </Text>
        <Text style={styles.location}>São Paulo, Guainases <Text style={styles.distance}>A 2 km de você</Text></Text>

        {/* Request Description */}
        <View style={styles.requestDescription}>
              <TextInput 
              style={styles.inputDesc}
              />

             
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PedidoScreen;