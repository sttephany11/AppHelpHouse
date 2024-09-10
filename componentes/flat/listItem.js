import React from 'react'
import {
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    View,
    ImageBackground,
    TextInput,
  } from 'react-native'; 
  import Imagens from "../../img/img";


  const ListItem = ({ data }) => {
    return(
        <TouchableOpacity style={styles.coihbhb}>
            <View style={styles.colunaOpcao}>
                <Image source={Imagens.perfil2} style={styles.img}/>
                <Text style={styles.textoOption}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    );
  };

  const ListItem2 = ({ data }) => {
    return(
        <TouchableOpacity style={styles.coihbhb}>
            <View style={styles.colunaOpcao}>
                <Image source={Imagens.perfil2} style={styles.img}/>
                <Text style={styles.textoOption}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    colunaOpcao:{
        width: 300,
        height: 60,
        borderRadius: 15,
        alignItems:'center',
        marginTop:20,
        flexDirection:'row',
      },
      img:{
        height:40,
        width:40,
        borderRadius:30,
        justifyContent:'flex-start',
        marginLeft:35
      },
      textoOption:{
        color: 'black',
        marginLeft: 11,
        fontSize: 20,
        fontWeight: '730',

      },
  });
  export default ListItem;