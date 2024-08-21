import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
  },
 
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
},

container2: {
     
    flexDirection: 'row',
  },
  buttomEncanamento:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    borderRadius:8,
},

coluna1:{
    backgroundColor:'white',
    width: 340,
    height: 120,
    borderRadius: 15,
    alignItems:'center',
    justifyContent:'center', 
    textAlign:'center',   
    marginTop:80,
    flexDirection:'row',
    
},
texto1:{
    color:'#3669a4',
    fontSize:23,
    fontWeight:700,
    marginLeft:20,
    justifyContent:'center',
    alignContent:'center',
    textAlign:'center',
   
},
lupaGrande:{
    height:60,
    width:68,
    marginRight:20,
    justifyContent: 'center',
    alignItems: 'center',
},
propaganda: {
    height: 150,
    width: 300,
    marginTop: 19,
   
    flex:1,
  },

  titulo: {
    color: '#3669a4',
    
    fontSize: 33,
    fontWeight: '700',
    marginTop:20,
  },
  subtitulo: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',

  },
  colunaOpcao:{
    backgroundColor:'white',
    width: 340,
    height: 70,
    borderRadius: 15,
    alignItems:'center',
    marginTop:3,
    flexDirection:'row',
  },
  colunaOpcao2:{
    backgroundColor:'white',
    width: 340,
    height: 70,
    borderRadius: 15,
    
    alignItems:'center',
    
    marginTop:8,
    marginBottom:5,
    flexDirection:'row',
    flex:1,
  },

  encanadorImg:{
    height:60,
    width:70,
    justifyContent:'flex-start',
    marginLeft:10
  },
  textoOption:{
    color: '#3669a4',
    marginLeft: 9,
    fontSize: 25,
    fontWeight: '600',
   
  },
    textoOpcao:{
        color: '#3669a4',
       justifyContent:'flex-start',
        fontSize: 25,
        marginLeft:10,
        fontWeight: '600',
    },
    colunaServico:{
        backgroundColor:'#004aad',
        width: 340,
        height: 200,
        borderRadius: 15,
        alignItems:'center',
        justifyContent:'center', 
        textAlign:'center',
        marginTop:22,
       
        flexDirection:'column',
        flex:1,
    },
    texto2:{
        color: 'white',
        marginBottom:14,
        fontSize: 20,
        fontWeight: '700',
        justifyContent:'center',
        textAlign:'center',
    },
    servicosProcurado:{
        flexDirection:'row',
    },
    chuveiroImg: {
        width: 80,
        height: 80,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
       //justifyContent: 'space-between',
       
      },
      posicao:{

      },

});

export default styles;
