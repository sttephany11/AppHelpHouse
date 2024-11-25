import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView , Alert, Animated , Modal,ActivityIndicator,Pressable,TextInput, TouchableWithoutFeedback} from 'react-native';
import styles from '../css/perfilProfissionalCss';
import Imagens from "../../img/img";
import Entypo from '@expo/vector-icons/Entypo';
import { useImage } from '../ImageContext';
import { useUser } from '../cliContext';
import { getPro } from '../functions/getPro';
import { Ionicons } from '@expo/vector-icons';
import myContext from '../functions/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialIcons } from '@expo/vector-icons'; // Expo Icons

//imagem
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'

interface Avaliacao {
  idAvaliacao: number;
  ratingAvaliacao: number;
  descavaliacao: string;
  idContratado: string;
  idContratante: string;
  nome: string;
  imagem: string;
}
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

const PerfilProfissionalScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { nomeContratado, sobrenomeContratado, bairroContratado, idContratado, descContratado, profissaoContratado,
     cidadeContratado, imagemContratado, portifilioPro1, portifilioPro2, portifilioPro3 } = route.params;
 
  const { userData, userId } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(myContext);
  const [token, setToken] = useState<string | null> (null);
  const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState<number | null>(null); 
  const [buttonScale] = useState(new Animated.Value(1));
  const [contratos, setContratos] = useState<Pedido[]>([]);
  const [descricao, setDescricao] = useState('');

  const idCli = user.idContratante;

  //DENUNCIA 
  const [isModalVisible, setModalVisible] = useState(false); 
  const [denuncia, setDenuncia] = useState('');

  // Função para calcular a média 
  const calcularMediaAvaliacoes = (avaliacoes: Avaliacao[]) => {
    if (avaliacoes.length === 0) return null;
    const soma = avaliacoes.reduce((total, item) => total + item.ratingAvaliacao, 0);
    return soma / avaliacoes.length;
  };


   //CONTRATOS e DENUNCIA

   useEffect(() => {
    const fetchContratos = async () => {
      try {
        const response = await api.get(`/contratos/recebidos/${user.idContratante}`);
        // console.log(response.data); // Inspecione a estrutura dos dados aqui
        setContratos(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os contratos.');
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);

  // Busca o token armazenado no AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setToken(savedToken);
          console.log('Token obtido do AsyncStorage:', savedToken);
        } else {
          console.log('Nenhum token encontrado no AsyncStorage');
        }
      } catch (error) {
        console.error('Erro ao buscar o token:', error);
      }
    };
    fetchToken();
  }, []);

  // Busca as avaliações e calcula a média
  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get(`/avaliacoes/${idContratado}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const avaliacoes = response.data.avaliacoes;
        setAvaliacao(avaliacoes); 
        setMediaAvaliacoes(calcularMediaAvaliacoes(avaliacoes)); // Calcula e salva a média
      } catch (error: any) {
        console.error('Erro ao buscar avaliações:', error.response?.data?.error || 'Erro desconhecido');
      }
    };

    if (token) {
      fetchAvaliacoes();
    }
  }, [token, idContratado]);




  //DENUNCIAAAAA

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
  const voltarPro = () => {
    navigation.navigate('profissionais');
  };

  return (
    <ScrollView>
      <View style={styles.containerCapaFundo}>
        <TouchableOpacity>
          <Image source={Imagens.fotoFundo2} style={styles.capaFundo} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerImgPerfil}>
        <TouchableOpacity style={styles.buttonContato} onPress={toggleModal}>
          <View style={{justifyContent:'center', flexDirection:'row'}}>
          <Text style={styles.textButton}>Denunciar</Text>
          <AntDesign name="exclamationcircle" size={20} color="white" style={{marginLeft:10}} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={imagemContratado ? { uri: imagemContratado } : Imagens.perfilUsuario4} style={styles.imgPerfil} />
        </TouchableOpacity>

        <AntDesign name="leftcircle" size={30} color="#fff" style={{ marginLeft: 15, bottom:410 }} onPress={voltarPro} />

        <Text style={styles.nome}>{nomeContratado} {sobrenomeContratado}</Text>
        <View style={styles.textBiografia}>
          <Text style={{color:'#004aad', fontSize:18, fontWeight:'bold',bottom:25,}}>{profissaoContratado}{'\n'}</Text>
          <Text style={{bottom:40,fontSize:16,}}>{descContratado}
          </Text> 
          </View>
        <Text style={styles.textLocalizacao}>
          <Entypo name="location-pin" size={24} color="red" />
          Atua em {cidadeContratado}, {bairroContratado}
        </Text>
        
        {/* Exibe a média das avaliações */}
        <View style={styles.textMedia}>
          <Text style={styles.media}>Média de avaliações: {mediaAvaliacoes ? mediaAvaliacoes.toFixed(1) : 'Sem avaliações'} <Text style={{fontSize:20}}>⭐</Text></Text>
        </View>

        <Text style={styles.vejaMais}>Veja mais de {nomeContratado}</Text>
        <View style={styles.containerVerical}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity><Image source={portifilioPro1 ? {uri: portifilioPro1} : Imagens.imgPortifolio2} style={styles.fotosRolagem}/></TouchableOpacity>
            <TouchableOpacity><Image source={portifilioPro2 ? {uri: portifilioPro2} : Imagens.imgPortifolio2} style={styles.fotosRolagem}/></TouchableOpacity>
            <TouchableOpacity><Image source={portifilioPro3 ? {uri: portifilioPro3} : Imagens.imgPortifolio2} style={styles.fotosRolagem}/></TouchableOpacity>
          </ScrollView>
        </View>

        <Text style={styles.vejaMais}>Avaliações</Text>
          
        {/* Renderiza as avaliações dinamicamente usando map, como um loop */}
        {avaliacao.map((avaliacaoItem) => (
          <View key={avaliacaoItem.idAvaliacao} style={styles.containerBase}>
            <Image source={avaliacaoItem.imagem ? { uri: avaliacaoItem.imagem } : Imagens.perfilUsuario4} style={styles.imgAvaliacao} />
            <Text style={styles.nomeAvaliador}>{avaliacaoItem.nome}</Text>
            <Text style={styles.textAvaliacao}>{avaliacaoItem.descavaliacao}</Text>

            {/* Exibe a avaliação com base no número de estrelas */}
            <View style={{ flexDirection: 'row', bottom: 64, marginLeft: 90, marginBottom:30 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= avaliacaoItem.ratingAvaliacao ? 'star' : 'star-outline'}
                  size={24}
                  color={star <= avaliacaoItem.ratingAvaliacao ? '#FFD700' : '#D3D3D3'}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Modal de Denuncia */}
          <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
          >
            <TouchableWithoutFeedback onPress={toggleModal}>
             <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}>
             <TouchableWithoutFeedback>

        <ScrollView>
          <View  style={styles.containerPedidos}>

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
                  {['pagamentos', 'comportamento', 'inacabado', 'assédio', 'outros'].map((category) => (
                          <View style={styles.checkboxContainer} key={category}>
                            <Pressable onPress={() => handleCheckboxChange(category)}>
                              {selectedOptions[category] ? (
                                <MaterialIcons name="check-circle" size={24} color="#bc000f" />
                              ) : (
                                <MaterialIcons name="radio-button-unchecked" size={24} color="#bc000f" />
                              )}
                            </Pressable>
                            <Text style={styles.label}>{category}</Text>
                          </View>
                        ))}

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
                    multiline={true}

                  />

                  <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={{ color: '#545454', fontWeight: 'bold', fontSize: 18, marginLeft: 25 }}>Se houver provas como fotos ou </Text>
                    <Text style={{ color: '#545454', fontWeight: 'bold', fontSize: 18, marginLeft: 25 }}>prints adicione por favor </Text>
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity onPress={pickImage} style={styles.anexo}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <AntDesign name="addfolder" size={29} color="white" style={styles.iconAnexo} />
                        <Text style={styles.textAnexo}>Anexar arquivos </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{justifyContent:'center',alignItems:'center'}}>
                  {selectedImage && (
                  <TouchableOpacity onPress={uploadMedia} style={styles.button3} disabled={uploading}>
                  <Text style={styles.buttonText2}>{uploading ? 'Confirmando...' : 'Confirmar foto'}</Text>
                  </TouchableOpacity>
              )}
                 </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop:50 }}>
                    <TouchableOpacity
                      style={styles.buttonEnviar}
                      onPress={() => fetchDenuncia({ descricao })}
                    >
                      <Text style={styles.textButtondenuncia}>Enviar</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.buttonEnviar2}>
                      <Text style={styles.textButton2} onPress={fechaModal}> Cancelar </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              
        </ScrollView>
        </TouchableWithoutFeedback>
    </View>
    </TouchableWithoutFeedback>
          </Modal>

    </ScrollView>
  );
};

export default PerfilProfissionalScreen;
