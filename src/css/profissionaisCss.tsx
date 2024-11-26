import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background:{
        flex:1,

    },
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    fundoBranco:{
        backgroundColor:'#fff',
        width:370,
        borderRadius:25,
        marginTop:70,
        marginLeft:13,
        flex:1
    },
    tituloPrincipal:{
      color:'#fff',
      top:50,
      fontWeight:'bold',
      fontSize:33,
     
    },
    tituloPrincipal2:{
      color:'#fff',
      top:50,
      fontWeight:'bold',
      fontSize:33,

    },

    //input que recebe valores
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius:30,
        fontWeight:500,
        fontSize:19,
        backgroundColor:'#faae70',
        borderColor:'#fff',
        color:'red',
        marginTop:10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        height:50,
        width:350,
        marginLeft:10
      },
      searchIcon: {
        marginRight: 10,
      },
      input: {
        flex: 1, 
        borderColor:'black',
        color:'white',
        fontSize:16,
        fontWeight:'bold',
      },

      //container onde vai ficar o perfill dos usuarios
      containerProfissionais:{
        justifyContent:'center',
        alignItems:'center',
        width:310,
        height:120,
        backgroundColor:'#e9e9e7',
        marginLeft:30,
        marginTop:20,
        borderRadius:25,
        top:5,
      },
      margin:{
        marginTop:5,
      },

      imgPerfilPro:{
        width:60,
        height:60,
        borderRadius:50,
        top:14
      },
      containerDados:{
        width:300,
        height:80,
        marginLeft:20,
        bottom:25,
      },
      NomeProfissional:{
        fontWeight:'bold',
        fontSize:19,
        marginLeft:80,
        bottom:40,
     
      },
      descrPerfil:{
        marginLeft:80,
        bottom:35,
        //fontWeight:'bold',
      },

      //parte das estrelas
      containerAvaliacao:{
        marginTop:5,
        flexDirection:'row',
        bottom:30,
        marginRight:90,
      },
      media:{
        fontWeight:'bold',
    },
      textOpinioes:{
        marginLeft:5,
        fontSize:10,
        top:4
      },

      //parte da regiao
      containerRegiao:{
        flexDirection:'row',
        bottom:15,
        marginRight:170,
        fontWeight:'bold'
      },


      //check box 
      checkboxContainer:{
        flexDirection:'column',
        width:200, 
        
      },
      tituloselect2:{
        fontSize:19,
        color:'#004aad',
        fontWeight:'bold',
        marginTop:15,
        marginLeft:15,
        marginBottom:10
      },

      filtro:{
        color:'black',
        fontWeight:'bold',
        fontSize:15, //17
        marginLeft:35,
        top:20,
       
      },
      filtro3:{
        color:'black',
        fontWeight:'bold',
        fontSize:18,
        marginLeft:35,
       
      },
      area:{
        color:'#004aad',
        fontWeight:'bold',
      },
      filtro2:{
        color:'#ff914d',
        fontWeight:'bold',
        fontSize:18,
        marginLeft:14,
        top:30,
        marginTop:10,
      },
      searchIcon2: {
        marginLeft:320,
  
       },
       tituloselect:{
        fontSize:19,
        color:'#004aad',
        fontWeight:'bold',
        marginTop:15,
        marginLeft:15,
      
        
       },
       tituloselectInput:{
        fontSize:18,
        color:'#004aad',
        fontWeight:'bold',
        marginTop:15,
        marginLeft:16,
        top:10,
       },

       row:{
        flexDirection:'row',
        marginLeft:27,
        marginBottom:5
       },
       pickerContainer:{
        marginLeft:17,
        color:'black'
       },
       marginCheck:{
        marginTop:10,
       },
       marginInput:{
        marginTop:20,
       },
       margin3:{
        marginTop:20
       },
    
          
    input3:{
      borderBottomWidth:3,
      borderColor: '#a6a6a6',
      height:40,
      marginBottom:5,
      fontSize:16,
      color:'black',
      paddingHorizontal:10,
      width:330,
      marginLeft:15,
      marginTop:10,
     
      },
      
    //MODAL
   
      modal: {
      height: 550, 
      backgroundColor: '#fff',
      borderRadius:20,
      marginTop:"40%",
      width: 370,
      marginLeft:13,

      },
      containerModal:{
        justifyContent:'center',
        marginTop:'20%'
      },
      
      tituloModal:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:32,
        top:5,
      },
      containerTitulo:{
        width:370,
        height:42,
        backgroundColor: '#ff914d',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom:15,
      },
      subtitulo:{
        fontWeight:'bold',
        fontSize:14,
        marginLeft:24,
      },

      button2:{
        backgroundColor:'#ff914d',
        borderRadius:25,
        height:38,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        marginLeft:110,
        width:140,  
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.5, 
      },
      buttonText2:{
        color:'#fff',
        fontSize:19,
        fontWeight:'bold'
      },

      button3:{
        backgroundColor:'#004aad',
        borderRadius:25,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginLeft:120,
        width:130,  
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.5, 
      },
      buttonText3:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold'
      },

      inputFront:{
        borderBottomWidth:2,
        borderColor: '#a6a6a6',
        height:40,
        marginBottom:5,
        width:300,
        marginLeft:35,
        marginTop:5,
        bottom:15,
        },
        click:{
          color:'black',
          fontWeight:'bold',
          fontSize:15,
          marginLeft:30,
          marginTop:15
        },
        dropdown: {
          backgroundColor: '#f0f0f0',
          width:330,
        },
        dropdownContainer: {
          backgroundColor: '#ffffff',
       
        },

});

export default styles;
