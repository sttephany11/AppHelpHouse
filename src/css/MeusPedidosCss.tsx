import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // O container ocupa toda a tela
    padding: 20, // Espaçamento interno ao redor do conteúdo
    backgroundColor: '#F5F5F5', // Cor de fundo clara
  },
  navContent:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:393,
    height:50,
    marginTop:90,
    marginLeft:10,
    
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
    alignItems:'center'
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

  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'flex-end',
    width:354,
    height:60,
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 13,
    marginBottom: 16,
    position:'relative',
    zIndex:-1,
    bottom:20
  },
  tab: {
    color: '#FF6F00',
    fontSize: 20,
    paddingRight:120,
    fontWeight:'800'

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
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0044CC', // Azul mais escuro
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  clienteName: {
    fontWeight: 'bold',
    color: '#FF6600', // Laranja do cliente
  },
  cardLocation: {
    fontSize: 14,
    color: '#666',
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
 
});

export default styles;
