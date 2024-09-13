import React from 'react'
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
    
  } from 'react-native'; 
  import Imagens from "../../img/img";


  const ListItem = ({ data, onSelect }) => {
    const handleItemPress = () => {
      // Chame a função 'onSelect' passando o valor do item selecionado
      onSelect(data.name);
    };
    
    return(
        <TouchableOpacity  onPress={handleItemPress} style={styles.coihbhb}>
            <View style={styles.colunaOpcao}>
                <Image source={Imagens.perfil2} style={styles.img}/>
                <Text style={styles.textoOption}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    );
  };

  const ListItem2 = ({ data, onSelect }) => {
    const handleItemPress2 = () => {
      // Chame a função 'onSelect' passando o valor do item selecionado
      onSelect(data.regiao);
    };
    return(
        <TouchableOpacity  onPress={handleItemPress2} style={styles.coihbhb}>
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