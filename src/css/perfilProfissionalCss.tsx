import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerCapaFundo: {
        justifyContent:'center',
        alignItems:'center',
    },
    capaFundo:{
        width:450,
        height:250,
    },

    //img do perfil
    containerImgPerfil:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
       
    },
    imgPerfil: {
        borderRadius: 100,
        width: 150,
        height: 150,
        marginLeft:30,
        bottom:120
    },

    buttonContato:{
        backgroundColor:'#004aad',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius:25,
        marginLeft:220,
        marginTop:30,
        fontWeight:'bold'
    },
    textButton:{
        justifyContent:'center',
        alignItems:'center',
        color:'#fff',
        fontSize:17
      },

      //nome, localizacao 
      nome:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        bottom: 110,
        marginTop:15,
        marginLeft:20
    },
    textLocalizacao:{
        bottom: 110,
        marginLeft:20,
        marginTop:5,
    },
    textBiografia:{
        bottom: 110,
        marginLeft:20,
        marginTop:10,
        fontWeight:'bold',
    },

    //a partir da parte Veja mais 
    vejaMais:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
        bottom: 110,
        marginTop:40,
        marginLeft:25
    },

    containerVerical:{
    justifyContent:'center',
    flexDirection:'row',
    bottom: 90,
   
    },

    fotosRolagem:{
        width:150,
        height:150,
        marginLeft:15
    },
    fotosRolagem2:{
        width:150,
        height:150,
        marginLeft:10
    },

    //Avaliaçoes
    containerBase:{
        width:390,
        height:80,
       // backgroundColor:'red',
        bottom: 90,
        marginLeft:20,
        
    },

    margin:{
        marginTop:15,
    },

    imgAvaliacao:{
        width:80,
        height:80,
        borderRadius:80,
    },

    nomeAvaliador:{
        marginLeft:90,
        bottom:75,
        fontWeight:'bold',
        fontSize:17
    },
    textAvaliacao:{
        marginLeft:90,
        bottom:70,
        fontWeight:'bold',
        fontSize:12
    },

});

export default styles;
