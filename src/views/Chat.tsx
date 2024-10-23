import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext'; // Usando o contexto para acessar o Pusher

const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState<any[]>([]);
    const { roomId } = route.params;
    const { user } = useContext(myContext); // Acessa o contexto do usuário, incluindo o Pusher
    const scrollViewRef = useRef<ScrollView>(null);
    const [buttonScale] = useState(new Animated.Value(1));

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
            console.log("Mensagens carregadas com sucesso:", response.data.messages); // Log das mensagens carregadas
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

    // Carregar mensagens da sala ao montar o componente
    useEffect(() => {
        fetchMensagens();
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

    return (
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
            </View>
        </View>
    );
};

export default Chat;
