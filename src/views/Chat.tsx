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
        console.log(response.data); // Inspecione a estrutura dos dados aqui
        setContratos(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os contratos.');
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);




  // Toggle para exibir ou esconder o modal denuncia e o back do check box
  const toggleModal = () => {
    setModalVisible(true);

  };
  const fechaModal = () => {
    setModalVisible(false);
  }

  const fetchDenuncia = async ({ descricao }: { descricao: String }) => {
    const selectedCategory = Object.keys(selectedOptions).find(
      (key) => selectedOptions[key]
    );

    if (!selectedCategory) {
      Alert.alert("Erro", "Selecione uma categoria.");
      return;
    }

    if (!descricao.trim()) {
      Alert.alert("Erro", "Insira uma descrição para a denúncia.");
      return;
    }

    try {
      const idContratante = user.idContratante;
      const response = await api.post("/denuncia", {
        descricao,
        categoria: selectedCategory,
        idContratante,
        idContratado,
        status: "emAberto",
        imagemDenuncia : imageUrl
      });

      Alert.alert("Sucesso", response.data.message);
      setDenuncia(response.data);
      setModalVisible(false);
    } catch (error) {
      Alert.alert(
        "Erro",
        error.response?.data?.error || "Não foi possível realizar esta denúncia."
      );
    }
  };



  const [selectedOptions, setSelectedOptions] = useState({
    pagamentos: false,
    comportamento: false,
    inacabado: false,
    outros: false,
  });

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };


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
      console.log("mensagem: ", response.data.messages);
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
      const nome = user.nomeContratante
      const imagem = user.imagemContratante

      const response = await api.post('/avaliacao', {
        ratingAvaliacao,
        descavaliacao,
        idContratado,
        idContratante: user.idContratante,
        nome,
        imagem

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



  //funções para imagem funcionar
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { imageUrl, setImageUrl } = useImage();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
    });

    if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
    }
};

const uploadMedia = async () => {
    if (!selectedImage) {
        Alert.alert('Erro', 'Nenhuma imagem selecionada.');
        return;
    }

    setUploading(true);

    try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
        const storageRef = ref(storage, `images/${filename}`);
        await uploadBytes(storageRef, blob);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
        setSelectedImage(null);
        Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
        Alert.alert('Erro', 'Falha ao enviar a imagem.');
    } finally {
        setUploading(false);
    }
};


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
              <TouchableOpacity onPress={() => setChamarModal(true)} style={styles.botaoPDF}>
                <Text style={styles.textoBotao}>Avaliação</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={styles.botaoPDF}>
                <Text style={styles.textoBotao}>Denuncia</Text>
              </TouchableOpacity>
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
                <Text style={{ fontSize: 18, }}>Adicione um comentário:</Text>
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


          {/* Modal de Denuncia */}
         <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
          >
             <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}>
        
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            contratos.map((pedido) =>
              pedido.contrato ? (
                <View key={pedido.contrato.id} style={styles.containerPedidos}>

                  <View style={styles.tituloFundo}>
                    <Text style={styles.tituloModal}>Reportar</Text>
                    <AntDesign name="exclamationcircle" size={29} color="white" style={styles.iconReportar} />
                  </View>

                  <Text style={styles.tituloModal2}>
                    Houve algum problema? Por favor, nos informe o ocorrido, com uma descrição
                  </Text>
                  <Text style={styles.tituloModal3}>
                    e
                    fotos, para que possamos analisar a situação e tomar as medidas cabíveis.
                  </Text>

                  <View style={styles.container2}>
                    <View style={styles.checkboxContainer}>
                      <Pressable onPress={() => handleCheckboxChange('pagamentos')}>
                        {selectedOptions.pagamentos ? (
                          <MaterialIcons name="check-circle" size={24} color="#6200EE" />
                        ) : (
                          <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
                        )}
                      </Pressable>
                      <Text style={styles.label}>Golpe ou fraude</Text>
                    </View>


                    <View style={styles.checkboxContainer}>
                      <Pressable onPress={() => handleCheckboxChange('comportamento')}>
                        {selectedOptions.comportamento ? (
                          <MaterialIcons name="check-circle" size={24} color="#6200EE" />
                        ) : (
                          <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
                        )}
                      </Pressable>
                      <Text style={styles.label}>Assédio sexual</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                      <Pressable onPress={() => handleCheckboxChange('comportamento')}>
                        {selectedOptions.comportamento ? (
                          <MaterialIcons name="check-circle" size={24} color="#6200EE" />
                        ) : (
                          <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
                        )}
                      </Pressable>
                      <Text style={styles.label}>Injúria racial</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                      <Pressable onPress={() => handleCheckboxChange('inacabado')}>
                        {selectedOptions.inacabado ? (
                          <MaterialIcons name="check-circle" size={24} color="#6200EE" />
                        ) : (
                          <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
                        )}
                      </Pressable>
                      <Text style={styles.label}>Simbolos ou discurso de ódio</Text>
                    </View>


                    <View style={styles.checkboxContainer}>
                      <Pressable onPress={() => handleCheckboxChange('outros')}>
                        {selectedOptions.outros ? (
                          <MaterialIcons name="check-circle" size={24} color="#6200EE" />
                        ) : (
                          <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
                        )}
                      </Pressable>
                      <Text style={styles.label}>Outros...</Text>
                    </View>
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#545454', fontWeight: 'bold', bottom: 25, fontSize: 18, marginTop: 15, }}>Fale um pouco sobre o problema </Text>
                  </View>

                  <TextInput
                    placeholder="Digite aqui..."
                    placeholderTextColor="#545454"
                    value={descricao}
                    onChangeText={setDescricao}
                    style={styles.input3}
                  />

                  <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ color: '#545454', fontWeight: 'bold', fontSize: 18, marginLeft: 35 }}>Se houver provas como fotos ou </Text>
                    <Text style={{ color: '#545454', fontWeight: 'bold', fontSize: 18, marginLeft: 35 }}>prints adicione por favor </Text>
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity onPress={pickImage} style={styles.anexo}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <AntDesign name="addfolder" size={29} color="white" style={styles.iconAnexo} />
                        <Text style={styles.textAnexo}>Anexar arquivos </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {selectedImage && (
                  <TouchableOpacity onPress={uploadMedia} style={styles.button3} disabled={uploading}>
                  <Text style={styles.buttonText2}>{uploading ? 'Confirmando...' : 'Confirmar foto'}</Text>
                  </TouchableOpacity>
              )}

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 80 }}>
                    <TouchableOpacity
                      style={styles.buttonEnviar}
                      onPress={() => fetchDenuncia({ descricao })}
                    >
                      <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.buttonEnviar2}>
                      <Text style={styles.textButton2} onPress={fechaModal}> Cancelar </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            )
          )}
        </ScrollView>

    </View>

          </Modal>

        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
