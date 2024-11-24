import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert, Modal, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext'; // Usando o contexto para acessar o Pusher
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Expo Icons
import AntDesign from '@expo/vector-icons/AntDesign';


//imagem
import { useImage } from '../ImageContext';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'




interface Props {
  navigation: any;
  route: any;  // Adicionando a rota para receber parâmetros
}
interface Pedido {
  idSolicitarPedido: number;
  descricaoPedido: string;
  tituloPedido: string;
  contrato: Contrato; // Verifique se a estrutura corresponde à resposta da API
}


interface Contrato {
  id: number;
  idSolicitarPedido: number;
  valor: string;
  data: string;
  hora: string;
  desc_servicoRealizado: string;
  forma_pagamento: string;
}




const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState<any[]>([]);
  const { roomId, idContratado } = route.params;
  const { user } = useContext(myContext); // Acessa o contexto do usuário, incluindo o Pusher
  const scrollViewRef = useRef<ScrollView>(null);
  const [buttonScale] = useState(new Animated.Value(1));
  const [chamarModal, setChamarModal] = useState(false);
  const [ratingAvaliacao, setRating] = useState(0);
  const [descavaliacao, setDescavaliacao] = useState('');
  const [contratos, setContratos] = useState<Pedido[]>([]);
  const [denuncia, setDenuncia] = useState('');
  const [descricao, setDescricao] = useState('');

  const [isModalVisible, setModalVisible] = useState(false); // Estado do modal

  const [loading, setLoading] = useState(true);

  const idCli = user.idContratante

  //CONTRATOS

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await api.get(`/contratos/recebidos/${user.idContratante}`);
        // console.log(response.data); // Inspecione a estrutura dos dados aqui
        setContratos(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os contratos.');
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);



  // Função para buscar mensagens da sala
  const fetchMensagens = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
      const response = await api.get(`/chat/messages/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagens(response.data.messages);
      // console.log("mensagem: ", response.data.messages);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
      Alert.alert('Erro', 'Não foi possível buscar mensagens.');
    }
  };

  // Função para enviar mensagem
  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;
    console.log("Enviando mensagem:", mensagem); // Log da mensagem que será enviada

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Token não encontrado');
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }
      await api.post('/chat/send', {
        roomId,
        message: mensagem,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Mensagem enviada com sucesso."); // Log de sucesso no envio

      setMensagens((prevMensagens) => [
        ...prevMensagens,
        { message: mensagem, senderId: user?.idContratado }
      ]);
      setMensagem('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro', 'Houve um problema ao enviar a mensagem.');
    }
  };

  // Usa o Pusher do contexto
  useEffect(() => {
    if (user?.pusher) {
      console.log("Iniciando inscrição no Pusher..."); // Log do início da inscrição

      const channel = user.pusher.subscribe(`channel.${roomId}`);

      channel.bind('pusher:subscription_succeeded', () => {
        console.log('Inscrição no canal bem-sucedida!');
      });

      channel.bind('SendRealTimeMessage', (data: { message: string; senderId: string }) => {
        console.log("Mensagem recebida via Pusher:", data); // Log das mensagens recebidas em tempo real

        if (data && data.message && data.senderId) {
          setMensagens((prevMensagens) => [
            ...prevMensagens,
            { message: data.message, senderId: data.senderId },
          ]);
        } else {
          console.error('Dados recebidos não estão no formato esperado:', data);
        }
      });

      return () => {
        console.log("Desinscrevendo do canal..."); // Log quando o componente é desmontado

        channel.unbind_all();
        user.pusher.unsubscribe(`channel.${roomId}`);
      };
    } else {
      console.error('Pusher não foi inicializado corretamente.');
    }
  }, [user, roomId]);

  // Recarregar as mensagens a cada 5 segundos
  useEffect(() => {
    fetchMensagens(); // Busca inicial de mensagens
    const intervalId = setInterval(() => {
      fetchMensagens(); // Recarregar mensagens a cada 5 segundos
    }, 1000);

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, [roomId]);

  // Rolar o ScrollView para o final sempre que as mensagens mudarem
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [mensagens]);

  const logoutUser = () => {
    if (user?.pusher) {
      console.log("Desconectando e desinscrevendo o Pusher..."); // Log de logout e desconexão do Pusher

      const channel = user.pusher.subscribe(`channel.${roomId}`);
      channel.unbind_all();
      channel.unsubscribe();
    }
    AsyncStorage.removeItem('authToken');
    navigation.navigate('Login');
  };




  useEffect(() => {

    const fetchDadosCli = async () => {
      try {
        const response = await api.get(`cli/${idCli}`);
        const nomeContratante = response.data.nomeContratante;
        console.log(nomeContratante);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error fetching user data';
        console.error('Error fetching user data:', errorMessage);
      }
    };
    fetchDadosCli();
  }, []);





  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.navChat}>
          <View style={styles.navContent}>
            <View style={styles.navbar}>
              <Text style={styles.textNav}>Chat</Text>
  
            </View>

            <TouchableOpacity onPress={logoutUser}>
              <Text style={{ color: 'red', fontWeight: 'bold' }}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.mensagensContainer} ref={scrollViewRef}>
          {mensagens.map((msg, index) => {
            // Verificar se a mensagem foi enviada pelo contratante ou pelo contratado
            const isContratante = msg.idContratante === user.idContratante;
            const cor = isContratante ? "#FFD580" : "#ADD8E6"; // Laranja claro para contratante, azul claro para contratado
            const alinhamento = isContratante ? "flex-end" : "flex-start";

            return (
              <View
                key={index}
                style={[
                  styles.mensagemItem,
                  {
                    alignSelf: alinhamento,
                    backgroundColor: cor,
                    borderRadius: 10,
                    padding: 10,
                    maxWidth: '70%',
                  },
                ]}
              >
                <Text>{msg.message}</Text>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.enviarMensagem}>
          <View style={styles.inputContent}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem..."
              value={mensagem}
              onChangeText={setMensagem}
            />
            <Animated.View style={[styles.enviar, { transform: [{ scale: buttonScale }] }]}>
              <Pressable onPress={enviarMensagem}>
                <Image source={Imagens.iconEnviar} style={styles.icon} />
              </Pressable>
            </Animated.View>
          </View>




       


        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
