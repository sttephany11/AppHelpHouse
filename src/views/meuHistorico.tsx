import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert, ImageBackground, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import styles from '../css/meuHistoricoCss';
import myContext from '../functions/authContext';
import Imagens from "../../img/img";
import { Ionicons } from '@expo/vector-icons';

interface Pedido {
  idSolicitarPedido: number;
  descricaoPedido: string;
  tituloPedido: string;
  andamentoPedido: string;
  contrato?: {
    valor: string;
    data: string;
    hora: string;
    desc_servicoRealizado: string;
    forma_pagamento: string;
  };
  contratado?: {
    idContratado: string;
    nomeContratado: string;
  };
}

const MeuHistorico: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(myContext);

  const [chamarModal, setChamarModal] = useState(false);
  const [ratingAvaliacao, setRating] = useState(0);
  const [descavaliacao, setDescavaliacao] = useState('');
  const [idContratado, setIdContratado] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidosFinalizados = async () => {
      try {
        const userId = user?.idContratante || user?.idContratado;

        if (!userId) {
          throw new Error('ID de usuário não encontrado.');
        }

        const response = await api.get(`/pedidos/finalizados/${userId}`, {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('authToken')}`,
          },
        });

        setPedidos(response.data || []);
      } catch (err) {
        setError('Erro ao carregar pedidos finalizados.');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidosFinalizados();
  }, [user]);

  const handleStarPress = (star: number) => {
    setRating(star);
  };

  const EnviarAvaliacao = async () => {
    if (!idContratado) {
      Alert.alert('Erro', 'ID do contratado não encontrado.');
      return;
    }

    setChamarModal(false);

  
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const nome = user.nomeContratante;
      const imagem = user.imagemContratante;

      try {
        const response = await api.post(
          '/avaliacao',
          {
            ratingAvaliacao,
            descavaliacao,
            idContratado,
            idContratante: user.idContratante,
            nome,
            imagem,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      
        Alert.alert('Sucesso', 'Avaliação enviada com sucesso!');
        setRating(0);
        setDescavaliacao('');
      } catch (error: any) {
        console.error('Erro ao enviar avaliação:', error.response?.data || error.message);
        Alert.alert(
          'Erro',
          `Houve um problema ao enviar a avaliação: ${error.response?.data?.message || 'Erro desconhecido'}`
        );
      }
    }

  return (
    <ImageBackground source={Imagens.fundoBemVindo} style={styles.background} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.navContent}>
          <View style={styles.navbar}>
            <TouchableOpacity>
              <AntDesign
                name="leftcircle"
                size={30}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.navigate('homeStack')}
              />
            </TouchableOpacity>
            <Text style={styles.textNav}>Histórico</Text>
          </View>
          <View style={styles.tabs}>
            <Text style={styles.Texttab}>Pedidos finalizados</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        ) : pedidos.length === 0 ? (
          <Text style={{ marginTop: 20, textAlign: 'center' }}>Nenhum pedido finalizado encontrado.</Text>
        ) : (
          <ScrollView>
            {pedidos.map((pedido) => (
              <View key={pedido.idSolicitarPedido} style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{pedido.tituloPedido || 'Título não disponível'}</Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.clienteName}>Status:</Text>
                  <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: '#0044CC' }}>
                    {pedido.andamentoPedido || 'Não definido'}
                  </Text>
                </View>

                {pedido.contrato && (
                  <>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                      <Text style={styles.cardLocation}>Valor:</Text>
                      <Text style={{ fontSize: 16, marginLeft: 5 }}>R$ {pedido.contrato.valor || '0,00'}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.cardDistance}>Data:</Text>
                      <Text style={{ fontSize: 16, marginLeft: 5 }}>
                        {pedido.contrato.data || 'Data indisponível'} às {pedido.contrato.hora || 'Hora indisponível'}
                      </Text>
                    </View>
                  </>
                )}

                <TouchableOpacity
                  onPress={() => {
                    setIdContratado(pedido.contratado?.idContratado || null);
                    setChamarModal(true);
                  }}
                  style={styles.conversarButton}
                >
                  <Text style={styles.conversarText}>Avaliar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <Modal transparent={true} visible={chamarModal} animationType="slide">
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
              <Text style={{ fontSize: 18 }}>Adicione um comentário:</Text>
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
      </View>
    </ImageBackground>
  );
};

export default MeuHistorico;
