import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity,TextInput, ScrollView, ImageBackground, Image, FlatList} from 'react-native';
import Imagens from "../../img/img";
import styles from '../css/pesquisarCss';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';

import results from '../../results';
import results2 from '../../results2.js';
import ListItem from '../../componentes/flat/listItem.js';


const Pesquisar: React.FC<{ navigation: any }> = ({ navigation }) => {
    
  const [searchText, setSearchText] = useState('');
  const [searchText2, setSearchText2] = useState('');
    const [list, setList] = useState(results);
    const [list2, setList2] = useState(results2);

    const handleItemSelect = (value) => {
      setSearchText(value); // essas duas const Leva o valor selecionado para o input
    };
    const handleItemSelect2 = (value) => {
      setSearchText2(value); 
    };

    //aqui faz a ligação direta para a próxima tela
    useEffect(() => {
      if (searchText && searchText2) {
        // Verifica se ambos os inputs têm valores preenchidos
        navigation.navigate('profissionais', { valor1: searchText, valor2: searchText2 });
      }
    }, [searchText, searchText2]);
  

    
 
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

    

    useEffect(()=>{
      if(searchText2 === ''){
        setList2(results2);
      }else {
        setList2(
          results2.filter(item=>{
            if(item.name.toLowerCase().indexOf(searchText2.toLowerCase()) > -1){
              return true;
            }else {
              return false;
            }
          })
        )
      }
    }, [searchText2]);


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
              value={searchText2}
              onChangeText={(t) => setSearchText2(t)}
            />
           </View>

        

          <Text style={styles.textSugestao}> Sugestões para Você </Text>
           </View>

           <FlatList
            data={list}
            renderItem={({ item }) => (
              <ListItem data={item} onSelect={handleItemSelect}  />
            )}
            keyExtractor={(item) => item.id.toString()}
          />

            <FlatList
            data={list2}
            renderItem={({ item }) => (
              <ListItem data={item} onSelect={handleItemSelect2}  />
            )}
            keyExtractor={(item) => item.id.toString()}
          />

            


          </View>

        </ImageBackground>
    );
};

export default Pesquisar;
