import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',     
  },

  //foto
  containerPerfil:{
  justifyContent:'center',
  alignItems:'center',
  },

  photo:{
    width:130,
    height:130,
    borderRadius:100,
    marginTop:'30%',
    borderColor:'#fff',
    borderWidth:5,
    margin:10,
  },

  
  button:{
    backgroundColor:'#004AAD',
    borderRadius:25,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%',
    marginLeft:'5%',
    width:160,  
  },
  buttonText:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },



  //button proximo
   
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
});

export default styles;