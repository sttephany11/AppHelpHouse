import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Imagens from "../../img/img";


function AvaliacaoProfissional({ navigation }) {
  const [chamarModal, setChamarModal] = useState(false);
  const [rating, setRating] = useState(0); // Estado para armazenar a quantidade de estrelas selecionadas

  // Função para atualizar a quantidade de estrelas
  const handleStarPress = (star) => {
    setRating(star);
  };

  // Função para enviar a avaliação e navegar para a tela do perfil
  const EnviarAvaliacaao = () => {
    setChamarModal(false);
    navigation.navigate('perfilProfissional', { rating }); // Envia a avaliação para a tela de perfil do profissional
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <StatusBar barStyle="light-content" />

      {/* Botão para abrir o modal */}
      <TouchableOpacity onPress={() => setChamarModal(true)}>
        <Text style={{ fontSize: 20, marginTop: 80 }}>Avaliar Profissional</Text>
      </TouchableOpacity>

      {/* Modal para avaliação */}
      <Modal
        transparent={true}
        visible={chamarModal}
        animationType="slide"
        onRequestClose={() => setChamarModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Avalie com estrelas:</Text>
            
            {/* Estrelas para avaliação */}
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={32}
                    color={star <= rating ? '#FFD700' : '#D3D3D3'}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Botão para confirmar a avaliação */}
            <TouchableOpacity style={styles.submitButton} onPress={EnviarAvaliacaao}>
              <Text style={{ fontSize: 18, color: 'white' }}>Enviar Avaliação</Text>
            </TouchableOpacity>

            {/* Botão para fechar o modal */}
            <TouchableOpacity onPress={() => setChamarModal(false)}>
              <Text style={{ fontSize: 16, color: 'red', marginTop: 10 }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      starsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
      },
      
    
});



export default AvaliacaoProfissional;
