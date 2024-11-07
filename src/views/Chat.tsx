import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert, Modal } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext'; // Usando o contexto para acessar o Pusher

  
  interface Props {
    navigation: any;
    route: any;  // Adicionando a rota para receber parâmetros
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

    //tentando mandar os dados do cli na avaliacao
    const [dataContratante, setDataContratante] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    
   

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

   

    const handleStarPress = (star) => {
        setRating(star);
    };

    const EnviarAvaliacao = async () => {
        const idContratante = user.idContratante;
        
        setChamarModal(false);
    
        try {
            // Recupera o token de autenticação do AsyncStorage
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
    
         // Envio da avaliação com todos os dados
      const response = await api.post('/avaliacao', {
        ratingAvaliacao,
        descavaliacao,
        idContratado,
        idContratante: user.idContratante
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
      setRating(0);
      setDescavaliacao('');
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      Alert.alert('Erro', 'Houve um problema ao enviar a avaliação.');
    }
  };
    
    

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.navChat}>
                <View style={styles.navContent}>
                    <View style={styles.navbar}>
                        <Text style={styles.textNav}>Chat</Text>
                        <TouchableOpacity onPress={() => setChamarModal(true)} style={styles.botaoPDF}>
                            <Text style={styles.textoBotao}>Avaliar profissional</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={logoutUser}>
                        <Text style={{ color: 'red', fontWeight: 'bold' }}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.mensagensContainer} ref={scrollViewRef}>
                {mensagens.map((msg, index) => {
                    const isContratado = msg.senderId === user?.idContratado;

                    return (
                        <View
                            key={index}
                            style={[styles.mensagemItem, {
                                alignSelf: isContratado ? 'flex-end' : 'flex-start',
                                backgroundColor: isContratado ? '#87CEFA' : '#f1f1f1',
                                borderRadius: 10,
                                padding: 10,
                                maxWidth: '70%',
                            }]}>
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

                {/* Modal de Avaliação */}
                <Modal
                transparent={true}
                visible={chamarModal}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Avalie com estrelas:</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                                    <Ionicons
                                        name={star <= ratingAvaliacao ? 'star' : 'star-outline'}
                                        size={32}
                                        color={star <= ratingAvaliacao ? '#FFD700' : '#D3D3D3'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={{ fontSize: 18,  }}>Adicione um comentário:</Text>
                        <TextInput
                        style={styles.input2}
                        placeholder="Escreva um comentário..."
                        placeholderTextColor="#888"
                        value={descavaliacao}
                        onChangeText={setDescavaliacao}
                        
                    />

                        <TouchableOpacity style={styles.submitButton} onPress={EnviarAvaliacao}>
                            <Text style={{ fontSize: 18, color: 'white' }}>Enviar Avaliação</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setChamarModal(false)}>
                            <Text style={{ fontSize: 16, color: 'red', marginTop: 10 }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            </View>
        </View>
    );
};

export default Chat;
