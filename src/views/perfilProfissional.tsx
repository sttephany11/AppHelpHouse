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
}

const PerfilProfissionalScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { nomeContratado, sobrenomeContratado, bairroContratado, idContratado, descContratado, profissaoContratado, cidadeContratado, imagemContratado } = route.params;
  const { imageUrl } = useImage();
  const { userData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(myContext);
  const [token, setToken] = useState<string | null> (null);
  const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);

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

  // Chama a API para buscar as avaliações
  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const response = await api.get(`/avaliacoes`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setAvaliacao(response.data); // Salva as avaliações no estado
      } catch (error: any) {
        console.error('Erro ao buscar avaliações:', error.response?.data?.error || 'Erro desconhecido');
      }
    };
    if (token) {
      fetchAvaliacoes();
    }
  }, [token]);

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
          {profissaoContratado}{'\n'}
          {descContratado}
        </Text>
        <Text style={styles.textLocalizacao}>
          <Entypo name="location-pin" size={24} color="red" />
          Atua em {cidadeContratado}, {bairroContratado}
        </Text>

        <Text style={styles.vejaMais}>Veja mais de Clodoaldo</Text>
        <View style={styles.containerVerical}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity><Image source={Imagens.imgPortifolio} style={styles.fotosRolagem} /></TouchableOpacity>
            <TouchableOpacity><Image source={Imagens.imgPortifolio} style={styles.fotosRolagem2} /></TouchableOpacity>
            <TouchableOpacity><Image source={Imagens.imgPortifolio} style={styles.fotosRolagem2} /></TouchableOpacity>
            
          </ScrollView>
        </View>

        <Text style={styles.vejaMais}>Avaliações</Text>
          
        {/* Renderiza as avaliações dinamicamente usando map */}
        {avaliacao.map((avaliacaoItem) => (
          <View key={avaliacaoItem.idAvaliacao} style={styles.containerBase}>
            <Image source={user.imagemContratante ? { uri: user.imagemContratante } : Imagens.perfilUsuario4} style={styles.imgAvaliacao} />
            <Text style={styles.nomeAvaliador}>{user.nomeContratante}</Text>
            <Text style={styles.textAvaliacao}>{avaliacaoItem.descavaliacao}</Text>

            {/* Exibe a avaliação com base no número de estrelas */}
            <View style={{ flexDirection: 'row', bottom: 64, marginLeft: 90 }}>
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
