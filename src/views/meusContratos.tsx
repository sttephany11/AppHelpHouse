import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import Imagens from "../../img/img";
import styles from '../css/MeusPedidosCss';
import myContext from '../functions/authContext';



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


const MeusContratos: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [contratos, setContratos] = useState<Pedido[]>([]);

  const [loading, setLoading] = useState(true);
  const { user } = useContext(myContext);

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
  

  const handleAcaoContrato = async (idSolicitarPedido, acao) => {
    try {
      const response = await api.patch(`/contratos/${idSolicitarPedido}/acao`, { acao });
      Alert.alert('Sucesso', response.data.message);
  
      // Remover contrato da lista após a ação
      setContratos((prevContratos) => prevContratos.filter(pedido => pedido.idSolicitarPedido !== idSolicitarPedido));
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao realizar a ação');
    }
  };
  


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
        ) : (
          <ScrollView>
            {contratos.map((pedido) => (
              pedido.contrato ? (
                <View key={pedido.contrato.id} style={styles.containerPedidos}>
                  <Text>Serviço: {pedido.contrato.desc_servicoRealizado}</Text>
                  <Text>Data: {pedido.contrato.data}</Text>
                  <Text>Valor: R$ {pedido.contrato.valor}</Text>
                  <Text>Forma de pagamento: {pedido.contrato.forma_pagamento}</Text>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => handleAcaoContrato(pedido.idSolicitarPedido, 'aceitar')} style={styles.botaoAceitar}>
                      <Text style={{ color: '#fff' }}>Aceitar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAcaoContrato(pedido.idSolicitarPedido, 'recusar')} style={styles.botaoRecusar}>
                      <Text style={{ color: '#fff' }}>Recusar</Text>
                    </TouchableOpacity>

                  </View>
                </View>
              ) : null
            ))}

          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default MeusContratos;


