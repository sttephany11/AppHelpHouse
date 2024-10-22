import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#efefef',
  },
  navChat: {
    width: '100%',
    height: 230,
    display: 'flex',
  },
  navContent: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 150,
    marginTop: 30,
  },
  mensagensContainer: {
    flex: 1, // Ocupa todo o espaço disponível
    padding: 10,
    marginBottom: 20, // Espaço para o input de mensagem
  },
  mensagemItem: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    maxWidth: '90%', // Ajuste a largura máxima
  },
  navbar: {
    backgroundColor: '#FF6600',
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNav: {
    fontSize: 25,
    color: '#fefefe',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  enviarMensagem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 80, // Reduzido para dar mais espaço às mensagens
  },
  inputContent: {
    backgroundColor: '#ffffff',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    width: 300,
    marginBottom: 2,
  },
  enviar: {
    width: 50,
    height: 50,
    backgroundColor: '#14b2f7',
    borderRadius: 25,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20, // Ajuste o tamanho do ícone
    height: 20,
  },
  onlineUsersContainer: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
},

onlineTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
},

onlineUser: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
},
});

export default styles;
