import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity,TextInput, SafeAreaView, ScrollView, ImageBackground, StatusBar, Image, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Imagens from "../../img/img";
import styles from '../css/pesquisarCss';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';


import results from '../../results';
import ListItem from '../../componentes/flat/listItem.js';

const Pesquisar: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(results);

    useEffect(()=>{
      if(searchText === ''){
        setList(results);
      }else {
        setList(
          results.filter(item=>{
            if(item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
              return true;
            }else {
              return false;
            }
          })
        )
      }
    }, [searchText]);

    const handleOrderClick = () => {
      let newList = [...results];

    newList.sort((a, b)=>{
      if(a.name > b.name){
      return 1;
      } else {
      if(b.name > a.name){
        return -1;
      } else {
        return 0;
      }
      }
    })
    
      setList(newList);  
    };

    return (
        <ImageBackground 
        source={Imagens.fundoBemVindo}
        style={styles.background}  
        resizeMode="cover"   
        >
          
          <View style={styles.fundoBranco}>
            <View style={styles.containerInput}>
            <View style={styles.inputContainer}>
            <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder='Encontre um profissional'
              value={searchText}
              onChangeText={(t) => setSearchText(t)}
            />
           </View>

           <View style={styles.inputContainer}>
           <Entypo name="location-pin" size={24} color="white" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder='Encontre por região'
              value={searchText}
              onChangeText={(t) => setSearchText(t)}
            />
           </View>

          <Text style={styles.textSugestao}> Sugestões para Você </Text>
           </View>

            <FlatList
            data={list}
            style={styles.list}
            renderItem={({ item }) => <ListItem data={item}/>} 
            //keyExtractor={(item) => item.id}
            keyExtractor={(item) => item.avatar}
                         />

          </View>

        </ImageBackground>
    );
};

export default Pesquisar;
