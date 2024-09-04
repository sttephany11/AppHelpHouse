import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, ImageBackground } from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from "../../componentes/Button/Button";
import Imagens from "../../img/img";
import AntDesign from '@expo/vector-icons/AntDesign';


import styles from '../css/homeCss';
const AreaAtuacao: React.FC<{ navigation: any }> = ({ navigation }) => {
    

    return (
        <ImageBackground
            source={Imagens.fundoBemVindo}
            style={styles.background}  // Define o estilo para a imagem de fundo
            resizeMode="cover"   // Ajusta a imagem para cobrir a tela
        >

            <ScrollView>
                <Text style={styles.boasVindas}>Boas-vindas! </Text>

                        <Text style={styles.boasVindas}>Boas-vindas!</Text>

                     

                        <View style={styles.pesquisa}>
                        <TextInput 
                                placeholder='O que você precisa?'
                                style={styles.pesquisa1}
                                placeholderTextColor='#004aad'
                                keyboardType='default'
                                
                            />
                            <Image source={Imagens.lupaAzul} style={styles.lupa} />
                            
                            
                        </View>
                



                <View style={styles.trabalhos}>

                    <View style={styles.pedreiro}>
                        <Text style={styles.name1}>Pedreiro</Text>
                        <Image source={Imagens.pedreiro} style={styles.pedreiroImg} />
                    </View>

                    <View style={styles.mecanico}>
                        <Text style={styles.name2}>Mecânico</Text>
                        <Image source={Imagens.mecanico} style={styles.mecanicoImg} />
                    </View>

                    <View style={styles.eletricista}>
                        <Text style={styles.name3}>Eletricista</Text>
                        <Image source={Imagens.eletricista} style={styles.eletricistaImg} />
                    </View>

                    <View style={styles.jadineiro}>
                        <Text style={styles.name4}>Jadineiro</Text>
                        <Image source={Imagens.jardineiro} style={styles.jardineiroImg} />
                    </View>

                    <View style={styles.encanador}>
                        <Text style={styles.name5}>Encanador</Text>
                        <Image source={Imagens.encanadorK} style={styles.encanadorImg} />
                    </View>

                    <View style={styles.diarista}>
                        <Text style={styles.name6}>Serviço</Text>
                        <Text style={styles.domestico}>doméstico</Text>
                        <Image source={Imagens.diarista} style={styles.diaristaImg} />
                    </View>

                    <View style={styles.pintor}>
                        <Text style={styles.name7}>Pintor</Text>
                        <Image source={Imagens.pintor} style={styles.pintorImg} />
                    </View>

                    <View style={styles.instalacao}>
                        <Text style={styles.name8}>Instalação</Text>
                        <Image source={Imagens.instalacao} style={styles.instalacaoImg} />
                    </View>

                    <View style={styles.brancoMeio}>
                        <Text style={styles.pedidos}> Meus pedidos</Text>
                        <Text style={styles.acompanhe}> Acompanhe seus pedidos...</Text>

                    </View>

                    <View style={styles.fundoAzul}>
                        <Text style={styles.ponto}>...</Text>
                        <Text style={styles.alguns}>Alguns serviços mais</Text>
                        <Text style={styles.alguns1}>procurados ultimamente.</Text>
                        <View style={styles.azulClaro}>
                        </View>
                        {/* <View style={styles.azulClaro2}>
                        </View> */}

                        <Image source={Imagens.mestreDeObra} style={styles.mestreDeObra} />

                        <Image source={Imagens.torneira} style={styles.torneira} />

                        <Image source={Imagens.eletricistaa} style={styles.eletricistaa} />
                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
    );
};

export default AreaAtuacao;






