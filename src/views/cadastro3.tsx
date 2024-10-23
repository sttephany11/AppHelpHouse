import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, TextInput, ScrollView } from 'react-native';
import { Button } from "../../componentes/Button/Button"; // Verifique se o caminho está correto
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'
import Imagens from '../../img/img';
import styles from '../css/cadastro3Css';
import { useImage } from '../ImageContext';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialIcons } from '@expo/vector-icons'; // Ícone de olhinho

const CadastroScreen3: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { imageUrl, setImageUrl } = useImage();
    const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para mostrar/ocultar senha
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); // Estado para o campo de confirmar senha

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        if (!selectedImage) {
            Alert.alert('Erro', 'Nenhuma imagem selecionada.');
            return;
        }

        setUploading(true);

        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();
            const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
            const storageRef = ref(storage, `images/${filename}`);
            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            setImageUrl(url);
            setSelectedImage(null);
            Alert.alert('Sucesso', 'Imagem enviada com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar a imagem:', error);
            Alert.alert('Erro', 'Falha ao enviar a imagem.');
        } finally {
            setUploading(false);
        }
    };

    const { nomeContratante, cpfContratante, telefoneContratante, nascContratante } = route.params;
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailContratante, setEmailContratante] = useState('');

    const dadosCli = () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }
        
        navigation.navigate('cadastro2', {
            emailContratante: emailContratante,
            password: password,
            nomeContratante: nomeContratante,
            cpfContratante: cpfContratante,
            telefoneContratante: telefoneContratante,
            nascContratante: nascContratante, 
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.fundo}>
                <View style={styles.containerCadastro}>
                    <View style={styles.title}>
                        <Text style={styles.titulo2}>Últimos <Text style={styles.passos}> passos</Text></Text>
                        <Text style={styles.subtitulo}> Adicione seu email e uma foto de perfil</Text>
                    </View>

                    <View style={styles.containerPerfil}>
                        <TouchableOpacity>
                            <Image 
                                source={selectedImage ? { uri: selectedImage } : imageUrl ? { uri: imageUrl } : Imagens.perfilUsuario4} 
                                style={styles.photo} 
                            />
                            <View style={styles.cameraIcon}>
                                <TouchableOpacity onPress={pickImage}>
                                    <Entypo name="camera" size={26} color="white" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        {selectedImage && (
                            <TouchableOpacity onPress={uploadMedia} style={styles.button3} disabled={uploading}>
                            <Text style={styles.buttonText2}>{uploading ? 'Confirmando...' : 'Confirmar foto'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.title3}> Email</Text>
                        <TextInput 
                            placeholder="Digite um email..."
                            value={emailContratante}
                            onChangeText={value => setEmailContratante(value)}
                            style={styles.input3}
                        />

                        <Text style={styles.title3}> Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput 
                                placeholder="Sua senha..."
                                value={password}
                                onChangeText={value => setPassword(value)}
                                style={styles.input3}
                                secureTextEntry={!showPassword} // Controla a exibição da senha
                            />
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.title3}> Confirmar Senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput 
                                placeholder="Confirme sua senha..."
                                value={confirmPassword}
                                onChangeText={value => setConfirmPassword(value)}
                                style={styles.input3}
                                secureTextEntry={!showConfirmPassword} // Controla a exibição da senha
                            />
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.button2} onPress={dadosCli}>
                            <Text style={styles.buttonText2}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default CadastroScreen3;
