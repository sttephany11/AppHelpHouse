import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Image, Pressable, Animated, ScrollView } from 'react-native';
import styles from '../css/chatCss';  // Certifique-se de ajustar o estilo
import Imagens from "../../img/img";
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pusher from 'pusher-js';
import myContext from '../functions/authContext';  // Para pegar o ID do usuário autenticado

const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState('');  // Armazena a mensagem atual
    const [mensagens, setMensagens] = useState<any[]>([]);  // Armazena todas as mensagens
    const { roomId } = route.params;  // Recebe o roomId da rota
    const { user } = useContext(myContext);  // Pega o usuário autenticado do contexto
    const [token, setToken] = useState<string | null>(null);  // Token de autenticação
    const [buttonScale] = useState(new Animated.Value(1));
    const scrollViewRef = useRef<ScrollView>(null);  // Ref para ScrollView

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
        }
    };

    // Função para enviar mensagem
    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;  // Evita enviar mensagens vazias
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
            const response = await api.post('/chat/send', {
                roomId,  // ID da sala de chat
                message: mensagem,  // Mensagem a ser enviada
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setMensagens([...mensagens, response.data.message]);  // Atualiza as mensagens
            setMensagem('');  // Limpa a mensagem
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    // Configuração do Pusher para receber mensagens em tempo real
    useEffect(() => {
        const pusher = new Pusher('c58eb1455bc63e559d2c', {
            cluster: 'sa1',
        });

        const channel = pusher.subscribe(`chat-room-${roomId}`);
        channel.bind('new-message', (data: { message: any; }) => {
            setMensagens((prevMensagens) => [...prevMensagens, data.message]);  // Atualiza as mensagens
        });

        return () => {
            pusher.unsubscribe(`chat-room-${roomId}`);
        };
    }, [roomId]);

    // Carregar mensagens da sala ao montar o componente
    useEffect(() => {
        fetchMensagens();
    }, [roomId]);

    // Rolar o ScrollView para o final sempre que as mensagens mudarem
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [mensagens]);

    // Animação do botão de envio
    const onPressIn = () => {
        Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }).start();
    };

    const onPressOut = () => {
        Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
    };

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

            {/* Exibe as mensagens do chat */}
            <ScrollView style={styles.mensagensContainer} ref={scrollViewRef}>
                {mensagens.map((msg, index) => {
                    const isCurrentUser = msg.senderId === user?.id;  // Verifica se a mensagem foi enviada pelo usuário atual
                    return (
                        <View
                            key={index}
                            style={[
                                styles.mensagemItem,
                                { 
                                  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',  // Mensagem do usuário à direita
                                  backgroundColor: isCurrentUser ? '#87CEFA' : '#f1f1f1',  // Diferenciar cor entre mensagens
                                  borderRadius: 10, 
                                  padding: 10,
                                  maxWidth: '70%'  // Limitar a largura da mensagem
                                }
                            ]}
                        >
                            <Text>{msg.message}</Text>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Input para enviar mensagem */}
            <View style={styles.enviarMensagem}>
                <View style={styles.inputContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChangeText={setMensagem}  // Atualiza o estado com o valor digitado
                    />
                    <Animated.View style={[styles.enviar, { transform: [{ scale: buttonScale }] }]}>
                        <Pressable
                            onPress={enviarMensagem}
                            onPressIn={onPressIn}  // Animação ao pressionar
                            onPressOut={onPressOut}  // Animação ao soltar
                        >
                            <Image source={Imagens.iconEnviar} style={styles.icon} />
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default Chat;