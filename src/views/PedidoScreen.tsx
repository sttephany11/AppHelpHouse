import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../css/criarPedidoCss';
import { SelectWithGroupsShowcase } from '../../componentes/SelectGroup';


const PedidoScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.navChat}>
        <View style={styles.navContent}>
          <View style={styles.navbar}>
            <Text style={styles.textNav}>Pedido</Text>
          </View>
        </View>
     

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.tab}>      Criar um pedido</Text>
        <Text style={styles.tab1}>Agendadas</Text>
      </View>
       </View>

      {/* Request Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Solicitação para <Text style={styles.highlightedText}>Leila Pereira</Text>    {/* Nome da pessoa que ta pedindo*/}
        </Text>
        <Text style={styles.category}>
           Categoria:
           <SelectWithGroupsShowcase />
           {/*<Text style={styles.categoryText}>Pintura</Text> */}
        </Text>
        <Text style={styles.location}>São Paulo, Guainases <Text style={styles.distance}>A 2 km de você</Text></Text>

        {/* Request Description */}
        <View style={styles.requestDescription}>
          <Text style={styles.descriptionLabel}>Solicitação:</Text>
          <Text style={styles.descriptionText}>
            Preciso de pintura na parte externa da minha casa, gostaria do serviço realizado até dia 11/10.
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PedidoScreen;