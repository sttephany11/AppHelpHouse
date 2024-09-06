import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';

import results from '../../results';
import ListItem from '../../componentes/flat/listItem.js';

import styles from '../css/homeCss';
const AreaAtuacao: React.FC<{ navigation: any }> = ({ navigation }) => {
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
            <ScrollView>
            <View style={styles.containerBoasVindas}> 
                <Text style={styles.boasVindas}>Boas vindas! </Text>
                <TouchableOpacity>
                <Image  style={styles.ImgPerfil} source={Imagens.perfil} />
                </TouchableOpacity>
           </View>

           <View style={styles.containerFrase}>
           <Text style={styles.frase}>O que você procura? </Text>
           <Image  style={styles.lupa} source={Imagens.lupaAzul} />
           </View>

           <View style={styles.containerInput}>
           <TextInput 
            style={styles.input}
            placeholder='Categoria'
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
            />

          <TextInput 
            style={styles.input2}
            placeholder='Região'
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
            />
         
        
         <View style={styles.containerProfissoes}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         <TouchableOpacity style={styles.buttonProfissoes}>
         <Text style={styles.textButton}>Diarista</Text>
         </TouchableOpacity> 
         
         <TouchableOpacity style={styles.buttonProfissoes2}>
         <Text style={styles.textButton}>Marido de Aluguel</Text>
         </TouchableOpacity> 

         <TouchableOpacity style={styles.buttonProfissoes2}>
         <Text style={styles.textButton}>Montador de Móveis</Text>
         </TouchableOpacity> 

         <TouchableOpacity style={styles.buttonProfissoes2}>
         <Text style={styles.textButton}>Pintor</Text>
         </TouchableOpacity> 
         
         </ScrollView>
         </View>

         
         <View style={styles.containerProfissoes2}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         <TouchableOpacity style={styles.buttonProfissoes}>
         <Text style={styles.textButton}>Enacanador</Text>
         </TouchableOpacity> 
         
         <TouchableOpacity style={styles.buttonProfissoes2}>
         <Text style={styles.textButton}>Profissional de limpeza</Text>
         </TouchableOpacity> 

         <TouchableOpacity style={styles.buttonProfissoes2}>
         <Text style={styles.textButton}>Montador de Móveis</Text>
         </TouchableOpacity> 

         <TouchableOpacity style={styles.buttonProfissoes2}>
         <Text style={styles.textButton}>Costura</Text>
         </TouchableOpacity> 
         
         </ScrollView>
         </View>
          
       
        <View style={styles.containerPedidos}>
        <View style={styles.fundoPedidos}>
          <Text style={styles.textPedidos}>Meus pedidos</Text>
          <Text style={styles.textPedidos2}>Acompanhe seus pedidos... </Text>
        </View>
        </View>
       
        <View style={styles.containerPedidos}>
        <View style={styles.fundoAzul}>
        <Text style={styles.frasePedidos}>Alguns dos serviçoes mais procurados ultimamente. </Text>
        <View style={styles.containerImgs}>
        <Image source={Imagens.eletricistaa} style={styles.imgs}/>
        <Image source={Imagens.mestreDeObra} style={styles.imgs2}/>
        <Image source={Imagens.eletricistaa} style={styles.imgs2}/>
        </View>

        <View style={styles.containerImgs}>
        <Image source={Imagens.eletricistaa} style={styles.imgs}/>
        <Image source={Imagens.eletricistaa} style={styles.imgs2}/>
        <Image source={Imagens.eletricistaa} style={styles.imgs2}/>
        </View>

        <View style={styles.containerImgs}>
        <Image source={Imagens.eletricistaa} style={styles.imgs}/>
        <Image source={Imagens.eletricistaa} style={styles.imgs2}/>
        <Image source={Imagens.eletricistaa} style={styles.imgs2}/>
        </View>
       

           </View>
        </View>

         {/* <FlatList
            data={list}
            style={styles.list}
            renderItem={({ item }) => <ListItem data={item}/>} 
            //keyExtractor={(item) => item.id}
            keyExtractor={(item) => item.avatar}
                         />*/}

            </View> 
   
            </ScrollView>
        </ImageBackground>
    );
};

export default AreaAtuacao;






