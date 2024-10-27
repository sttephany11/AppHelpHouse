import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,

    },
    fundoBranco:{
        backgroundColor:'#fff',
        width:350,
        borderRadius:25,
        
        marginLeft:33,
        height:680
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
        marginBottom:20
    },
    cep:{
        fontSize:15,
        color:'black',
    },
    dados:{
        fontSize:20,
        fontWeight:'bold',
        color:'#004aad',
        marginTop:10,
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
    },

});

export default styles;
