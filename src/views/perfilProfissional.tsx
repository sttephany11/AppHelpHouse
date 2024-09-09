import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from '../css/perfilProfissionalCss';
import Imagens from "../../img/img";
import Entypo from '@expo/vector-icons/Entypo';
import { useImage } from '../ImageContext'; // Ajuste o caminho conforme necessário

const PerfilProfissionalScreen: React.FC<{route: any, navigation: any }> = ({ route, navigation }) => {
    const [searchText, setSearchText] = useState('');
    const { imageUrl } = useImage(); // Obtém a URL da imagem do contexto

    return (
        <ScrollView>
            <View style={styles.containerCapaFundo}>
                <TouchableOpacity>
                    <Image source={Imagens.fotoFundo} style={styles.capaFundo} />
                </TouchableOpacity>
            </View>

            <View style={styles.containerImgPerfil}>
                <TouchableOpacity style={styles.buttonContato}>
                    <Text style={styles.textButton}>Entrar em contato</Text>
                </TouchableOpacity>
                
                {/* Verifica se há uma URL de imagem e exibe-a, caso contrário, exibe a imagem padrão */}
                <TouchableOpacity>
                    <Image source={imageUrl ? { uri: imageUrl } : Imagens.perfil} style={styles.imgPerfil} />
                </TouchableOpacity>
                
                <Text style={styles.nome}>Clodoaldo Oliveira</Text>
                <Text style={styles.textBiografia}>
                    Trabalhando como eletricista a mais de{'\n'} 15 anos, formado em eletrotécnica.
                </Text>
                <Text style={styles.textLocalizacao}>
                    <Entypo name="location-pin" size={24} color="red" /> Atua em São Paulo, Guaianazes
                </Text>
                
                <Text style={styles.vejaMais}>Veja mais de Clodoaldo</Text>
                
                <View style={styles.containerVerical}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem} /></TouchableOpacity>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2} /></TouchableOpacity>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2} /></TouchableOpacity>
                        <TouchableOpacity><Image source={Imagens.mestreDeObra} style={styles.fotosRolagem2} /></TouchableOpacity>
                    </ScrollView>
                </View>
                
                <Text style={styles.vejaMais}>Avaliações</Text>
                
                <View style={styles.containerBase}>
                    <Image source={Imagens.perfil} style={styles.imgAvaliacao} />
                    <Text style={styles.nomeAvaliador}>João Felipe</Text>
                    <Text style={styles.textAvaliacao}>Ótimo profissional, entrega no prazo!</Text>
                </View>

                <View style={styles.margin}></View>

                <View style={styles.containerBase}>
                    <Image source={Imagens.perfil} style={styles.imgAvaliacao} />
                    <Text style={styles.nomeAvaliador}>Lucas</Text>
                    <Text style={styles.textAvaliacao}>Ótimo profissional!</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default PerfilProfissionalScreen;
