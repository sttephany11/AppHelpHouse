import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Imagens from "../../img/img";
import styles from '../css/homeCss';
import { useImage } from '../ImageContext.js';
import { useUser } from '../cliContext';
import myContext from '../functions/authContext';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useContext(myContext);
  const { imageUrl } = useImage();
  const { userData } = useUser();

  // Função para navegar para a página de profissionais filtrados por profissão
  const navigateToProfessionals = (profissao: string) => {
    navigation.navigate('profissionais', { profissao }); // Envia a profissão como parâmetro
  };

  const perfilNav = () => {
    navigation.navigate('perfil');
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
          <Text style={styles.boasVindas}>Olá, {user.nomeContratante}</Text>
          <TouchableOpacity onPress={perfilNav}>
            <Image source={user.imagemContratante ? { uri: user.imagemContratante } : Imagens.perfilUsuario4} style={styles.ImgPerfil} />
          </TouchableOpacity>
        </View>

        <Image source={Imagens.lupaAzul} style={styles.lupaAzul} />
        <View style={styles.containerInput}>
          {/* Campo de busca por profissionais ou serviços */}
          <TouchableOpacity style={styles.input} onPress={() => navigateToProfessionals('')} >
            <Text style={styles.textInput}>Encontre um profissional ou serviço</Text>
          </TouchableOpacity>

          {/* Lista de profissões com navegação para a tela de profissionais filtrados */}
          <View style={styles.containerProfissoes}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.buttonProfissoes} onPress={() => navigateToProfessionals('Diarista')}>
                <Text style={styles.textButton}>Diarista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Marido de aluguel')}>
                <Text style={styles.textButton}>Marido de Aluguel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Jardineiro')}>
                <Text style={styles.textButton}>Jardineiro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Pintor')}>
                <Text style={styles.textButton}>Pintor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Pedreiro')}>
                <Text style={styles.textButton}>Pedreiro</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Chaveiro')}>
                <Text style={styles.textButton}>Chaveiro</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>


          <View style={styles.containerProfissoes2}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.buttonProfissoes} onPress={() => navigateToProfessionals('Encanador')}>
                <Text style={styles.textButton}>Encanador</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Eletricista')}>
                <Text style={styles.textButton}>Eletricista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Montador de Móveis')}>
                <Text style={styles.textButton}>Montador de Móveis</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Mecânico')}>
                <Text style={styles.textButton}>Mecânico</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Costureira')}>
                <Text style={styles.textButton}>Costureira</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Babá')}>
                <Text style={styles.textButton}>Babá</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Babá')}>
                <Text style={styles.textButton}>Personal Organizer</Text>
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
