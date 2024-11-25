import React, { useContext, useState } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions } from 'react-native';
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

  const navigateToProfessionals = (profissao: string) => {
    navigation.navigate('profissionais', { profissao });
  };

  const perfilNav = () => {
    navigation.navigate('perfil');
  };

  const meusPedidos = () => {
    navigation.navigate('meusPedidos');
  };

  // Array de profissões
  const profissoes = [
    { id: '1', nome: 'Diarista', estilo: styles.buttonProfissoes2 },
    { id: '2', nome: 'Marido de aluguel', estilo: styles.buttonProfissoes2 },
    { id: '3', nome: 'Jardineiro', estilo: styles.buttonProfissoes2 },
    { id: '4', nome: 'Pintor', estilo: styles.buttonProfissoes2 },
    { id: '5', nome: 'Pedreiro', estilo: styles.buttonProfissoes2 },
    { id: '6', nome: 'Chaveiro', estilo: styles.buttonProfissoes2 },
    { id: '7', nome: 'Encanador', estilo: styles.buttonProfissoes2 },
    { id: '8', nome: 'Eletricista', estilo: styles.buttonProfissoes2 },
    { id: '9', nome: 'Montador de Móveis', estilo: styles.buttonProfissoes2 },
    { id: '10', nome: 'Mecânico', estilo: styles.buttonProfissoes2 },
    { id: '11', nome: 'Costureira', estilo: styles.buttonProfissoes2 },
    { id: '12', nome: 'Babá', estilo: styles.buttonProfissoes2 },
    { id: '13', nome: 'Personal Organizer', estilo: styles.buttonProfissoes2 },
  ];
   
  const { width } = Dimensions.get('window');


  const [pontinho, setPontinho] = useState(0)

  return (
    <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
      <View>

        <View style={styles.containerBoasVindas}>
          <Text style={styles.boasVindas}>Olá, {user.nomeContratante}</Text>
          <TouchableOpacity onPress={perfilNav}>
            <Image
              source={user.imagemContratante ? { uri: user.imagemContratante } : Imagens.perfilUsuario4}
              style={styles.ImgPerfil}
            />
          </TouchableOpacity>
        </View>

        <Image source={Imagens.lupaAzul} style={styles.lupaAzul} />
        <View style={styles.containerInput}>
          <TouchableOpacity style={styles.input} onPress={() => navigateToProfessionals('')}>
            <Text style={styles.textInput}>Encontre um profissional ou serviço</Text>
          </TouchableOpacity>


          <FlatList
            data={profissoes}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={item.estilo}
                onPress={() => navigateToProfessionals(item.nome)}
              >
                <Text style={styles.textButton}>{item.nome}</Text>
              </TouchableOpacity>
            )}
            pagingEnabled
            onMomentumScrollEnd={(event) => {
              const currentIndex = Math.round(event.nativeEvent.contentOffset.x / width);
              setPontinho(currentIndex);
            }}
            scrollEventThrottle={16}
            contentContainerStyle={{
              marginTop: 20,
              paddingHorizontal: 2,
            }}
          />
        </View>
        {/* aqui é a onde forma as bolinhas, esse [0,1] é o indice de paginas do array */}
        <View style={styles.pontoPai}>
          {[0, 1,2,3,4].map((i) => (
            <View
              key={i}
              style={[
                styles.ponto,
                { backgroundColor: i === pontinho ? 'blue' : 'grey' },
              ]}
            />
          ))}
        </View>
        <View style={styles.containerPedidos}>
          <TouchableOpacity style={styles.fundoPedidos} onPress={meusPedidos}>
            <Text style={styles.textPedidos}>Meus pedidos</Text>
            <Text style={styles.textPedidos2}>Acompanhe seus pedidos...</Text>
            <AntDesign
              name="rightcircle"
              size={50}
              color="#004aad"
              style={{ marginLeft: 280, bottom: 75 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.containerPedidos}>
          <View style={styles.fundoAzul}>
            <Text style={styles.frasePedidos}>
              Alguns dos serviços mais procurados ultimamente.
            </Text>
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
    </ImageBackground>
  );
};

export default HomeScreen;
