import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ImageBackground,Image,TouchableOpacity } from 'react-native';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import Imagens from "../../img/img";
// alem de importar imagens, importem também o Css para ser realizada a manutenção com mais facilidadegit 
import styles from '../css/bemVindoCss'; // Importa o arquivo de estilos


 function BemVindo({navigation}) {
  return (
    <ImageBackground 
      source={Imagens.fundoBemVindo}
      style={styles.background}  // Define o estilo para a imagem de fundo
      resizeMode="cover"  // Ajusta a imagem para cobrir a tela
    >
      <View style={styles.container}>

      
        <Text style={styles.title}>SEJA <Text style={styles.voce}>BEM-VINDO</Text></Text>
        


        <Image source={Imagens.iconLocalizacao} style={styles.iconLocaliza}/>
        <View style={styles.local}>
            <View style={styles.localFilho}>
                <Text style={styles.text}>Nosso app utiliza sua</Text>
                <Text style={styles.text}>localização para</Text>
                <Text style={styles.text}>encontrar profissionais</Text>
                <Text style={styles.text}>perto de você!</Text>
            </View>
        </View>

       
             <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('login')}>
                <Text style={styles.buttonText2}>Continuar</Text>
                </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    
    </ImageBackground>
  );
};


export default BemVindo;