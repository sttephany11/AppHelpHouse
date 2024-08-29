import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
  },
 
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
},
  container2: {
    flexDirection: 'row',
  },
  scrollView: {
    
  },

  input:{
  margin:30,
  height:50,
  width:250,
  borderRadius:20,
  paddingLeft:2,
  paddingRight:1,
  borderWidth:5,
  borderColor:'#3669a4',
  fontWeight:500,
  color:'gray',
  fontSize:19,
  flex:1,
},
area:{
  flexDirection:'row',
  alignItems:'center',
},
colunaTitulo:{
  height:73,
  width:500,
   marginTop:80,
   flex:1,
  },
  filtroImg:{
    width:36,
    height:35,
    marginRight:7,
  },
  tituloPrincipal:{
      color: 'white',
      textAlign:'center',
      fontSize: 34,
      fontWeight: '700',
      marginTop:20,
  },
  colunaPesquisa:{
      height:1000,
      width:350,
      alignItems:'center',
      borderRadius:16,
      backgroundColor:'white',
      marginTop:'30%',
     
  },
  colunaOpcao:{
      backgroundColor:'#e9e9e7',
      width: 300,
      height: 60,
      borderRadius: 15,
      alignItems:'center',
      marginTop:80,
      flexDirection:'row',
    },
  colunaOpcao2:{
      backgroundColor:'#e9e9e7',
      width: 300,
      height: 60,
      borderRadius: 15,
      
      alignItems:'center',
         
      marginTop:12,
      flexDirection:'row',
      
    },
    colunaRosa:{
      backgroundColor:'#eba3b5',
      width: 300,
      height: 120,
      borderRadius: 15,
      alignItems:'center',
      marginTop:20,
      flexDirection:'row',
    },
    textoOption:{
      color: '#3669a4',
      marginLeft: 9,
      fontSize: 20,
      fontWeight: '700',
     
    },
    textoEncontreMulheres:{
      color: 'white',
      marginLeft: 1,
      fontSize: 20,
      fontWeight: '700',
    },
    img:{
      height:60,
      width:60,
      justifyContent:'flex-start',
      marginLeft:10
    },
    list:{

    },

});

export default styles;