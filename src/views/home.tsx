import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useImage } from '../ImageContext.js';
import results from '../../results';
import styles from '../css/homeCss';
import { useUser } from '../cliContext';


const HomeScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);
  const { imageUrl } = useImage();
  const { userData } = useUser(); // Altere para userData

  useEffect(() => {
    if (searchText === '') {
      setList(results);
    } else {
      setList(
        results.filter(item => item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    const newList = [...results];
    newList.sort((a, b) => a.name.localeCompare(b.name));
    setList(newList);
  };

  const perfilNav = () => {
    navigation.navigate('telaPerfil'); // Nome correto da tela
  };

  const profissionais = () => {
    navigation.navigate('profissionais'); // Nome correto da tela
  };

  const meusPedidos = () => {
    navigation.navigate('meusPedidos'); // Nome correto da tela
  };


  return (
    <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView>
        <View style={styles.containerBoasVindas}>
          <Text style={styles.boasVindas}>Olá, 
          {userData ? userData.nomeContratante : 'Nome não disponível'}
            </Text>
          <TouchableOpacity onPress={perfilNav}>
            <Image source={imageUrl ? { uri: imageUrl } : Imagens.perfilUsuario} style={styles.ImgPerfil} />
          </TouchableOpacity>
        </View>

        <Image source={Imagens.lupaAzul} style={styles.lupaAzul} />
        <View style={styles.containerInput}>

        <TouchableOpacity style={styles.input} onPress={ profissionais} >
      <Text style={styles.textInput}>Encontre um profissional ou serviço</Text>
      </TouchableOpacity>



          <View style={styles.containerProfissoes}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.buttonProfissoes}>
                <Text style={styles.textButton}>Diarista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2}>
                <Text style={styles.textButton}>Marido de Aluguel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2}>
                <Text style={styles.textButton}>Montador de Móveis</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2}>
                <Text style={styles.textButton}>Pintor</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.containerProfissoes2}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.buttonProfissoes}>
                <Text style={styles.textButton}>Encanador</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2}>
                <Text style={styles.textButton}>Profissional de limpeza</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2}>
                <Text style={styles.textButton}>Montador de Móveis</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2}>
                <Text style={styles.textButton}>Costura</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.containerPedidos}>
          <TouchableOpacity style={styles.fundoPedidos} onPress={ meusPedidos}>
              <Text style={styles.textPedidos}>Meus pedidos</Text>
              <Text style={styles.textPedidos2}>Acompanhe seus pedidos...</Text>
              <AntDesign name="rightcircle" size={50} color="#004aad" style={{ marginLeft: 280, bottom: 75 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.containerPedidos}>
            <View style={styles.fundoAzul}>
              <Text style={styles.frasePedidos}>Alguns dos serviços mais procurados ultimamente.</Text>
              <View style={styles.containerImgs}>
                <Image source={Imagens.img1} style={styles.imgs} />
                <Image source={Imagens.img2} style={styles.imgs2} />
                <Image source={Imagens.img3} style={styles.imgs2} />
              </View>
              <View style={styles.containerImgs}>
                <Image source={Imagens.img4} style={styles.imgs} />
                <Image source={Imagens.img5} style={styles.imgs2} />
                <Image source={Imagens.img6} style={styles.imgs2} />
              </View>
            </View>
          </View>

         
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
