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
        backgroundColor:'#bc000f',
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
        bottom: 140,
        marginTop:15,
        marginLeft:20
    },
    textLocalizacao:{
        bottom: 150,
        marginLeft:15,
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
        bottom: 140,
        marginTop:40,
        marginLeft:25
    },

    containerVerical:{
    justifyContent:'center',
    flexDirection:'row',
    bottom: 120,
   
    },

    fotosRolagem:{
        width:150,
        height:150,
        marginLeft:15,
        borderRadius:20
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
        marginBottom:15,
        
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
    mediaEstrelas:{

    },

    textMedia:{
        bottom:130,
        marginLeft:18,
        fontSize:12
    },
    media:{
        fontWeight:'bold',
    },

    //modal denuncia
    containerPedidos:{
        width:340,
        height:730,
        backgroundColor:'#e9e9e7',
        marginLeft:25,
        marginTop:60,
        borderRadius:25,
      },
      botaoAceitar: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 30,
        width:130,
        height:50,
        marginLeft:25,
      },
      botaoRecusar: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 30,
        width:130,
        height:50,
        marginRight:30
      },
      
      tituloFundo:{
        backgroundColor: '#bc000f',
        justifyContent:'center',
        alignItems:'center',
        width:340,
        height:50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection:'row',
      },
      tituloModal:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:28,
       marginRight:160
      },
      tituloModal2:{
        color:'#545454',
        fontWeight:'bold',
        fontSize:17,
        justifyContent:'center',
        marginLeft:12,
        marginTop:15,
      },
      tituloModal3:{
        color:'#545454',
        fontWeight:'bold',
        fontSize:17,
        justifyContent:'center',
        marginLeft:12,
        
      },
      opcoes:{
        fontWeight:'bold',
        fontSize:20,
        justifyContent:'flex-start',
        marginLeft:35,
        marginTop:20,
        marginBottom:5,
        color:'#0044CC',
      },
      opcoes2:{
        fontWeight:'bold',
        fontSize:18,
        justifyContent:'flex-start',
        marginTop:20,
      
        marginBottom:5,
      },
      
      
      // check box 
      container2: {
        padding: 20,
       
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      label: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
      },
      
      
        input3:{
          borderBottomWidth:3,
          borderColor: '#545454',
          height:40,
          marginBottom:5,
          fontSize:16,
          color:'black',
          paddingHorizontal:5,
          width:300,
          marginLeft:20,
          bottom:20
        },
      
        anexo:{
        width:290,
        height:40,
        backgroundColor:'#a6a6a6',
        },
        iconAnexo:{
          marginLeft:20,
          top:5,
        },
        iconReportar:{
      
        },
        textAnexo:{
          marginLeft:20,
          top:9,
          fontSize:18,
          color:'#fff',
          fontWeight:'bold',
        },
        buttonEnviar:{
      
          backgroundColor:'#bc000f',
          width:125, 
          borderRadius:25,
          height:38,
          shadowColor: 'black',
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 9 },
          shadowOpacity: 0.5, 
          
        },
        buttonEnviar2:{
          backgroundColor:'#a6a6a6',
          width:100, 
          borderRadius:25,
          height:35,
          shadowColor: 'black',
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 9 },
          shadowOpacity: 0.5, 
          marginTop:15,
        },
        buttonText2:{
            color:'#fff',
            fontSize:20,
            fontWeight:'bold'
          },
        textButton2:{
          fontSize:18,
          color:'#fff',
          fontWeight:'bold',
          marginLeft:10,
          top:7,
        },
        button3:{
            backgroundColor:'#bc000f',
            borderRadius:25,
            height:40,
            justifyContent:'center',
            alignItems:'center',
            marginTop:10,
            width:160, 
            shadowColor: 'black',
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 9 },
            shadowOpacity: 0.5, 
          }, 
          textButtondenuncia:{
            fontSize:22,
            color:'#fff',
            fontWeight:'bold',
            marginLeft:30,
            top:7
          },

          
});

export default styles;
