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
  

  const ListItem = ({ data }) => {
    return(
        <TouchableOpacity style={styles.coihbhb}>
            <View style={styles.colunaOpcao}>
                <Image source={{ uri: data.item}} style={styles.img}/>
                <Text style={styles.textoOption}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    colunaOpcao:{
        backgroundColor:'#e9e9e7',
        width: 130,
        height: 40,
        borderRadius: 40,
        alignItems:'center',
        marginTop:15,
        flexDirection:'row',
       
      },
 
      textoOption:{
        color: '#3669a4',
        marginLeft: 10,
        fontSize: 20,
        fontWeight: '730',
        justifyContent:'center',
        alignItems:'center',
       
      },
  });
  export default ListItem;