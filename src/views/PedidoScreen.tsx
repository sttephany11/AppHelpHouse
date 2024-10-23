import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TextInput, ActivityIndicator, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import styles from '../css/criarPedidoCss';
import api from "../../axios"; // Importa a instância do Axios
import { getServicos } from "../functions/getServico";
import AntDesign from '@expo/vector-icons/AntDesign';
import Imagens from "../../img/img";

const PedidoScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { nomeContratado, bairroContratado, idContratado } = route.params; // Recebe o idContratado
  const [descricaoPedido, setDescricaoPedido] = useState<string>('');
  const [tituloPedido, setTituloPedido] = useState<string>('');
  const [idServicos, setIdServicos] = useState<string | number>(1);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [pedidoEnviado, setPedidoEnviado] = useState<boolean>(false);

  const voltarPro = () => {
    navigation.navigate('profissionais');
  };

  const voltarHome = () => {
    navigation.navigate('homeStack');
  };

  // Busca o token armazenado no AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setToken(savedToken); // Armazena o token
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

  // Chama a API para buscar os serviços
  useEffect(() => {
    getServicos(setData, setLoading, setError);
  }, []);

  // Função para fazer o POST do pedido
  const postPedido = async ({ descricaoPedido, idServicos }: { descricaoPedido: string; idServicos: string | number }) => {
    setLoading(true);
    const savedToken = await AsyncStorage.getItem('authToken');

    if (!savedToken) {
      Alert.alert('Erro', 'Token de autenticação não encontrado.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/pedido",
        { descricaoPedido, idServicos, idContratado, tituloPedido }, // Inclui idContratado e tituloPedido
        {
          headers: {
            Authorization: `Bearer ${savedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setData(response.data);
      setPedidoEnviado(true);
      setLoading(false);
    } catch (error: any) {
      console.error('Erro ao enviar o pedido:', error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <ImageBackground
    source={Imagens.fundoBemVindo}
    style={styles.background}
    resizeMode="cover"
  >

  
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.navChat}>
        <View style={styles.navContent}>
          <View style={styles.navbar}>
          <AntDesign name="leftcircle" size={30} color="#fff" style={{ marginLeft: 15 }} onPress={voltarPro} />
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
          Solicitação para <Text style={styles.highlightedText}>{nomeContratado}</Text>
        </Text>
        <Text style={styles.category}>Categoria:</Text>
        <Text style={styles.location}>São Paulo, {bairroContratado} <Text style={styles.distance}>A 2 km de você</Text></Text>


        <TextInput
          style={styles.inputTitulo}
          placeholder="Título"
          value={tituloPedido}
          onChangeText={setTituloPedido}
        />

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
          <Picker.Item label="Selecione um serviço" value="" />
          {Array.isArray(data) && data.map((servico, i) => (
            <Picker.Item key={i} label={servico.nomeServicos} value={servico.idServicos} />
          ))}
        </Picker>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            postPedido({ descricaoPedido, idServicos });
            voltarHome();
          }}
>
  <Text style={styles.submitButtonText}>Enviar</Text>
</TouchableOpacity>
        )}

        {error && <Text style={styles.errorText}>Ocorreu um erro ao enviar o pedido.</Text>}
        {pedidoEnviado && <Text style={styles.successText}>Pedido enviado com sucesso!</Text>}
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

export default PedidoScreen;
