import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext';

const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState('');  // Armazena a mensagem atual
    const [mensagens, setMensagens] = useState<any[]>([]);  // Armazena todas as mensagens
    const { roomId, idContratante } = route.params;  // Recebe o roomId da rota
    const { user } = useContext(myContext);  // Pega o usuário autenticado (o cliente) do contexto
    const scrollViewRef = useRef<ScrollView>(null);  // Ref para ScrollView
    const [buttonScale] = useState(new Animated.Value(1));

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
        }
    };

    // Função para enviar mensagem
    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;  // Evita enviar mensagens vazias
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token não encontrado');
                Alert.alert('Erro', 'Token de autenticação não encontrado.');
                return;
            }
            await api.post('/chat/send', {
                roomId,  // ID da sala de chat
                message: mensagem,  // Mensagem a ser enviada
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            // Atualiza as mensagens com a nova mensagem enviada
            setMensagens((prevMensagens) => [...prevMensagens, { message: mensagem, senderId: user?.idContratante }]);
            setMensagem('');  // Limpa a mensagem
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            Alert.alert('Erro', 'Houve um problema ao enviar a mensagem.');
        }
    };

    // Configuração do Pusher para receber mensagens em tempo real
    useEffect(() => {
        const pusher = user?.pusher;  // Certifique-se de que o Pusher é acessível no contexto

        if (pusher) {
            const channel = pusher.subscribe(`channel.${roomId}`);
            channel.bind('SendRealTimeMessage', (data: { message: string; senderId: string }) => {
                if (data && data.message && data.senderId) {
                    // Atualiza as mensagens com a mensagem recebida
                    setMensagens((prevMensagens) => [...prevMensagens, { message: data.message, senderId: data.senderId }]);
                } else {
                    console.error('Dados recebidos não estão no formato esperado:', data);
                }
            });

            return () => {
                channel.unbind_all();
                pusher.unsubscribe(`channel.${roomId}`);
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

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.navChat}>
                <View style={styles.navContent}>
                    <View style={styles.navbar}>
                        <Text style={styles.textNav}>Chat</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.mensagensContainer} ref={scrollViewRef}>
    {mensagens.map((msg, index) => {
        const isContratado = msg.senderId === user?.idContratado; // Verifique se o ID do remetente é igual ao ID do usuário autenticado
        return (
            <View key={index} style={{
                alignSelf: isContratado ? 'flex-end' : 'flex-start',
                backgroundColor: isContratado ? '#87CEFA' : '#f1f1f1',
                borderRadius: 10,
                padding: 10,
                maxWidth: '70%',
                marginVertical: 5,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
            }}>
                <Text style={{ fontWeight: 'bold', color: isContratado ? '#000' : '#333' }}>
                    {isContratado ? 'Você:' : 'Outro:'}
                </Text>
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
    );
};

export default Chat;
