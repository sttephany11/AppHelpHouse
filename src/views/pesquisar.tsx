import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity,TextInput, SafeAreaView, ScrollView, ImageBackground, StatusBar, Image, FlatList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Imagens from "../../img/img";
import styles from '../css/pesquisarCss';

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
        style={styles.background}  // Define o estilo para a imagem de fundo
        resizeMode="cover"   // Ajusta a imagem para cobrir a tela 
        >
        <SafeAreaView style={styles.container}>
             <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    
                    <View style={styles.container2}>
                        <View style={styles.colunaPesquisa}>
                          <View style={styles.area}>
                            <TextInput 
                            style={styles.input}
                            placeholder='pesquise aqui'
                            value={searchText}
                            onChangeText={(t) => setSearchText(t)}
                            />
                            <TouchableOpacity onPress={handleOrderClick} >
                             <Image style={styles.filtroImg} source={Imagens.filtro} />
                            </TouchableOpacity>
                            </View>
                     
                        <FlatList
                         data={list}
                         style={styles.list}
                         renderItem={({ item }) => <ListItem data={item}/>} 
                         //keyExtractor={(item) => item.id}
                         keyExtractor={(item) => item.avatar}
                         />

                     
                        </View>
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

        </ImageBackground>
    );
};

export default Pesquisar;