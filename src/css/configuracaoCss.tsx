import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,

    },
    fundoBranco:{
        backgroundColor:'#fff',
        width:350,
        borderRadius:25,
        marginLeft:22,
        height:680,
        bottom:15
    },
    
    container:{
    marginLeft:30,
    marginTop:20,
    },
    Textconfiguracao:{
        fontSize:32,
        fontWeight:'bold',
        color:'#004aad',
        marginLeft:65,
        bottom:35,
    },
    TextmeuDados:{
        fontSize:27,
        fontWeight:'bold',
        color:'#004aad',
        marginBottom:10
    },
    cep:{
        fontSize:15,
        color:'black',
    },
    dados:{
        fontSize:20,
        fontWeight:'bold',
        color:'#004aad',
        marginTop:5,
    },
    dadosCli:{
        marginTop:5,
        fontSize:16,
    },
    cartao:{
       
    },
    nomeCartao:{
        fontSize:16,
        fontWeight:'bold',
        top:3,
        marginLeft:10
    },
    numeroCartao:{
        marginLeft:50,
        bottom:20
    },
    adicionar:{
        fontWeight:'bold',
        marginTop:10,
        marginBottom:15
    },
    // styles.input e styles.saveButton
input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width:130,
  },
  input2: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width:200,
  },
  input3: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width:170,
  },
  saveButton: {
    backgroundColor: '#004aad',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    width:260,
    marginLeft:15,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:18,
  }
  

});

export default styles;
