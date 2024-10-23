import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    //fundo
    background: {
        flex: 1,

    },

    containerBoasVindas:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    containerFrase:{
        marginTop:30,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    boasVindas: {
        color: 'white',
        fontSize: 30,
      
        justifyContent:'center',
        alignItems:'center',
        marginTop: 80,
        marginRight:2,
    },
    frase: {
        color: '#004aad',
        fontSize: 35,
     
        justifyContent:'center',
        alignItems:'center',
    },

    ImgPerfil:{
        borderRadius:50,
        width:70,
        height:70,
        borderColor:'#004aad',
        marginTop: 80,
        marginLeft:40,
        borderWidth: 3,
    },
    lupa:{
        width:35,
        height:35,
        marginEnd:10,
    },

    //inputs
    containerInput:{
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
    },

    lupaAzul:{
      width:30,
      height:35,
      left:28,
      top:43,
      zIndex:1
    },
    
      filtroImg:{
        width:36,
        height:35,
        marginRight:7,
      },
      list:{

      },

      //butons profissoes com rolagem lateral
      buttonProfissoes:{
        backgroundColor:'#ede6e6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius:25,
      },

      buttonProfissoes2:{
        backgroundColor:'#ede6e6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius:25,
        marginLeft:10
      },

      textButton:{
        justifyContent:'center',
        alignItems:'center',
        color:'#5169a2',
        fontSize:20
      },

      containerProfissoes:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:30,
      },
      containerProfissoes2:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:15,
      },

      //parte do meus pedidos

      containerPedidos:{
        justifyContent:'center',
        alignItems:'center',
      },

      fundoPedidos:{
        backgroundColor:'white',
        width:370,
        height:118,
        borderRadius:25,
        marginTop:30,
      },

      textPedidos:{
        color:'#004aad',
        fontSize:30,
        top:25,
        fontWeight:'bold',
        left:28
      },

      textPedidos2:{
        color:'#004aad',
        fontSize:15,
        top:24,
        left:31,
        marginBottom:50,
      },

      //fundo azul com ultimos serviços procurados

      containerImgs:{
        flexDirection:'row',
        marginLeft:8
      },

      fundoAzul:{
        backgroundColor:'#004aad',
        width:370,
        height:360,
        borderRadius:25,
        marginTop:30,
        marginBottom:30,

      },
      frasePedidos:{
        color:'white',
        fontSize:25,
        marginLeft:37,
        marginTop:10,
        marginBottom:10,
        fontWeight:'bold'
      },
      imgs:{
        marginTop:8,
        width:100,
        height:120,
        marginLeft:18,
        borderRadius:10,
      },
      imgs2:{
        marginTop:8,
        width:100,
        height:120,
        marginLeft:5,
        borderRadius:10,
      },


      input:{
        height:50,
        width:380,
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

      textInput:{
        marginRight:60,
        
        fontSize:17,
        color:'#3669a4',
      },


});
export default styles;
