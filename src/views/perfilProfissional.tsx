import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView,Alert } from 'react-native';
import styles from '../css/perfilProfissionalCss';
import Imagens from "../../img/img";
import Entypo from '@expo/vector-icons/Entypo';
import { useImage } from '../ImageContext'; // Ajuste o caminho conforme necessário
import { useUser } from '../cliContext';
import { getPro } from '../functions/getPro';
import { Ionicons } from '@expo/vector-icons'; // Para os ícones de estrela
//import { getServicos } from "../functions/getServico";
import myContext from '../functions/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




const PerfilProfissionalScreen: React.FC<{route: any, navigation: any }> = ({ route, navigation }) => {
    const { nomeContratado,sobrenomeContratado, bairroContratado, idContratado, descContratado,profissaoContratado, cidadeContratado, imagemContratado } = route.params; // Recebe o idContratado
    const { rating = 0, idContratante } = route.params; // Obtém a avaliação e os dados do cliente
    const { imageUrl } = useImage(); // Obtém a URL da imagem do contexto
    const { userData } = useUser(); // Altere para userData
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useContext(myContext);
    const [token, setToken] = useState<string | null>(null);
      
      // Busca o token armazenado no AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
          setToken(savedToken); // Armazena o token
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
  // Chama a API para buscar os serviços
  useEffect(() => {
    getPro(setData, setLoading, setError);
  }, []);

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
                
                {/* Verifica se há uma URL de imagem e exibe-a, caso contrário, exibe a imagem padrão */}
                <TouchableOpacity>
                    <Image source={ imagemContratado ? { uri: imagemContratado } : Imagens.perfilUsuario4 } style={styles.imgPerfil} />
                </TouchableOpacity>
                
                <Text style={styles.nome}> {nomeContratado} {sobrenomeContratado}</Text>
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
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem} /></TouchableOpacity>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2} /></TouchableOpacity>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2} /></TouchableOpacity>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2} /></TouchableOpacity>
                    </ScrollView>
                </View>
                
                <Text style={styles.vejaMais}>Avaliações</Text>
                <View style={styles.containerBase}>
                    <Image source={Imagens.perfil} style={styles.imgAvaliacao} />
                    <Text style={styles.nomeAvaliador}>{user.nomeContratante}</Text>
                    <Text style={styles.textAvaliacao}>Comentário do cliente.</Text>
                    
                    {/* Mostra a avaliação com base no número de estrelas */}
                    <View style={{ flexDirection: 'row', bottom: 64, marginLeft: 90 }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                                key={star}
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={24}
                                color={star <= rating ? '#FFD700' : '#D3D3D3'}
                            />
                        ))}
                    </View>
                </View>

                <View style={{marginTop:30}}></View>

                <View style={styles.containerBase}>
                    <Image source={Imagens.perfil} style={styles.imgAvaliacao} />
                    <Text style={styles.nomeAvaliador}>Lucas</Text>
                    <Text style={styles.textAvaliacao}>Ótimo profissional!</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default PerfilProfissionalScreen;
