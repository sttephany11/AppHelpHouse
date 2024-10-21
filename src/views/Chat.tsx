import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Image, Pressable, Animated, ScrollView } from 'react-native';
import Pusher from 'pusher-js'; // Importar o Pusher
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext'; // Pega o ID do usuário autenticado

const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState(''); // Armazena a mensagem atual
    const [mensagens, setMensagens] = useState<any[]>([]); // Armazena todas as mensagens
    const { roomId } = route.params; // Recebe o roomId da rota
    const { user } = useContext(myContext); // Pega o usuário autenticado
    const [buttonScale] = useState(new Animated.Value(1));
    const scrollViewRef = useRef<ScrollView>(null); // Ref para ScrollView

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
        if (!mensagem.trim()) return; // Evita enviar mensagens vazias
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                console.error('Token não encontrado');
                return;
            }
            // Envia a mensagem para o backend
            await api.post('/chat/send', {
                roomId, // ID da sala de chat
                message: mensagem, // Mensagem a ser enviada
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            // A mensagem enviada é adicionada imediatamente no frontend
            setMensagens((prevMensagens) => [
                ...prevMensagens,
                { message: mensagem, senderId: user?.idContratado } // Adiciona senderId
            ]);
            setMensagem(''); // Limpa a mensagem
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    // Conectar ao Pusher para mensagens em tempo real
    useEffect(() => {
        const pusher = new Pusher('c58eb1455bc63e559d2c', {
            cluster: 'sa1',
        });

        // Subscribes to the roomId channel
        const channel = pusher.subscribe(`chat-${roomId}`);

        // Listening for new messages
        channel.bind('new-message', function (data: any) {
            // Adiciona a nova mensagem recebida ao estado
            setMensagens((prevMensagens) => [
                ...prevMensagens,
                { message: data.message, senderId: data.senderId }
            ]);
        });

        // Cleanup the subscription on component unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
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
                    const isContratado = msg.senderId === user?.idContratado;
                    const isContratante = msg.senderId === user?.idContratante;
                    
                    let alignSelfStyle: "flex-start" | "flex-end" = "flex-start";
                    let backgroundColor = '#f1f1f1';

                    if (isContratado) {
                        alignSelfStyle = 'flex-end';
                        backgroundColor = '#87CEFA';
                    }

                    return (
                        <View
                            key={index}
                            style={[
                                styles.mensagemItem,
                                {
                                    alignSelf: alignSelfStyle,
                                    backgroundColor: backgroundColor,
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

            {/* Input para enviar mensagem */}
            <View style={styles.enviarMensagem}>
                <View style={styles.inputContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua mensagem..."
                        value={mensagem}
                        onChangeText={setMensagem}
                    />
                    <Animated.View style={[styles.enviar, { transform: [{ scale: buttonScale }] }]}>
                        <Pressable
                            onPress={enviarMensagem}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
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
