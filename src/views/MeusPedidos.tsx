import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert , ImageBackground} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import Imagens from "../../img/img";
import styles from '../css/MeusPedidosCss';
import myContext from '../functions/authContext'; 

interface Profissional {
  idContratado: string;
  nomeContratado: string;
}

interface Pedido {
 
  idSolicitarPedido: number;
  tituloPedido: string;
  contratado: Profissional;
}

const MeusPedidos: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { user } = useContext(myContext); 

  // Fetch token from AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setToken(savedToken);
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

  // Function to fetch pedidos of the contratante
  const getContratantePedidos = async (idContratante: string) => {
    try {
      console.log('Fazendo requisição para ID:', idContratante);  // Log do ID do contratante
      console.log('Token enviado:', token);  // Log do token
      const response = await api.get(`/meusPedidos/${idContratante}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Certifique-se de que o token é válido
          'Content-Type': 'application/json',
        },
      });
      console.log('Dados dos pedidos:', response.data.pedidos);  // Verifique a resposta da API
      return response.data.pedidos;
    } catch (error: any) {
      console.error('Erro ao buscar pedidos:', error.response ? error.response.data : error.message);
      throw new Error(error.response?.data?.error || 'Erro ao buscar pedidos.');
    }
  };
  
  // Fetch pedidos when the component loads
  useEffect(() => {
    const fetchPedidos = async () => {
      if (!user || !user.idContratante) {
        Alert.alert('Erro', 'ID do contratante não encontrado ou usuário não autenticado.');
        return;
      }

      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      setLoading(true);
      try {
        const pedidosData = await getContratantePedidos(user.idContratante);
        setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
      } catch (error: any) {
        console.error('Erro ao buscar pedidos:', error);
        setError(error.message || 'Ocorreu um erro ao carregar os pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, [user, token]);

  const voltarHome = () => {
    navigation.navigate('homeStack');
  };


  const createChatRoom = async (idContratante: string, idContratado: string, navigation: any) => {
    if (!idContratante || !idContratado) {
        Alert.alert('Erro', 'ID do contratante ou contratado não encontrado.');
        return;
    }

    try {
        console.log(`Tentando  obter a sala de chat para ID do contratado: ${idContratado}`);
        const response = await api.post(`/chat-room/${idContratado}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const roomId = response.data.chat_room?.id;  // Obter o roomId da resposta da API

        if (roomId) {
            console.log(`Sala de chat criada ou encontrada com sucesso: ${roomId}`);
            navigation.navigate('Chat', { roomId });  // Passa o roomId ao navegar para o chat
        } else {
            Alert.alert('Erro', 'Não foi possível criar ou encontrar a sala de chat.');
            console.error('Erro: roomId não encontrado na resposta da API.');
        }
    } catch (error: any) {
        console.error('Erro ao criar ou buscar a sala de chat:', error.response ? error.response.data : error.message);
        Alert.alert('Erro', 'Houve um problema ao criar a sala.');
    }
};


  return (
    <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >

  
    <View style={styles.container}>
      <View style={styles.navContent}>
        <View style={styles.navbar}>
          <TouchableOpacity>
            <AntDesign name="leftcircle" size={30} color="#fff" style={{ marginLeft: 15 }} onPress={voltarHome} />
          </TouchableOpacity>
          <Text style={styles.textNav}>Pedidos</Text>
        </View>
        <View style={styles.tabs}>
          <Text style={styles.tab}>Agendados</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : pedidos.length === 0 ? (
        <Text style={{marginTop:20,marginLeft:40}}>Nenhum pedido encontrado.</Text>
      ) : (
        <ScrollView>
          {pedidos.map((pedido) => (
            <View key={pedido.idSolicitarPedido} style={styles.cardContainer}>
              <Text style={styles.cardTitle}>{pedido.tituloPedido}</Text>
              <Text style={styles.cardSubtitle}>
                Profissional: <Text style={styles.clienteName}>{pedido.contratado.nomeContratado ?? 'Desconhecido'}</Text>
              </Text>
              <Text style={styles.cardLocation}>
                {user.cidadeContratado}, {user.bairroContratado} 
                <Text style={styles.cardDistance}> à 2 km de você</Text>
              </Text>
              <Text style={styles.cardDate}>Data e hora: 24/10 às 14:00</Text>
              <Text style={styles.cardPayment}>Situação do pagamento: Sinal R$50,00</Text>

              <TouchableOpacity style={styles.conversarButton}
              onPress={()=>createChatRoom(user.idContratante, pedido.contratado.idContratado, navigation )}>

                <Text style={styles.conversarText}>Conversar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
    </ImageBackground>
  );
};

export default MeusPedidos;
