import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#e9e9e7',
       
      },
      navChat:{
        width:393,  
        display:'flex',
        paddingBottom:40,
      },
      navContent:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:393,
        height:50,
        marginTop:30,
        
      },
      navbar:{
        backgroundColor:'#FF8F49',
        height:50,
        width:360,
        borderRadius:20,
        justifyContent:'flex-start',
        flexDirection:'row',
        alignItems:'center'
      },
      textNav:{
        fontSize:25,
        color:'#fefefe',
        fontWeight:'bold',
        marginLeft:30,
        
    
      },
      filterButton: {
        backgroundColor: '#FF6F00',
        borderRadius: 50,
        padding: 10,
      },
      filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
        // Estilo para o contêiner do campo de entrada (inputWrapper)
  inputWrapper: {
    marginVertical: 10, // Espaçamento vertical para separar os inputs
    paddingHorizontal: 10, // Padding nas laterais
    backgroundColor: '#fff', // Fundo branco para o campo
    borderRadius: 8, // Bordas arredondadas
    borderWidth: 1, // Borda fina
    borderColor: '#ddd', // Cor da borda
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombras para Android
  },
  // Estilo do campo de entrada (input)
  input: {
    height: 40, // Altura do input
    paddingHorizontal: 10, // Padding dentro do input
    fontSize: 16, // Tamanho da fonte
    color: '#333', // Cor do texto
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
        left:19,
        zIndex:-1,
        bottom:20
      

      },
      tab: {
        color: '#FF6F00',
        fontSize: 20,
        paddingRight:69,
        fontWeight:'800'

      },
      tab1:{
       position:'relative',
        fontSize: 14,
        
      },
      card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 5,
        marginBottom: 20,
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF6F00',
        marginBottom: 10,
      },
      highlightedText: {
        color: '#1A73E8',
      },
      category: {
        fontSize: 16,
        marginBottom: 5,
      },
      categoryText: {
        color: '#1A73E8',
        fontWeight: 'bold',
      },
      location: {
        fontSize: 16,
        marginBottom: 10,
      },
      distance: {
        color: 'red',
        fontWeight: 'bold',
      },
      requestDescription: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
      },
      descriptionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      descriptionText: {
        marginTop: 5,
        fontSize: 14,
        color: '#333',
      },
      submitButton: {
        backgroundColor: '#00C851',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      inputDesc:{
        width:360,
        height:150
      },
    });
    

export default styles;
