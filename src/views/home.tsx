import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useImage } from '../ImageContext.js';
import results from '../../results';
import ListItem from '../../componentes/flat/listItem.js';
import styles from '../css/homeCss';

const HomeScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(results);
  const { imageUrl } = useImage();

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

  return (
    <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView>
        <View style={styles.containerBoasVindas}>
          <Text style={styles.boasVindas}>Olá, Clodoaldo!</Text>
          <TouchableOpacity onPress={perfilNav}>
            <Image source={imageUrl ? { uri: imageUrl } : Imagens.perfil} style={styles.ImgPerfil} />
          </TouchableOpacity>
        </View>

        <Image source={Imagens.lupaAzul} style={styles.lupaAzul} />
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder='Buscar serviço'
            value={searchText}
<<<<<<< HEAD
            onChangeText={(t) => setSearchText(t)}
            
=======
            onChangeText={setSearchText}
>>>>>>> 80406c801962430d8883c130eea6e610f9c9c7aa
          />

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
            <View style={styles.fundoPedidos}>
              <Text style={styles.textPedidos}>Meus pedidos</Text>
              <Text style={styles.textPedidos2}>Acompanhe seus pedidos...</Text>
              <AntDesign name="rightcircle" size={50} color="#004aad" style={{ marginLeft: 300, bottom: 75 }} />
            </View>
          </View>

          <View style={styles.containerPedidos}>
            <View style={styles.fundoAzul}>
              <Text style={styles.frasePedidos}>Alguns dos serviços mais procurados ultimamente.</Text>
              <View style={styles.containerImgs}>
                <Image source={Imagens.eletricistaa} style={styles.imgs} />
                <Image source={Imagens.mestreDeObra} style={styles.imgs2} />
                <Image source={Imagens.eletricistaa} style={styles.imgs2} />
              </View>
              <View style={styles.containerImgs}>
                <Image source={Imagens.eletricistaa} style={styles.imgs} />
                <Image source={Imagens.eletricistaa} style={styles.imgs2} />
                <Image source={Imagens.eletricistaa} style={styles.imgs2} />
              </View>
            </View>
          </View>

          {/* Descomente o FlatList se necessário */}
          {/* <FlatList
            data={list}
            style={styles.list}
            renderItem={({ item }) => <ListItem data={item} />}
            keyExtractor={(item) => item.avatar}
          /> */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
