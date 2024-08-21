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
                <Image source={{ uri: data.avatar}} style={styles.img}/>
                <Text style={styles.textoOption}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    colunaOpcao:{
        backgroundColor:'#e9e9e7',
        width: 300,
        height: 60,
        borderRadius: 15,
        alignItems:'center',
        marginTop:15,
        flexDirection:'row',
      },
      img:{
        height:60,
        width:60,
        borderRadius:30,
        justifyContent:'flex-start',
        marginLeft:10
      },
      textoOption:{
        color: '#3669a4',
        marginLeft: 9,
        fontSize: 20,
        fontWeight: '730',
       
      },
  });
  export default ListItem;