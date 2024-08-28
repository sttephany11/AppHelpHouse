import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',     
  },
  fundo: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FF8F49',
   
  },
  scrollContainer: {

},
  title: {
    marginTop:'13%',
    justifyContent: 'center',
    alignItems: 'center',    
    
  },

  containerCadastro: {
    width: '100%',
    height:'100%',
    flexDirection:'column' ,
    alignItems: 'center',  
     
  },
  titulo2:{
    color: '#004AAD',
    fontSize: 35,
    fontWeight: '900',
    justifyContent:'center',
    alignItems:'center',
   
  },
  
  titulo3:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    marginTop:8,
    marginLeft:'13%',
    justifyContent:'center',
    alignItems:'center',
  },
  
  passos:{
        color:'#fff'
  },
  input:{
    width:280,
    height:60,
    position:'relative',
    top:60
  
   },
   buttonCad:{
    marginTop:'30%',
    marginLeft:'22%',
    width:160,
    color:'#004AAD',
   
  },


 
  button2:{
    backgroundColor:'#004AAD',
    borderRadius:25,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:'30%',
    marginLeft:'22%',
    width:160,  
  },
  buttonText2:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },





  //buton buscar cep 
  buttonEnviar: {
  margin:10,
  },


  // inputs
  title3:{
    fontSize:20,
    marginTop:5,
    color:'#fff',
    fontWeight:'bold',
    },
  
    input3:{
    borderBottomWidth:5,
    borderColor: '#fff',
    height:40,
    marginBottom:10,
    fontSize:16,
    color:'#fff',

    },


      //view de complemento e num
  
  inputNum:{
    borderBottomWidth:5,
    borderColor: '#fff',
    height:40,
    marginBottom:10,
    fontSize:16,
    color:'#fff',
    marginTop:5,
    width:80,
    justifyContent:'flex-start',
    },
    inputComple:{
      borderBottomWidth:5,
      borderColor: '#fff',
      height:40,
      marginBottom:10,
      fontSize:16,
      color:'#fff',
      marginTop:5,
      width:120,
      justifyContent:'flex-start',
      },

//icon
icon:{
color:'#fff',


},

containerIcon:{

},
    //button buscar

    inputsCep:{
      flexDirection:'row',
    },
 

      title4:{
        fontSize:20,
        marginTop:5,
        color:'#fff',
        fontWeight:'bold',
        marginLeft:150,
        },
     
});

export default styles;
