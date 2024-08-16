import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',


  },
  logoHelpHouseLaranja:{
    width:'60%',
    marginTop:'5%'
  },
  texto:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'80%',
    height:'30%',

  },
  confirmeId:{
    fontWeight:'bold',
    fontSize:25,
  },
  id:{  
    fontWeight:'bold',
    fontSize:25,
    color:'#004AAD',
    marginBottom:'16%',
    
  },
  verificacao:{
    display:'flex',
    justifyContent:'center'
  },
  codigo:{
    display:'flex',
    height:'40%',
    width:'100%',
    flexDirection:'column'

  },
  box:{
    display:'flex',
    height:'50%',
    justifyContent:'space-around',
    alignItems:'center',
    width:'100%',
    flexDirection:'row',
  },
  numCodigo:{
    width:'15%',
    height:'40%',
    borderRadius:14,
    backgroundColor:'#EDE6E6',
    borderColor: '#004AAD',
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    
  },
  msgCodigo:{
    position:'relative',
    left:'27%',
    fontSize:17,
  
  },
  msgReenviar:{
    position:'relative',
    left:'35%',
    fontSize:17,
    color:'#004AAD',
    fontWeight:'bold',
  },

});

export default styles;
