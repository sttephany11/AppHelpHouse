import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
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


interface Avaliacao {
  idAvaliacao: number;
  ratingAvaliacao: number;
  descavaliacao: string;
  idContratado: string;
  idContratante: string;
  nome: string;
  imagem: string;
}

const PerfilProfissionalScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { nomeContratado, sobrenomeContratado, bairroContratado, idContratado, descContratado, profissaoContratado, cidadeContratado, imagemContratado } = route.params;
  const { imageUrl } = useImage();
  const { userData, userId } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(myContext);
  const [token, setToken] = useState<string | null> (null);
  const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
  const [mediaAvaliacoes, setMediaAvaliacoes] = useState<number | null>(null); 

  const idCli = user.idContratante;

  // Função para calcular a média 
  const calcularMediaAvaliacoes = (avaliacoes: Avaliacao[]) => {
    if (avaliacoes.length === 0) return null;
    const soma = avaliacoes.reduce((total, item) => total + item.ratingAvaliacao, 0);
    return soma / avaliacoes.length;
  };

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

  return (
    <ScrollView>
      <View style={styles.containerCapaFundo}>
        <TouchableOpacity>
          <Image source={Imagens.fotoFundo} style={styles.capaFundo} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerImgPerfil}>
        <TouchableOpacity style={styles.buttonContato}>
          <Text style={styles.textButton}>Entrar em contato</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={imagemContratado ? { uri: imagemContratado } : Imagens.perfilUsuario4} style={styles.imgPerfil} />
        </TouchableOpacity>

        <Text style={styles.nome}>{nomeContratado} {sobrenomeContratado}</Text>
        <Text style={styles.textBiografia}>
          <Text style={{color:'#004aad', fontSize:16, marginBottom:10}}>{profissaoContratado}{'\n'}</Text>
          {descContratado}
        </Text>
        <Text style={styles.textLocalizacao}>
          <Entypo name="location-pin" size={24} color="red" />
          Atua em {cidadeContratado}, {bairroContratado}
        </Text>
        
        {/* Exibe a média das avaliações */}
        <View style={styles.textMedia}>
          <Text style={styles.media}>Média de avaliações: {mediaAvaliacoes ? mediaAvaliacoes.toFixed(1) : 'Sem avaliações'}</Text>
        </View>

        <Text style={styles.vejaMais}>Veja mais de {nomeContratado}</Text>
        <View style={styles.containerVerical}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity><Image source={Imagens.imgPortifolio} style={styles.fotosRolagem} /></TouchableOpacity>
            <TouchableOpacity><Image source={Imagens.imgPortifolio} style={styles.fotosRolagem2} /></TouchableOpacity>
            <TouchableOpacity><Image source={Imagens.imgPortifolio} style={styles.fotosRolagem2} /></TouchableOpacity>
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
    </ScrollView>
  );
};

export default PerfilProfissionalScreen;
