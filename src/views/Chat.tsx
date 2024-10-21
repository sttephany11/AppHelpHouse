import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert, } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Pusher from 'pusher-js';
import myContext from '../functions/authContext';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {

    //chat
    const [mensagem, setMensagem] = useState('');  // Armazena a mensagem atual
    const [mensagens, setMensagens] = useState<any[]>([]);  // Armazena todas as mensagens
    const { roomId, idContratante } = route.params;  // Recebe o roomId da rota
    const { user } = useContext(myContext);  // Pega o usuário autenticado (o profissional) do contexto
    const [token, setToken] = useState<string | null>(null);  // Token de autenticação
    const [buttonScale] = useState(new Animated.Value(1));
    const scrollViewRef = useRef<ScrollView>(null); // Ref para ScrollView

    //PDF
    const [dataContratante, setDataContratante] = useState<any>(null);
    const [dataContratado, setDataContratado] = useState<any>(null);
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


    // Buscar dados do contratado
    useEffect(() => {
        const fetchDataContratado = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/pro/${user.idContratado}`);
                setDataContratado(response.data);
            } catch (err: any) {
                setError(err.message);
                Alert.alert('Erro ao buscar dados do Contratado', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDataContratado();
    }, [user.idContratado]);

    // Buscar dados do contratante
    useEffect(() => {
        const fetchDataContratante = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/cli/${idContratante}`);
                setDataContratante(response.data);
            } catch (err: any) {
                setError(err.message);
                Alert.alert('Erro ao buscar dados do Contratante', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDataContratante();
    }, [idContratante]);

    const createPDF = async () => {
        if (!dataContratante || !dataContratado) {
          Alert.alert('Erro', 'Nenhum dado disponível para gerar o PDF.');
          return;
        }
      
        // Extraindo os campos específicos
        const { nomeContratante, cpfContratante } = dataContratante;
        const { nomeContratado, cpfContratado } = dataContratado;
      
        // HTML reduzido do contrato sem assinatura
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Contrato</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 10px; font-size: 14px; }
              h1 { text-align: center; color: navy; font-size: 18px; }
              h2 { color: navy; font-size: 16px; margin-bottom: 5px; }
              p { margin: 5px 0; }
              .section { margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>Contrato de Serviços</h1>
      
            <div class="section">
              <h2>Contratante</h2>
              <p><strong>Nome:</strong> ${nomeContratante}</p>
              <p><strong>CPF:</strong> ${cpfContratante}</p>
            </div>
      
            <div class="section">
              <h2>Contratado</h2>
              <p><strong>Nome:</strong> ${nomeContratado}</p>
              <p><strong>CPF:</strong> ${cpfContratado}</p>
            </div>
      
            <div class="section">
              <h2>Serviços</h2>
              <p>O contratante solicita os serviços do contratado conforme acordado entre as partes.</p>
            </div>
      
            <div class="section">
              <h2>Termos</h2>
              <p>1. O contratado prestará os serviços conforme descrito.</p>
              <p>2. O contratante pagará o valor acordado pelos serviços.</p>
            </div>
          </body>
          </html>
        `;
      
        try {
          // Gera o PDF
          const { uri } = await Print.printToFileAsync({ html });
      
          // Compartilha o PDF gerado
          await Sharing.shareAsync(uri);
          Alert.alert('PDF gerado e compartilhado com sucesso!');
        } catch (err) {
          // Usar asserção de tipo para acessar a mensagem do erro
          const error = err as Error;  // Asserindo que err é do tipo Error
          Alert.alert('Erro ao gerar o PDF', error.message);
        }
      };
      
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.navChat}>
                <View style={styles.navContent}>
                    <View style={styles.navbar}>
                        <Text style={styles.textNav}>Chat</Text>
                        <TouchableOpacity onPress={createPDF} style={styles.botaoPDF}>
                            <Text style={styles.textoBotao}>Gerar PDF</Text>
                        </TouchableOpacity>
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
