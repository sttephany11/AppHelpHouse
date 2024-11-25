import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert,ImageBackground, Pressable , TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import styles from '../css/suporteCss';
import myContext from '../functions/authContext';
import Imagens from "../../img/img";
import { MaterialIcons } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/FontAwesome';


const Suporte: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const perfilNav = () => {
    navigation.navigate('perfil');
  };
  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Fecha a resposta se já estiver aberta
    } else {
      setActiveIndex(index); // Abre a resposta clicada
    }
  };

  // Perguntas e respostas
  const faqs = [
    { question: 'O HelpHouse é seguro? ', answer: 'Sim, garantimos segunrança dos seus dados.' },
    { question: 'Como posso alterar minhas informações? ', answer: 'Você pode entrar na tela de configurações e alterar seus dados.' },
    { question: 'Como cadastrar um cartão de crédito?', answer: 'Aceitamos cartões de crédito, débito e transferências bancárias.' },
    { question: 'Como contrato um profissional?', answer: 'Pesquisando um profissional cadastrado e fazendo um pedido a ele.' },
    { question: 'Como visualizo os contratos?', answer: 'Indo no terceiro icon e clicando em contratos.' },
  ];
  

  return (
    <ImageBackground
    source={Imagens.fundoBemVindo}
    style={styles.background}
    resizeMode="cover"
  >

<View style={{ marginTop: 70 }}>
        <TouchableOpacity>
          <AntDesign name="leftcircle" size={30} color='#004aad' style={{ marginLeft: 24 }} onPress={perfilNav} />
        </TouchableOpacity>
        <Text style={styles.TextSuporte}>Suporte</Text>
      </View>


    <View style={{alignItems:'center', justifyContent:'center'}}>
    <Text style={styles.titulo}>Precisa de ajuda?</Text>
    <Text style={styles.subTitulo}>Encontre sua dúvida aqui ou entre em contato conosco!</Text>
    
    </View>


      <View style={styles.fundoBranco}>
        <View>
            <Text style={styles.problema}>Perguntas frequentes</Text>
            {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>

          <View style={{flexDirection:'row',alignItems:'center'}}>

          <AntDesign name="down" size={18} color="black" style={{color:'#0044CC'}} />
          <TouchableOpacity onPress={() => toggleAnswer(index)} style={styles.questionContainer}>
            <Text style={styles.question}>{faq.question}</Text>
          </TouchableOpacity> </View>
          {activeIndex === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </View>
      ))}
        </View>


        <Text style={styles.problema2}>Não achou o que procurava?</Text>
        <View style={{justifyContent:'center', alignItems:'center'}}> 
        <Text style={styles.subTitulo3}>Entre em contato conosco através dos canais:</Text>

        <View style={{flexDirection:'row', marginTop:5}}>
        <Icon name="envelope" size={20} color="black" style={styles.iconEmail}/>
        <Text style={styles.subTitulo2}>sevensevensoraul77@gmail.com</Text>
        </View>
        
        <View style={{flexDirection:'row'}}>
        <Icon name="whatsapp" size={30} color="green" style={styles.iconWhats} />
        <Text style={styles.subTitulo4}>1197777-7777</Text>
        </View>
        </View>

      </View>

    </ImageBackground>

  );
};

export default Suporte;
