import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import styles from '../css/meuHistoricoCss';
import myContext from '../functions/authContext';
import Imagens from "../../img/img";

interface Pedido {
  idSolicitarPedido: number;
  descricaoPedido: string;
  tituloPedido: string;
  andamentoPedido: string;
  contratado:Contratado;

  contrato?: {
    valor: string;
    data: string;
    hora: string;
    desc_servicoRealizado: string;
    forma_pagamento: string;
  };
}
interface Contratado{
  idContratado:string;
  nomeContratado:string;
}

const MeuHistorico: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useContext(myContext);

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

  return (
    <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
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
                <Text style={styles.cardTitle}>{pedido.tituloPedido || "Título não disponível"}</Text>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.clienteName}>Status:</Text>
                  <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: 'bold', color: '#0044CC' }}>
                    {pedido.andamentoPedido || "Não definido"}
                  </Text>
                </View>

                {pedido.contrato && (
                  <>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                      <Text style={styles.cardLocation}>Valor:</Text>
                      <Text style={{ fontSize: 16, marginLeft: 5 }}>R$ {pedido.contrato.valor || "0,00"}</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.cardDistance}>Data:</Text>
                      <Text style={{ fontSize: 16, marginLeft: 5 }}>
                        {pedido.contrato.data || "Data indisponível"} às {pedido.contrato.hora || "Hora indisponível"}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.cardDate}>Descrição:</Text>
                      <Text style={{ fontSize: 16, marginLeft: 5 }}>
                        {pedido.contrato.desc_servicoRealizado || "Sem descrição"}
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.cardDate}>Forma de pagamento:</Text>
                      <Text style={{ fontSize: 16, marginLeft: 5 }}>
                        {pedido.contrato.forma_pagamento || "Não especificada"}
                      </Text>
                    </View>
                  </>
                )}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={styles.conversarButton}>
                    <Text style={styles.conversarText}>Conversar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.conversarButton}>
                    <Text style={styles.conversarText}>Contrato</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default MeuHistorico;
