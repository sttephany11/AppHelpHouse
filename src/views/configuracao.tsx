import React, { useState, useContext } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";
import styles from '../css/configuracaoCss';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


const Configuracao: React.FC<{ navigation: any }> = ({ navigation }) => {

  const navigateToProfessionals = (profissao: string) => {
    navigation.navigate('profissionais', { profissao }); // Envia a profissão como parâmetro
  };

 

  return (
    <ImageBackground 
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
        <View style={{marginTop:70}}>
            <TouchableOpacity>
            <AntDesign name="leftcircle" size={35} color='#004aad' style={{ marginLeft: 24 }} />
          </TouchableOpacity>
        <Text style={styles.Textconfiguracao}> Configurações</Text>
        </View>
      <View style={styles.fundoBranco}>
        <View style={styles.container}>
            <Text style={styles.TextmeuDados}>Meus dados </Text> 

            <View style={{flexDirection:'row'}}>
            <Text style={styles.dados}> CEP   <Text style={styles.cep}>   08150110</Text></Text>
            <Entypo name="edit" size={22} color="black" style={{marginLeft:20,top:5 }}/>
            </View>
            <Text style={styles.dadosCli}> Rua pedro rodrigues, Sao Paulo</Text>


            <View style={{marginTop:15}}></View>
            
            <Text style={styles.dados}>Email</Text>   
            <View style={{flexDirection:'row'}}>
            <Text style={styles.dadosCli}>shuwhjfwkadyfvf@ganshdld</Text>
            <Entypo name="edit" size={22} color="black" style={{marginLeft:20,bottom:6 }}/> 
            </View>

            <View style={{marginTop:15}}></View>
            
            <Text style={styles.dados}>Telefone</Text>   
            <View style={{flexDirection:'row'}}>
            <Text style={styles.dadosCli}>(11) 2514-5629 </Text>
            <Entypo name="edit" size={22} color="black" style={{marginLeft:20,bottom:6 }}/> 
            </View>

            <View style={{marginTop:15}}></View>
            
            <Text style={styles.dados}>Senha</Text>   
            <Text style={styles.dadosCli}>Trocar minha senha </Text>
            
            <View style={{marginTop:15}}></View>

            <Text style={styles.dados}>CPF</Text> 
            <Text style={styles.dadosCli}>54366203880 </Text>

            <View style={{marginTop:15}}></View> 

            <Text style={styles.dados}>Métodos de pagamento</Text> 
            <View style={{flexDirection:'row', marginTop:10}}>
            <Ionicons name="card" size={45} color="black"  style={styles.cartao}/>
            <Text style={styles.nomeCartao}> Mastercard </Text>
            </View>
            <Text style={styles.numeroCartao}> 2589.7845.156.25</Text>

            <Text style={styles.adicionar}>+ Adicionar Cartão </Text>

        </View>
      </View>
    </ImageBackground>
  );
};

export default Configuracao;
