import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    //fundo
    background: {
        flex: 1,

    },
    fundoBranco:{
        backgroundColor:'#fff',
        width:350,
        borderRadius:25,
        marginTop:'40%',
        marginLeft:33,
        flex:1
    },
    
    container:{
    justifyContent:'center',
    alignItems:'center',
   
    },

    imgPerfil: {
        borderRadius: 100,
        width: 150,
        height: 150,
        justifyContent: 'center',
        bottom: 65,
        borderColor: '#004aad',
        borderWidth: 5,

    },
//nome do usuario
    nome:{
        fontSize:28,
        fontWeight:'bold',
        color:'#004aad',
        bottom: 65,
        marginTop:15,
    },
    textLocalizacao:{
        bottom: 65,
    },

    // mais procurados
    maisProcurados:{
        marginTop:40,
        fontSize:15,
        fontWeight:'bold',
        color:'#004aad',
        bottom: 65,
    },


});
export default styles;

