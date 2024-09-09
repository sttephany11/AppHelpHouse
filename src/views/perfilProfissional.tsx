import React, { useState } from 'react';
import { View, Text, ImageBackground,Image,TouchableOpacity,TextInput, ScrollView} from 'react-native';
import styles from '../css/perfilProfissionalCss';
import Imagens from "../../img/img";
import Entypo from '@expo/vector-icons/Entypo';

const PerfilProfissionalScreen: React.FC<{route: any, navigation: any }> = ({route, navigation }) => {
    const [searchText, setSearchText] = useState('');
       
    return (
        <ScrollView>
       <View style={styles.containerCapaFundo}>
       <TouchableOpacity><Image source={Imagens.fotoFundo} style={styles.capaFundo}/></TouchableOpacity>
       </View>


       
       <View style={styles.containerImgPerfil}>
       <TouchableOpacity style={styles.buttonContato}>
         <Text style={styles.textButton}>Entrar em contato</Text>
         </TouchableOpacity> 
       <TouchableOpacity><Image source={Imagens.perfil} style={styles.imgPerfil} /></TouchableOpacity>
       
       <Text style={styles.nome}>Clodoaldo Oliveira</Text>
       <Text style={styles.textBiografia}> Trabalhando como eletricista a mais de{'\n'} 15 anos,formado em eletrotécnica. </Text>
          <Text style={styles.textLocalizacao}>
            <Entypo name="location-pin" size={24} color="red" />Atua em São Paulo, Guaianazes
          </Text>
       
          <Text style={styles.vejaMais}>Veja mais de Clodoaldo</Text>
          

        <View style={styles.containerVerical}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem}/></TouchableOpacity>

        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2}/></TouchableOpacity>

        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2}/></TouchableOpacity>

        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2}/></TouchableOpacity>

        </ScrollView>
        </View>
         
        <Text style={styles.vejaMais}>Avaliações</Text>
        
        <View style={styles.containerBase}>
        <Image source={Imagens.perfil} style={styles.imgAvaliacao}/>
        <Text style={styles.nomeAvaliador} >João Felipe </Text>
        <Text style={styles.textAvaliacao} >Otimo profissional, entrega no prazo! </Text>
        </View>

    {/* essa margin serve para separar as avaliações */}
        <View style={styles.margin}></View>

        <View style={styles.containerBase}>
        <Image source={Imagens.perfil} style={styles.imgAvaliacao}/>
        <Text style={styles.nomeAvaliador} >Lucas</Text>
        <Text style={styles.textAvaliacao} >Otimo profissional! </Text>
        </View>
       </View>

       </ScrollView>
    );
};

export default PerfilProfissionalScreen;