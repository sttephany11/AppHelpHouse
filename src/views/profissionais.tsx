import { getPro } from "../functions/getPro";
import React, { useState, useEffect } from "react";
import { Loading } from "../../componentes";
import { TouchableOpacity, View, ScrollView, Text, ImageBackground , TextInput , Image,Platform, Modal ,KeyboardAvoidingView,} from "react-native";
import { CheckBox } from "@ui-kitten/components"; // Importação correta do CheckBox
import { Picker } from "@react-native-picker/picker";
import styles from "../css/profissionaisCss";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Imagens from "../../img/img";
import api from '../../axios';
import myContext from '../functions/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { LogBox } from 'react-native';

interface Profissional {
  bairroContratado: any;
  nomeContratado: string;
  sobrenomeContratado: string;  
  profissaoContratado: string;
  regiaoContratado: string;
  idContratado: string;
  descContratado:string;
  cidadeContratado:string;
  imagemContratado:string;
  portifilioPro1:string;
  portifilioPro2:string;
  portifilioPro3:string
}

interface Props {
  navigation: any;
  route: any;  // Adicionando a rota para receber parâmetros
}

interface Avaliacao {
  idAvaliacao: number;
  ratingAvaliacao: number;
  descavaliacao: string;
  idContratado: string;
  idContratante: string;
  nome: string;
  imagem: string;
}

