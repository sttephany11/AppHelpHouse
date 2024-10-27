import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext'; // Usando o contexto para acessar o Pusher

const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem atual
    const [mensagens, setMensagens] = useState<any[]>([]); // Estado para armazenar as mensagens
    const { roomId } = route.params;
    const { user, pusherRef } = useContext(myContext); // Acessa o contexto global (inclui o Pusher)
    const scrollViewRef = useRef<ScrollView>(null); // Ref para scroll automático
    const [buttonScale] = useState(new Animated.Value(1)); // Animação do botão de envio


    useEffect(() => {
        const interval = setInterval(() => {
          setReload(prevReload => !prevReload); // Toggle state to force reload
        }, 2000); // Reload every 5 seconds
      
        return () => clearInterval(interval); // Cleanup on component unmount
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
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
            Alert.alert('Erro', 'Não foi possível buscar mensagens.');
        }
    };

    // Função para enviar mensagem
    const enviarMensagem = async () => {
        if (!mensagem.trim()) return;
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
            // Atualiza a lista de mensagens localmente
            setMensagens((prevMensagens) => [
                ...prevMensagens,
                { message: mensagem, senderId: user?.idContratante }
            ]);
            setMensagem(''); // Limpa o campo de mensagem após o envio
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            Alert.alert('Erro', 'Houve um problema ao enviar a mensagem.');
        }
    };

    // Usa o Pusher do contexto para lidar com eventos em tempo real
    useEffect(() => {
        if (pusherRef.current) {
            const channel = pusherRef.current.subscribe(`channel.${roomId}`);

            // Lidar com a inscrição no canal
            channel.bind('pusher:subscription_succeeded', () => {
                console.log('Inscrição no canal bem-sucedida!');
            });

            // Lidar com o recebimento de novas mensagens em tempo real
            channel.bind('SendRealTimeMessage', (data: { message: string; senderId: string }) => {
                if (data && data.message && data.senderId) {
                    setMensagens((prevMensagens) => [
                        ...prevMensagens,
                        { message: data.message, senderId: data.senderId },
                    ]);
                } else {
                    console.error('Dados recebidos não estão no formato esperado:', data);
                }
            });

            // Cleanup: Desinscreve-se do canal ao desmontar o componente
            return () => {
                channel.unbind_all();
                pusherRef.current.unsubscribe(`channel.${roomId}`);
            };
        } else {
            console.error('Pusher não foi inicializado corretamente.');
        }
    }, [pusherRef, roomId]);

    // Carrega as mensagens da sala ao montar o componente
    useEffect(() => {
        fetchMensagens();
    }, [roomId]);

    // Rola o ScrollView para o final sempre que as mensagens mudarem
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [mensagens]);

    // Função para sair da sala de chat
    const logoutUser = () => {
        if (pusherRef.current) {
            const channel = pusherRef.current.subscribe(`channel.${roomId}`);
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
                    const isContratante = msg.senderId === user?.idContratante;
                    return (
                        <View
                            key={index}
                            style={[styles.mensagemItem, {
                                alignSelf: isContratante ? 'flex-end' : 'flex-start',
                                backgroundColor: isContratante ? '#87CEFA' : '#f1f1f1',
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
function setReload(arg0: (prevReload: any) => boolean) {
    throw new Error('Function not implemented.');
}

