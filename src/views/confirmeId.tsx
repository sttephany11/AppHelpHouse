import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import Imagens from "../../img/img";
import styles from '../css/telaIdCss';




const ConfirmedId: React.FC<{ navigation: any }> = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [cont, setCont] = useState('');
    const [show, setShow] = useState(false);
    const [senha, setSenha] = useState('');

    // Defina a função handleLoginPress
 

    return (
        <View style={styles.container}>
         <Image source={Imagens.helpHouseLaranja} style={styles.logoHelpHouseLaranja}/>

            <View style={styles.texto}>
                <View style={styles.texto}>
                        <Text style={styles.confirmeId}>CONFIRME SUA</Text>
                        <Text style={styles.id}>IDENTIDADE</Text>
                        <Text >Um código de 4 digitos foi enviado em seu e-mail registrado, informe o códiigo para <Text style={styles.verificacao}>finalizar a verificação.</Text></Text>
                </View>
            </View>

                <View style={styles.codigo}>
                    <View style={styles.box}>
                        <View style={styles.numCodigo}></View>
                        <View style={styles.numCodigo}></View>
                        <View style={styles.numCodigo}></View>
                        <View style={styles.numCodigo}></View>
                    </View>
                    <Text style={styles.msgCodigo}>Não recebeu o código?</Text>
                    <Text style={styles.msgReenviar}>Reenviar agora!</Text>
                </View>
                
            
          
        </View>
    );
};

export default ConfirmedId;
