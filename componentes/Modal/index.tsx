import React from 'react';
import { StyleSheet, View , TouchableOpacity,ScrollView} from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import AntDesign from '@expo/vector-icons/AntDesign';
import {RadioGroupSimpleUsageShowcase} from '../Radio';
import {RadioGroupSimpleUsageShowcase2} from '../Radio2';
import { useNavigation } from '@react-navigation/native'; // Importação do useNavigation
import SelectOption from '../SelectProfissoes';


export const ModalWithBackdropShowcase = (): React.ReactElement => {

  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation(); // Obtendo o objeto navigation

 
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.input} onPress={() => setVisible(true)}>
      <Text style={styles.textInput}>Encontre um profissional</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card style={styles.card} disabled={true}>
          
          <View style={styles.fundoFiltros}>
          <Text style={styles.filtro}> Filtre por suas preferências</Text>
          <AntDesign name="menufold" size={24} color="white" style={styles.searchIcon} />
          </View>
          <ScrollView>
          <Text style={styles.tituloselect}> Escolha a profissão </Text>
         <SelectOption/>

          <RadioGroupSimpleUsageShowcase/>
          <RadioGroupSimpleUsageShowcase2/>
          

          <TouchableOpacity style={styles.button2} onPress={() => setVisible(false)}>
            <Text style={styles.buttonText2}>Enviar</Text>
          </TouchableOpacity>
          </ScrollView>
        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 70,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card:{
    height:500,
    width:350,
  },
  input:{
    height:50,
    width:350,
    paddingLeft:45,
    paddingRight:1,
    borderWidth:3,
    backgroundColor:'white',
    borderColor:'white',
    marginBottom:5,
    borderRadius:55,
    color:'#3669a4',
    justifyContent:'center',
    alignItems:'center',
  },
  searchIcon: {
   marginLeft:260,
   bottom:7
  },
  textInput:{
    marginRight:60,
    fontWeight:500,
    fontSize:19,
    color:'#3669a4',
  },

  button2:{
    backgroundColor:'#ff914d',
    borderRadius:25,
    height:35,
    justifyContent:'center',
    alignItems:'center',
    marginTop:25,
    marginLeft:80,
    width:130,  
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.5,
    marginBottom:20
  },
  buttonText2:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },


  filtro:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:19,
    marginLeft:5,
    top:15
  },
  fundoFiltros: {
    backgroundColor: '#ff914d',
    width: '100%', // Extend across the entire width
    height: 50,
    marginBottom: 30,
   
  },

  tituloselect:{
    color:'#ff914d',
    fontSize:19,
    fontWeight:'bold',
    marginBottom:5,
  },
  opcoes:{
    fontSize:15,
    marginBottom:5,
    color:'#3669a4',
  }

 
});