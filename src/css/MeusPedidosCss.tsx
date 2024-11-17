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
    marginTop:110,
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
    zIndex:2
  },

  textNav:{
    fontSize:25,
    color:'#fefefe',
    fontWeight:'bold',
    marginLeft:15,
  },

  containerPedidos:{
    justifyContent:'center',
    alignItems:'center',
    width:370,
    height:190,
    backgroundColor:'#e9e9e7',
    marginLeft:20,
    marginTop:30,
    borderRadius:25,
  },
  navContainer:{
    width:'100%',
      height:140
},
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    width:180,
    height:60,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 13,
    marginRight:150,
   
    bottom:20
  },
  tab2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    width:180,
    height:60,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 13,
    marginBottom: 5,
    marginLeft:150,
    zIndex:1,
    bottom:80
  },
  tab: {
    color: '#fff',
    fontSize: 20,
    top:20,
    fontWeight:'bold',

  },
  Texttab: {
    color: '#004aad',
    fontSize: 20,
    top:20,
    fontWeight:'bold',

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
    bottom:10
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0044CC', // Azul mais escuro
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#004aad',
    marginTop: 5,
  },
  clienteName: {
    fontWeight: 'bold',
    color: '#FF6600', // Laranja do cliente
  },
  cardLocation: {
    fontSize: 14,
    color: '#004aad',
    marginTop: 5,
  },
  cardDistance: {
    fontSize: 14,
    color: '#FF6600',
  },
  cardDate: {
    fontSize: 14,
    color: '#0044CC',
    marginTop: 5,
  },
  cardPayment: {
    fontSize: 14,
    color: '#0044CC',
    marginTop: 5,
  },
  conversarButton: {
    backgroundColor: '#0044CC',
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  conversarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoAceitar: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
  botaoRecusar: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  
 
});

export default styles;
