import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput, SafeAreaView, ScrollView, ImageBackground, StatusBar, Image} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Imagens from "../../img/img";
import styles from '../css/homeCss';
import pesquisar from "../views/pesquisar";

const Home: React.FC<{ navigation: any }> = ({ navigation }) => {
    
    
    return (
        <ImageBackground 
        source={Imagens.fundoBemVindo}
        style={styles.background}  // Define o estilo para a imagem de fundo
        resizeMode="cover"   // Ajusta a imagem para cobrir a tela 
        >
       <View style={styles.container}>
        <ScrollView>

 
        <View style={styles.container}>
        
        <View style={styles.container2}>

                <View style={styles.posicao}>
                <TouchableOpacity onPress={() => navigation.navigate('Pesquisar')}>
                    <View style={styles.coluna1}>
                        <Text style={styles.texto1}>Qual serviço você procura?</Text>
                        <Image style={styles.lupaGrande} source={Imagens.lupaGrande} />
                    </View>
                    </TouchableOpacity >
                </View>
           
        </View>

        <View style={styles.container2}>
            <View style={styles.propaganda}>
                <Text style={styles.titulo}>Serviços</Text>
                <Text style={styles.subtitulo}>Encontre aqui algumas áreas mais procuradas.</Text>
            </View>
        </View>

        <View style={styles.container2}>
            <TouchableOpacity>
                    <View style={styles.colunaOpcao}>
                        <Image style={styles.encanadorImg} source={Imagens.encanador} />
                        <Text style={styles.textoOpcao}>Encanamento</Text>
                    </View>
            </TouchableOpacity>
        </View>
        <View style={styles.container2}>
            <TouchableOpacity>
                    <View style={styles.colunaOpcao2}>
                        <Image style={styles.encanadorImg} source={Imagens.eletrica} />
                        <Text style={styles.textoOpcao}>Elétrica</Text>
                    </View>
            </TouchableOpacity>
        </View>

        <View style={styles.container2}>
            <TouchableOpacity>
                    <View style={styles.colunaOpcao2}>
                        <Image style={styles.encanadorImg} source={Imagens.capacete} />
                        <Text style={styles.textoOption}>Construção e reparos</Text>
                    </View>
            </TouchableOpacity>
        </View>

        <View style={styles.container2}>
           <View style={styles.colunaServico}>
               <Text style={styles.texto2}>Alguns dos serviços mais procurados ultimamente</Text>
           
           <View style={styles.servicosProcurado}>
           <TouchableOpacity>
               <Image style={styles.chuveiroImg} source={Imagens.chuveiro} />
           </TouchableOpacity>

           <TouchableOpacity>
               <Image style={styles.chuveiroImg} source={Imagens.kitEletrico} />
           </TouchableOpacity>

           <TouchableOpacity>
                <Image style={styles.chuveiroImg} source={Imagens.manutencao} />
           </TouchableOpacity>

           </View>
           </View>
        </View>
        
         </View>

        </ScrollView>
        </View>

        </ImageBackground>
    );
};

/*
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="pesquisar" component={pesquisar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/



export default Home;
