import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import styles from '../css/criarPedidoCss';
import api from "../../axios"; // Importa a instância do Axios
import {getServicos} from '../functions/getServico';

// Definição de tipos para os parâmetros da função postPedido
interface PostPedidoParams {
  descricaoPedido: string;
  idServicos: string | number;
  token: string;
}

const PedidoScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [descricaoPedido, setDescricaoPedido] = useState<string>(''); // Descrição do pedido
  const [idServicos, setIdServicos] = useState<string | number>(1); // ID do serviço
  const [data, setData] = useState<any>(null); // Resposta da API
  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento
  const [error, setError] = useState<boolean>(false); // Estado de erro
  const [token, setToken] = useState<string | null>(null); // Token de autenticação

  // // Chama a API para buscar os profissionais
  // useEffect(() => {
  //   getServicos (setData, setLoading, setError);
  // }, []);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setToken(savedToken); // Armazena o token no estado
          console.log('Token obtido do AsyncStorage:', savedToken);
        } else {
          console.log('Nenhum token encontrado no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao buscar o token:', error);
      }
    };
    fetchToken();
  }, []);

  // Função para fazer o POST do pedido
  const postPedido = async ({ descricaoPedido, idServicos }: { descricaoPedido: string; idServicos: string | number }) => {
    setLoading(true);

    // Verifique se o token foi carregado
    const savedToken = await AsyncStorage.getItem('authToken');

    console.log('Token que será enviado:', savedToken);

    if (!savedToken) {
      Alert.alert('Erro', 'Token de autenticação não encontrado.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(
        "/pedido",
        { descricaoPedido, idServicos }, // Corpo da requisição
        {
          headers: {
            Authorization: `Bearer ${savedToken}`, // Usa o token correto
            'Content-Type': 'application/json',
          },
        }
      );

      setData(response.data); // Armazena a resposta da API
      setLoading(false);
    } catch (error: any) {
      console.error('Erro ao enviar o pedido:', error);

      if (error.response) {
        console.log('Erro na resposta da API:', error.response.data);
        Alert.alert('Erro', error.response.data.message || 'Erro ao enviar o pedido.');
      } else {
        Alert.alert('Erro', 'Falha ao conectar ao servidor.');
      }

      setError(true); // Define erro no estado
      setLoading(false); // Para o indicador de carregamento
    }
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navChat}>
        <View style={styles.navContent}>
          <View style={styles.navbar}>
            <Text style={styles.textNav}>Pedido</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <Text style={styles.tab}>Criar um pedido</Text>
          <Text style={styles.tab1}>Agendadas</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Solicitação para <Text style={styles.highlightedText}>Leila Pereira</Text>
        </Text>
        <Text style={styles.category}>Categoria:</Text>
        <Text style={styles.location}>São Paulo, Guainases <Text style={styles.distance}>A 2 km de você</Text></Text>

        <View style={styles.requestDescription}>
          <TextInput
            style={styles.inputDesc}
            placeholder="Solicitação"
            value={descricaoPedido}
            onChangeText={setDescricaoPedido}
          />
        </View>

        <Picker
          selectedValue={idServicos}
          onValueChange={(itemValue) => setIdServicos(itemValue as number)}
        >
          <Picker.Item label="Selecione um serviço"  />  {/* Default invalid option */}
          <Picker.Item label="Pedreiro" value={1} /> {/* ID 1 should correspond to a valid service */}
           {/*<Picker.Item label="Eletricista" value={2} /> Example for other services */}
        </Picker>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={() => postPedido({ descricaoPedido, idServicos })}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>Ocorreu um erro ao enviar o pedido.</Text>}
        {data && <Text style={styles.successText}>Pedido enviado com sucesso!</Text>}
      </View>
    </ScrollView>
  );
};

export default PedidoScreen;
