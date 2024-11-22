import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, ImageBackground, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import Imagens from "../../img/img";
import styles1 from '../css/MeusPedidosCss';
import myContext from '../functions/authContext';
import styles from '../css/contratosCss';

interface Pedido {
  idSolicitarPedido: number;
  descricaoPedido: string;
  tituloPedido: string;
  contrato: Contrato;
}

interface Contrato {
  id: number;
  idSolicitarPedido: number;
  valor: string;
  data: string;
  hora: string;
  desc_servicoRealizado: string;
  forma_pagamento: string;
  contratante: string;
  contratado: string;
}

const MeusContratos: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [contratos, setContratos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(myContext);

  useEffect(() => {
    let isMounted = true; // Para evitar atualizações após desmontagem
    let delay = 1000; // Começa com 1 segundo


    const fetchContratos = async () => {
      try {
        const response = await api.get(`/contratos/recebidos/${user.idContratante}`);

        if(isMounted){
          // Variaveis que serão atualizadas pelo Polling
        setContratos(response.data || []);

        delay = 2000;

        }


      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os contratos.');

        delay = Math.min(delay * 2, 30000); // Máximo de 30 segundos
      } finally {
        if (isMounted) {
          setTimeout(fetchContratos, delay);
        }
        setLoading(false);
      }
    };

    fetchContratos();

    return ()=>{
      isMounted = false; 
    };
  }, []);

  const handleAcaoContrato = async (idSolicitarPedido: number, acao: string) => {
    try {
      const response = await api.patch(`/contratos/${idSolicitarPedido}/acao`, { acao });
      Alert.alert('Sucesso', response.data.message);

      // Remover o contrato da lista após ação
      setContratos((prevContratos) =>
        prevContratos.filter((pedido) => pedido.idSolicitarPedido !== idSolicitarPedido)
      );
    } catch (error: any) {
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao realizar a ação');
    }
  };

  const pedidos = () => {
    navigation.navigate('meusPedidos');
  };

  return (
    <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles1.background}
      resizeMode="cover"
    >
      <View style={styles1.container}>
        <View style={styles.navContent}>
          <View style={styles.navbar}>
            <TouchableOpacity>
              <AntDesign
                name="leftcircle"
                size={30}
                color="#fff"
                style={{ marginLeft: 15 }}
                onPress={pedidos}
              />
            </TouchableOpacity>
            <Text style={styles.textNav}>Contratos</Text>
          </View>

          <View style={styles.navContainer}>
            <View style={styles.tabs}>
              <TouchableOpacity>
                <Text style={styles.Texttab}>Analise seus contratos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            {contratos.map((pedido) =>
              pedido.contrato ? (
                <View key={pedido.contrato.id} style={styles.containerPedidos}>
                  <View style={styles.tituloFundo}>
                    <Text style={styles.tituloModal}>Comprovante contratual de</Text>
                    <Text style={styles.tituloModal2}>prestação de serviços</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Text style={styles.nomes}>Tipo de serviço:</Text>
                    <Text style={styles.variaveis}> {pedido.contrato.desc_servicoRealizado}</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Text style={styles.nomes2}>Data marcada:</Text>
                    <Text style={styles.variaveis2}> {pedido.contrato.data}</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Text style={styles.nomes2}>Horário:</Text>
                    <Text style={styles.variaveis2}>{pedido.contrato.hora}</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Text style={styles.nomes2}>Valor pago:</Text>
                    <Text style={styles.variaveis2}>R$ {pedido.contrato.valor}</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Text style={styles.nomes2}>Forma de pagamento:</Text>
                    <Text style={styles.variaveis2}>{pedido.contrato.forma_pagamento}</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row', marginTop: 20 }}>
                    <Text style={styles.nomes2}>Contratante:</Text>
                    <Text style={styles.variaveis2}>{pedido.contrato.contratante}</Text>
                  </View>

                  <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                    <Text style={styles.nomes2}>Contratado:</Text>
                    <Text style={styles.variaveis2}>{pedido.contrato.contratado}</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                      flexDirection: 'row',
                    }}
                  >
                    <TouchableOpacity
                      style={styles.buttonFinal}
                      onPress={() => handleAcaoContrato(pedido.idSolicitarPedido, 'aceitar')}
                    >
                      <Text style={styles.textButtonFinal}>Aceitar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonFinal}
                      onPress={() => handleAcaoContrato(pedido.idSolicitarPedido, 'recusar')}
                    >
                      <Text style={styles.textButtonFinal}>Recusar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            )}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

export default MeusContratos;
