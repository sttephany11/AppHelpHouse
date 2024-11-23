import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10, 
  
  },
  background:{
    flex: 1,
  },
  navContent:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:393,
    height:50,
    marginTop:60,
    marginRight:20,
    
    
  },
  pedidoContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tituloPedido: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  navbar:{
    backgroundColor:'#004aad',
    height:50,
    width:380,
    borderRadius:20,
    justifyContent:'flex-start',
    flexDirection:'row',
    alignItems:'center',
    zIndex:2,
    marginRight:20,
    marginTop:40,
  },

  textNav:{
    fontSize:25,
    color:'#fefefe',
    fontWeight:'bold',
    marginLeft:15,
  },

  
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    width:330,
    height:60,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 13,
    bottom:20,
    marginBottom:20,
    marginRight:20,
  },
 
  
  Texttab: {
    color: '#ff914d',
    fontSize: 20,
    top:20,
    fontWeight:'bold',
    marginLeft:27,
  },
  
  tab1:{
   position:'relative',
    fontSize: 14,
    
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginTop:30,
    top:15,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0044CC', // Azul mais escuro
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#004aad',
    marginTop: 5,
  },
  clienteName: {
    fontWeight: 'bold',
    color: '#FF6600', // Laranja do cliente
    fontSize: 18,
    top:12,
  },
  cardLocation: {
    fontSize: 17,
    color: '#004aad',
    fontWeight: 'bold',
  },
  cardDistance: {
    fontSize: 17,
    color: '#004aad',
    fontWeight: 'bold',
  },
  cardDate: {
    fontSize: 17,
    color: '#0044CC',
    fontWeight: 'bold',
  },
  cardPayment: {
    fontSize: 14,
    color: '#0044CC',
    marginTop: 5,
  },
  conversarButton: {
    backgroundColor: '#0044CC',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 15,
    alignItems: 'center',
    width:120,
    height:40,
    marginLeft:20,
  },
 
  conversarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    bottom:2
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

  
//MODALLL AVALIAÇÃO
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  width: 300,
  padding: 20,
  backgroundColor: 'white',
  borderRadius: 10,
  alignItems: 'center',
},
starsContainer: {
  flexDirection: 'row',
  marginBottom: 20,
},
submitButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#004aad',
  borderRadius: 5,
},
input2: {
  height: 40,
  width: 250,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  padding: 10,
  marginTop: 15,
  marginBottom: 10,
  textAlignVertical: 'top', // Para que o texto comece no topo
},

 

 
});

export default styles;
