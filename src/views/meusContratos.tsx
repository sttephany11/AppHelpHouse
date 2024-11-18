import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, ImageBackground, TouchableWithoutFeedback,Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import Imagens from "../../img/img";
import styles1 from '../css/MeusPedidosCss';
import myContext from '../functions/authContext';
import styles from '../css/chatCss';


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
  const [isModalVisible, setModalVisible] = useState(false); // Estado do modal


  const [loading, setLoading] = useState(true);
  const { user } = useContext(myContext);

   // Toggle para exibir ou esconder o modal
   const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      style={styles1.background}
      resizeMode="cover"
    >
      <View style={styles1.container}>
        <View style={styles1.navContent}>
          <View style={styles1.navbar}>
            <TouchableOpacity>
              <AntDesign
                name="leftcircle"
                size={30}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.navigate('homeStack')}
              />
            </TouchableOpacity>
            <Text style={styles1.textNav}>Pedidos</Text>
          </View>
          <View style={styles1.tabs}>
            <Text style={styles1.Texttab}>Contratos</Text>
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

          {/* Modal de Contrato */}
       <Modal visible={isModalVisible} animationType="slide" transparent={true}>
  <TouchableWithoutFeedback onPress={toggleModal}>
    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: 1 }}>
      <TouchableWithoutFeedback>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            contratos.map((pedido) =>
              pedido.contrato ? (
                <View key={pedido.contrato.id} style={styles.containerPedidos}>
                  <View style={styles.tituloFundo}>
                    <Text style={styles.tituloModal}>Confirme os dados</Text>
                  </View>
                  <Text style={styles.tituloModal2}>
                    O contrato foi criado, confirme se você
                  </Text>
                  <Text style={styles.tituloModal3}>
                   está de acordo com os dados!
                  </Text>

                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.opcoes}>Serviço: </Text> <Text style={styles.opcoes2}>{pedido.contrato.desc_servicoRealizado}</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.opcoes}>
                    Data: </Text> <Text style={styles.opcoes2}> {pedido.contrato.data}</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.opcoes}>
                    Valor: </Text><Text style={styles.opcoes2}> R$ {pedido.contrato.valor}</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.opcoes}>
                    Forma de pagamento: </Text> <Text style={styles.opcoes2}> {pedido.contrato.forma_pagamento}</Text>
                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                    <TouchableOpacity
                      onPress={() => handleAcaoContrato(pedido.idSolicitarPedido, 'aceitar')}
                      style={styles.botaoAceitar}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          marginLeft: 25,
                          top: 5,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        Aceitar
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleAcaoContrato(pedido.idSolicitarPedido, 'recusar')}
                      style={styles.botaoRecusar}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          marginLeft: 20,
                          top: 5,
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}
                      >
                        Recusar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            )
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>
      </View>
    </ImageBackground>
  );
};

export default MeusContratos;