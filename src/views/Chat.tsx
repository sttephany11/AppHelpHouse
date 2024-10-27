import React, { useState, useEffect, useRef, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, View, TextInput, Image, Pressable, Animated, ScrollView, Alert, Modal } from 'react-native';
import styles from '../css/chatCss';
import Imagens from "../../img/img";
import api from '../../axios';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myContext from '../functions/authContext'; // Usando o contexto para acessar o Pusher
import modalAvaliacao from '../../componentes/Modal/avaliacao';

const Chat: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [mensagem, setMensagem] = useState('');
    const [mensagens, setMensagens] = useState<any[]>([]);
    const { roomId , idContratante, } = route.params;
    const { user } = useContext(myContext); // Acessa o contexto do usuário, incluindo o Pusher
    const scrollViewRef = useRef<ScrollView>(null);
    const [buttonScale] = useState(new Animated.Value(1));
    const [chamarModal, setChamarModal] = useState(false);
    const [rating, setRating] = useState(0); // Estado para armazenar a quantidade de estrelas selecionadas
    

    //tentando mandar os dados do cli na avaliacao
    const [dataContratante, setDataContratante] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    
   


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

    
    //Criando função para avaliar profissional

     // Buscar dados do contratante
     {/*useEffect(() => {
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
    */}

    const handleStarPress = (star) => {
        setRating(star);
    };

    const EnviarAvaliacao = () => {
        setChamarModal(false);
        //const { nomeContratante } = dataContratante;
        navigation.navigate('perfilProfissional', { 
            rating, 
            idContratante, 
           
        });
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
                                        name={star <= rating ? 'star' : 'star-outline'}
                                        size={32}
                                        color={star <= rating ? '#FFD700' : '#D3D3D3'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

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
function setReload(arg0: (prevReload: any) => boolean) {
    throw new Error('Function not implemented.');
}

