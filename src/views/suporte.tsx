import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert,ImageBackground, Pressable , TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios';
import styles from '../css/suporteCss';
import myContext from '../functions/authContext';
import Imagens from "../../img/img";
import { MaterialIcons } from '@expo/vector-icons'; // Expo Icons


const Suporte: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const perfilNav = () => {
    navigation.navigate('perfil');
  };
  
    const [selectedOptions, setSelectedOptions] = useState({
      pagamentos: false,
      comportamento: false,
      inacabado: false,
      outros: false,
    });
  
    const handleCheckboxChange = (option: string) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [option]: !prevState[option],
      }));
    };
  

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
    <Text style={styles.subTitulo}>Entre em contato conosco através dos canais</Text>
    </View>


      <View style={styles.fundoBranco}>
        <View>
            <Text style={styles.problema}>Qual o problema?</Text>
        </View>
        
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => handleCheckboxChange('pagamentos')}>
          {selectedOptions.pagamentos ? (
            <MaterialIcons name="check-circle" size={24} color="#6200EE" />
          ) : (
            <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
          )}
        </Pressable>
        <Text style={styles.label}>Pagamentos</Text>
      </View>


      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => handleCheckboxChange('comportamento')}>
          {selectedOptions.comportamento ? (
            <MaterialIcons name="check-circle" size={24} color="#6200EE" />
          ) : (
            <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
          )}
        </Pressable>
        <Text style={styles.label}>Denúncia de comportamento</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => handleCheckboxChange('inacabado')}>
          {selectedOptions.inacabado ? (
            <MaterialIcons name="check-circle" size={24} color="#6200EE" />
          ) : (
            <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
          )}
        </Pressable>
        <Text style={styles.label}>Serviço inacabado</Text>
      </View>

   
      <View style={styles.checkboxContainer}>
        <Pressable onPress={() => handleCheckboxChange('outros')}>
          {selectedOptions.outros ? (
            <MaterialIcons name="check-circle" size={24} color="#6200EE" />
          ) : (
            <MaterialIcons name="radio-button-unchecked" size={24} color="#333" />
          )}
        </Pressable>
        <Text style={styles.label}>Outros...</Text>
      </View>
    </View>


    <View style={{alignItems:'center', justifyContent:'center'}}> 
        <Text style={{color:'#004aad',fontWeight:'bold',bottom:25,fontSize:15,marginTop:15,}}>
            Fale pra nós sobre o ocorrido/dúvida</Text>
            </View>

             <TextInput
             placeholder="Digite aqui..."
             placeholderTextColor="#004aad" 
             // value={}
             //onChangeText=}
             style={styles.input3}
             />


      </View>

    </ImageBackground>

  );
};

export default Suporte;
