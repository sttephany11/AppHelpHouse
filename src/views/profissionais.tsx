import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import styles from '../css/profissionaisCss';
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';


const Profissionais: React.FC<{ navigation: any, route: any }> = ({ route }) => {

  const { valor1, valor2} = route.params || {}; //rota para trazer os valores

    return (
      <ImageBackground
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
    
      <View style={styles.fundoBranco}>
      <View style={styles.inputContainer}>
        <AntDesign name="leftcircle" size={24} color="white" style={styles.searchIcon} />
        <Text style={styles.input}>{valor1}  -   {valor2}</Text>
      </View>

      <View style={styles.containerProfissionais}>

      <View style={styles.containerDados}>
      <Image source={Imagens.perfil} style={styles.imgPerfilPro}/>
      <Text style={styles.NomeProfissional}>Anderson Silva</Text>
      <Text style={styles.descrPerfil}>pintor,eletricista,mestre de obra,marido de aluguel </Text>
      </View>

      <View style={styles.containerAvaliacao}>
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <Text style={styles.textOpinioes}> 150 avaliações </Text>
      </View>
      <View style={styles.containerRegiao}>
      <Entypo name="location-pin" size={24} color="red"  />
      <Text > Zona Leste </Text>
      </View>

      </View>



     <View style={styles.margin}></View>

     <View style={styles.containerProfissionais}>
     <View style={styles.containerDados}>
      <Image source={Imagens.perfil} style={styles.imgPerfilPro}/>
      <Text style={styles.NomeProfissional}>Anderson Silva</Text>
      <Text style={styles.descrPerfil}>pintor,eletricista,mestre de obra,marido de aluguel </Text>
      </View>

      <View style={styles.containerAvaliacao}>
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <AntDesign name="staro" size={18} color="black" />
      <Text style={styles.textOpinioes}> 150 avaliações </Text>
      </View>
      <View style={styles.containerRegiao}>
      <Entypo name="location-pin" size={24} color="red"  />
      <Text > Zona Leste </Text>
      </View>
     </View>







      </View>
    </ImageBackground>
    );
};

export default Profissionais;
