import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
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
 
});

export default styles;
