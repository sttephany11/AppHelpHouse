import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Image, Pressable, Animated, ScrollView } from 'react-native';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import styles from '../css/chatCss'; // Importa o arquivo de estilos
import Imagens from "../../img/img";
import api from '../../axios'; // Para fazer requisições ao backend
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para recuperar o token
import Pusher from 'pusher-js';  // Pusher importado

const ChatContratante: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState(''); // Armazena a mensagem
    const [mensagens, setMensagens] = useState<any[]>([]); // Armazena todas as mensagens da sala de chat
    const [token, setToken] = useState<string | null>(null); // Armazena o token do usuário
    const { idContratante } = route.params; // Recebe o idContratante passado pela rota
    const [buttonScale] = useState(new Animated.Value(1));
    const scrollViewRef = useRef<ScrollView>(null); // Ref para o ScrollView

    // Função para buscar mensagens da sala
    const fetchMensagens = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
            const response = await api.get(`/chat/messages/${idContratante}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMensagens(response.data.messages);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        }
    };

    // Função para enviar mensagem
    const enviarMensagem = async () => {
        if (!mensagem.trim()) return; // Evita enviar mensagens vazias
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
            const response = await api.post('/chat/send', {
                roomId: idContratante, // Usando o idContratante como roomId
                message: mensagem, // Mensagem a ser enviada
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            setMensagens([...mensagens, response.data.message]); // Atualiza a lista de mensagens
            setMensagem(''); // Limpa a mensagem
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    // Configuração do Pusher para receber mensagens em tempo real
    useEffect(() => {
        const pusher = new Pusher('c58eb1455bc63e559d2c', {
            cluster: 'sa1',
        });

        const channel = pusher.subscribe(`chat-room-${idContratante}`);
        channel.bind('new-message', (data: { message: any; }) => {
            setMensagens((prevMensagens) => [...prevMensagens, data.message]); // Atualiza as mensagens
        });

        return () => {
            pusher.unsubscribe(`chat-room-${idContratante}`);
        };
    }, [idContratante]);

    // Carregar mensagens da sala quando o componente é montado
    useEffect(() => {
        fetchMensagens();
    }, [idContratante]);

    // Rolar o ScrollView até o final sempre que as mensagens mudarem
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
                    const isCurrentUser = msg.senderId === 'currentUserId'; // Substitua 'currentUserId' pelo valor correto
                    return (
                        <View
                            key={index}
                            style={[
                                styles.mensagemItem,
                                { alignSelf: isCurrentUser ? 'flex-end' : 'flex-start', backgroundColor: isCurrentUser ? '#f1f1f1' : '#87CEFA' },
                            ]}
                        >
                            <Text>{msg.message}</Text>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Input de enviar mensagem */}
            <View style={styles.enviarMensagem}>
                <View style={styles.inputContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChangeText={setMensagem} // Atualiza o estado com o valor digitado
                    />
                    <Animated.View style={[styles.enviar, { transform: [{ scale: buttonScale }] }]}>
                        <Pressable
                            onPress={enviarMensagem}
                            onPressIn={onPressIn} // Reduz a escala quando pressionado
                            onPressOut={onPressOut} // Volta à escala normal ao soltar
                        >
                            <Image source={Imagens.iconEnviar} style={styles.icon} />
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default ChatContratante;