const List: React.FC<Props> = ({ navigation, route }) => {
  const [data, setData] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
 
  const [isModalVisible, setModalVisible] = useState(false); // Estado do modal
  

  const [token, setToken] = useState<string | null> (null);

   
    // Busca o token armazenado no AsyncStorage
    useEffect(() => {
      const fetchToken = async () => {
        try {
          const savedToken = await AsyncStorage.getItem('authToken');
          if (savedToken) {
            setToken(savedToken);
            console.log('Token obtido do AsyncStorage:', savedToken);
          } else {
            console.log('Nenhum token encontrado no AsyncStorage');
          }
        } catch (error) {
          console.error('Erro ao buscar o token:', error);
        }
      };
      fetchToken();
    }, []);
  
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews',
    ]);
  


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedZones, setSelectedZones] = useState({
    leste: false,
    oeste: false,
    norte: false,
    sul: false,
  });


  const [profissaoSelecionada, setProfissaoSelecionada] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

 //const do select novo
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: 'Encanador', value: 'Encanador' },
      { label: 'Instalador de Papel de Parede', value: 'Instalador de Papel de Parede' },
      { label: 'Jardineiro', value: 'Jardineiro' },
      { label: 'Montador de Móveis', value: 'Montador de Móveis' },
      { label: 'Pedreiro', value: 'Pedreiro' },
      { label: 'Pintor', value: 'Pintor' },
      { label: 'Engenheiro', value: 'Engenheiro' },
      { label: 'Limpeza pós obra', value: 'Limpeza pós obra' },
      { label: 'Remoção de Entulho', value: 'Remoção de Entulho' },
      { label: 'Diarista', value: 'Diarista' },
      { label: 'Mecânico', value: 'Mecânico' },
      { label: 'Marido de aluguel', value: 'Marido de aluguel' },
      { label: 'Costureira', value: 'Costureira' },
      { label: 'Babá', value: 'Babá' },
      { label: 'Personal Organizer', value: 'Personal Organizer' },

    ]);

  useEffect(() => {
    const { profissao } = route.params || {};  // Extrai a profissão enviada 
    if (profissao) {
      setProfissaoSelecionada(profissao);  
    }
  }, [route.params]);


  // Função para atualizar a seleção de zonas
  const toggleZone = (zone: keyof typeof selectedZones) => {
    setSelectedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
  };

  // Função para filtrar os profissionais pela zona, profissão e nome
  const filterProfessionals = (pro: Profissional) => {
    const { regiaoContratado, profissaoContratado, nomeContratado } = pro;

    // Filtro por zona
    const zonesSelected = Object.keys(selectedZones).filter(
      (zone) => selectedZones[zone as keyof typeof selectedZones]
    );
    const zoneMap: Record<string, string> = {
      leste: "Zona Leste",
      oeste: "Zona Oeste",
      norte: "Zona Norte",
      sul: "Zona Sul",
    };
    const matchZone =
      zonesSelected.length === 0 ||
      zonesSelected.some((zone) => regiaoContratado === zoneMap[zone]);

    // Filtro da profissão chamada da homeee
    const matchProfession =
      !profissaoSelecionada || profissaoContratado.toLowerCase().includes(profissaoSelecionada.toLowerCase());

    // Filtro por nome
    const matchName =
      !searchName || nomeContratado.toLowerCase().includes(searchName.toLowerCase());

    // Retorna true se o profissional atender a todos os filtros
    return matchZone && matchProfession && matchName;
  };

  const home = () => {
    navigation.navigate('homeStack'); // Nome correto da tela
  };

  // Chama a API para buscar os profissionais
  useEffect(() => {
    getPro(setData, setLoading, setError);
  }, []);
  

  return (

    <>
      <ImageBackground
        source={Imagens.fundoBemVindo}
        style={styles.background}
        resizeMode="cover"
      >        
        <TouchableOpacity onPress={home}><AntDesign name="leftcircle" size={30} color="#004aad" style={{ marginLeft: 10,top:60 }} /></TouchableOpacity>
        <View style={{justifyContent:'center', alignItems:'center'}}> 
        <Text style={styles.tituloPrincipal}>Encontre aqui um </Text>
        <Text style={styles.tituloPrincipal2}>profissional</Text>
        </View>
        <View style={styles.fundoBranco}>
          {loading && <Loading />}
          {!loading && data?.length ? (
            <>
            <Text style={styles.filtro}>Filtre suas preferências para encontrar </Text>
            <Text style={styles.filtro}>            profissionais perto de você!</Text>

            
            <TouchableOpacity style={styles.button3} onPress={toggleModal}>
                <Text style={styles.buttonText3}>Filtrar</Text>
              </TouchableOpacity>

              <View style={styles.inputFront}></View> 
          <Text style={styles.filtro3}>Profissionais na área de <Text style={styles.area}>{profissaoSelecionada}</Text></Text>
          <View style={{ justifyContent:'center'}}>
          <Text style={styles.click}>Clique na foto do profissional para explorar      seu perfil! </Text>
          </View>
            
             {/* mODALLL DE FILTROOO */}
          
          <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <ScrollView style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', flex:1}}> 
          <View style={styles.modal}>
            <View style={styles.containerTitulo}>
          <Text style={styles.tituloModal}>Escolha suas preferências!</Text>
          </View>
          <Text style={styles.subtitulo}>  Para encontrarmos o profissional perfeito para</Text>
          <Text style={styles.subtitulo}>suas necessidades preencha os campos a seguir!</Text>

            {/* Regiões */}
          <Text style={styles.tituloselect2}>Região:</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.row}>
              <CheckBox
                checked={selectedZones.leste}
                onChange={() => toggleZone("leste")}
              >
                Zona Leste
              </CheckBox>
              <CheckBox
                checked={selectedZones.oeste}
                onChange={() => toggleZone("oeste")}
              >
                Zona Oeste
              </CheckBox>
            </View>
            <View style={styles.row}>
              <CheckBox
                checked={selectedZones.norte}
                onChange={() => toggleZone("norte")}
              >
                Zona Norte
              </CheckBox>
              <CheckBox
                checked={selectedZones.sul}
                onChange={() => toggleZone("sul")}
              >
                Zona Sul
              </CheckBox>
            </View>
          </View>
          

          {/* Profissões */}
          <Text style={styles.tituloselect2}>Categoria:</Text>
          <View style={styles.pickerContainer}>
          <DropDownPicker
          open={open}
          value={profissaoSelecionada} // Sincroniza com o estado profissaoSelecionada
          items={items}
          setOpen={setOpen}
          setValue={(val) => {
            setValue(val); // Atualiza o valor interno do DropDownPicker
            setProfissaoSelecionada(val || ""); // Atualiza a lógica de seleção existente
          }}
          setItems={setItems}
          placeholder="Selecione sua profissão"
          style={styles.dropdown}
          dropDownContainerStyle={[styles.dropdownContainer, { width: 30 }]}
        />
          </View>


            
         
          <View style={{justifyContent:'center', marginTop:10}}>
          <Text style={styles.tituloselectInput}>Se preferir, pesquise pelo nome do seu profissional</Text>
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#A9A9A9"
            value={searchName}
            onChangeText={setSearchName}
            style={styles.input3}
          />
           </View>
      
          <View style={styles.margin3}></View>
        
              <TouchableOpacity style={styles.button2} onPress={toggleModal}>
                <Text style={styles.buttonText2}>Pesquisar</Text>
              </TouchableOpacity>
        </View>
        </ScrollView>
         
       
      </Modal>


    

            <ScrollView>
              {/* Lista de Profissionais Filtrados */}
              {data
                .filter(filterProfessionals)
                .map((data, i) => (
                  
                  <View key={i} style={styles.containerProfissionais}>
                    <View style={styles.containerDados}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('pedidoScreen', {
                            nomeContratado: data.nomeContratado,
                            bairroContratado: data.bairroContratado,
                            idContratado: data.idContratado,
                          })
                        }
                      >
                        <TouchableOpacity  
                         onPress={() => {
                          navigation.navigate('perfilProfissional', {
                            nomeContratado: data.nomeContratado,
                            bairroContratado: data.bairroContratado,
                            idContratado: data.idContratado,
                            profissaoContratado: data.profissaoContratado,
                            descContratado: data.descContratado,
                            sobrenomeContratado: data.sobrenomeContratado,
                            cidadeContratado: data.cidadeContratado,
                            imagemContratado: data.imagemContratado,
                            portifilioPro1: data.portifilioPro1,
                            portifilioPro2: data.portifilioPro2,
                            portifilioPro3: data.portifilioPro3,
                          })
                      
                    }} >
                    
            <Image source={ data.imagemContratado ? { uri: data.imagemContratado } : Imagens.perfilUsuario4 } style={styles.imgPerfilPro}/></TouchableOpacity>
                        <Text style={styles.NomeProfissional}>
                          {data.nomeContratado} {data.sobrenomeContratado}
                        </Text>
                        <Text style={styles.descrPerfil}>
                          {data.profissaoContratado}
                        </Text>


                        <View style={styles.containerRegiao}>
                          <Entypo name="location-pin" size={24} color="red" />
                          <Text style={{top:5}}> {data.regiaoContratado} </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                    
                  </View>
                
                ))}
                <View style={{marginTop:40}}></View>
            </ScrollView>
            </>
          ) : null}
        </View>
      </ImageBackground>
    </>
  );
};

export default List;
