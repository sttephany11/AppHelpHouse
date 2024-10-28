import React, { useState, useContext } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";
import styles from '../css/telaPerfilCss';
import { useImage } from '../ImageContext'; // Ajuste o caminho conforme necessário
import { useUser } from '../cliContext';
import myContext from '../functions/authContext';
import AntDesign from '@expo/vector-icons/AntDesign';


const TelaPerfilScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { imageUrl } = useImage();
  const { userData } = useUser(); // Altere para userData
  const { user } = useContext(myContext);

  const navigateToProfessionals = (profissao: string) => {
    navigation.navigate('profissionais', { profissao }); // Envia a profissão como parâmetro
  };
  
  const configuracao = () => {
    navigation.navigate('configuracao');
  };

  const goToOutraTela = () => {
    if (imageUrl) {
      navigation.navigate('perfilProfissional'); // Navegar para a tela desejada
    } else {
      Alert.alert('Erro', 'Nenhuma imagem para exibir.');
    }
  };

  return (
    <ImageBackground 
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.fundoBranco}>
        <View style={styles.container}>
          {user.imagemContratante ? (
            <Image source={{ uri: user.imagemContratante }} style={styles.imgPerfil} />
          ) : (
            <Image source={Imagens.perfilUsuario} style={styles.imgPerfil} />
          )}

          <View style={styles.cameraIcon}>
            <TouchableOpacity>
              <Entypo name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          {/* Exibindo as informações do usuário */}
          <Text style={styles.nome}>
            {user ? user.nomeContratante : 'Nome não disponível'}
          </Text>
          
          <Text style={styles.textLocalizacao}>
            <Entypo name="location-pin" size={24} color="red" /> 
            {user ? user.cidadeContratante : 'Localização não disponível'}, {user ? user.bairroContratante : 'Localização não disponível'}
          </Text>

          <Text style={styles.maisProcurados}> Mais procurados </Text>
          <View style={styles.containerProfissoes}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity style={styles.buttonProfissoes} onPress={() => navigateToProfessionals('Diarista')}>
                <Text style={styles.textButton}>Diarista</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Marido de aluguel')}>
                <Text style={styles.textButton}>Encanador</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonProfissoes2} onPress={() => navigateToProfessionals('Jardineiro')}>
                <Text style={styles.textButton}>Jardineiro</Text>
              </TouchableOpacity>
          
            </ScrollView>
          </View>

          <View style={styles.container2}>
          <TouchableOpacity style={styles.butaoAzul}>
          <AntDesign name="star" size={30} color="white" style={styles.icon} />
          <Text style={styles.textButton2}> Histórico</Text>
          </TouchableOpacity>
          </View>

          <View style={{marginTop:20}}></View>
          <View style={styles.container2}>
          <TouchableOpacity style={styles.butaoAzul} onPress={ configuracao}>
          <AntDesign name="setting" size={30} color="white" style={styles.icon} />
          <Text style={styles.textButton3}>Configurações</Text>
          </TouchableOpacity>
          </View>

          <View style={{marginTop:20}}></View>
          <View style={styles.container2}>
          <TouchableOpacity style={styles.butaoAzul}>
          <AntDesign name="customerservice" size={32} color="white"  style={styles.icon}  />
          <Text style={styles.textButton2}> Suporte</Text>
          </TouchableOpacity>
          </View>


        </View>
      </View>
    </ImageBackground>
  );
};

export default TelaPerfilScreen;
