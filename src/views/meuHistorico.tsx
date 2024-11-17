import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert,ImageBackground } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import styles from '../css/MeusPedidosCss';
import myContext from '../functions/authContext';
import Imagens from "../../img/img";

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
        const userType = user?.idContratante ? 'idContratante' : 'idContratado';

        if (!userId) {
          throw new Error('ID de usuário não encontrado.');
        }

        const response = await api.get(`/pedidos/finalizados/${userId}`);
        setPedidos(response.data);
      } catch (err) {
        setError('Erro ao carregar pedidos finalizados.');
        console.error(err);
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
          <Text style={styles.textNav}>Pedidos</Text>
        </View>
        <View style={styles.tabs}>
          <Text style={styles.Texttab}>Contratos</Text>
        </View>
        <View style={styles.tab2}>
          <Text style={styles.Texttab}>Finalizados</Text>
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
            <View key={pedido.idSolicitarPedido} >
              <Text style={styles.cardTitle}>{pedido.tituloPedido}</Text>
              <Text>Status: {pedido.andamentoPedido}</Text>
              {pedido.contrato && (
                <>
                  <Text>Valor: R$ {pedido.contrato.valor}</Text>
                  <Text>Data: {pedido.contrato.data} às {pedido.contrato.hora}</Text>
                  <Text>Descrição: {pedido.contrato.desc_servicoRealizado}</Text>
                  <Text>Forma de pagamento: {pedido.contrato.forma_pagamento}</Text>
                </>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
    </ImageBackground>

  );
};

export default MeuHistorico;
