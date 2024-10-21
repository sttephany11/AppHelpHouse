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
        marginTop:50,
        marginLeft:22,
        flex:1
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
        height:150,
        backgroundColor:'#e9e9e7',
        marginLeft:28,
        marginTop:20,
        borderRadius:25,
        top:20,
      },
      margin:{
        marginTop:5,
      },

      imgPerfilPro:{
        width:60,
        height:60,
        borderRadius:50,
      },
      containerDados:{
        width:300,
        height:80,
        marginLeft:20,
        bottom:25,
      },
      NomeProfissional:{
        fontWeight:'bold',
        fontSize:17,
        marginLeft:80,
        bottom:55,
     
      },
      descrPerfil:{
        marginLeft:80,
        bottom:50,
        //fontWeight:'bold',
      },

      //parte das estrelas
      containerAvaliacao:{
        marginTop:5,
        flexDirection:'row',
        bottom:30,
        marginRight:90,
      },
      textOpinioes:{
        marginLeft:5,
        fontSize:10,
        top:4
      },

      //parte da regiao
      containerRegiao:{
        flexDirection:'row',
        bottom:20,
        marginRight:170,
        fontWeight:'bold'
      },


      //check box 
      checkboxContainer:{
        flexDirection:'column',
        width:200,
      },

      filtro:{
        color:'#ff914d',
        fontWeight:'bold',
        fontSize:25,
        marginLeft:14,
        top:30,
        marginBottom:10,
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
        color:'#ff914d',
        fontWeight:'bold',
        marginTop:15,
        marginLeft:15,
        
       },
       row:{
        flexDirection:'row',
        marginLeft:27
       },
       pickerContainer:{
        marginLeft:20,
       
       },
       marginCheck:{
        marginTop:10,
       },
       marginInput:{
        marginTop:20,
       },
    
          
    input3:{
      borderBottomWidth:3,
      borderColor: '#ff914d',
      height:40,
      marginBottom:5,
      fontSize:16,
      color:'black',
      paddingHorizontal:10,
      width:300,
      marginLeft:15,
      marginTop:20,
      },
      
    
   
      modal: {
      height: 550, 
      backgroundColor: '#fff',
      borderRadius:20,
      marginTop:"40%",
      width: 360,
      marginLeft: 25,
      borderColor: 'black',
      borderWidth: 3, 

      },
      containerModal:{
        justifyContent:'center',
        marginTop:'20%'
      },
      
  

});

export default styles;
