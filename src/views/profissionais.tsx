import { getPro } from "../functions/getPro";
import React, { useState, useEffect } from "react";
import { Loading } from "../../componentes";
import { TouchableOpacity, View, ScrollView, Text, ImageBackground , TextInput , Image,ActivityIndicator,  } from "react-native";
import { CheckBox } from "@ui-kitten/components"; // Importação correta do CheckBox
import { Picker } from "@react-native-picker/picker"; // Picker para substituir os checkboxes das profissões
import styles from "../css/profissionaisCss";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Imagens from "../../img/img";
import api from '../../axios';
import myContext from '../functions/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Profissional {
  bairroContratado: any;
  nomeContratado: string;
  sobrenomeContratado: string;  
  profissaoContratado: string;
  regiaoContratado: string;
  idContratado: string;
  descContratado:string;
  cidadeContratado:string;
}

interface Props {
  navigation: any;
}



const List: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  //const [data1, setData1] = useState<Profissionais[]>([]);

  // Estado para a seleção de zonas
  const [selectedZones, setSelectedZones] = useState({
    leste: false,
    oeste: false,
    norte: false,
    sul: false,
  });

  // Estado para a profissão selecionada (apenas uma no Picker)
  const [selectedProfession, setSelectedProfession] = useState<string>("");

  // Estado para o nome do profissional
  const [searchName, setSearchName] = useState<string>("");

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

    // Filtro por profissão
    const matchProfession =
      !selectedProfession || profissaoContratado.toLowerCase().includes(selectedProfession.toLowerCase());

    // Filtro por nome
    const matchName =
      !searchName || nomeContratado.toLowerCase().includes(searchName.toLowerCase());

    // Retorna true se o profissional atender a todos os filtros
    return matchZone && matchProfession && matchName;
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
        <View style={styles.fundoBranco}>

          {loading && <Loading />}
          {!loading && data?.length ? (
            <ScrollView>
              <Text style={styles.filtro}>Filtre por suas preferências</Text>
              <AntDesign name="menufold" size={24} color="#ff914d" style={styles.searchIcon2} />

              <Text style={styles.tituloselect}>Busque por um profissional:</Text>
              <TextInput
                placeholder="Digite o nome do profissional..."
                value={searchName}
                onChangeText={value => setSearchName(value)}
                style={styles.input3}
              />
              
              <Text style={styles.tituloselect}>Escolha a região:</Text>
              <View style={styles.marginCheck}></View>
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
                <View style={styles.marginCheck}></View>
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
              

             
              <Text style={styles.tituloselect}>Selecione uma profissão:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedProfession}
                  onValueChange={(itemValue) => setSelectedProfession(itemValue)}
                  style={{ height: 50, width: 320, borderColor: '#ff914d', bottom: 20,  }}
                >
                  <Picker.Item label="Selecione" value="" />
                  <Picker.Item label="Encanador" value="encanador" />
                  <Picker.Item label="Instalador de Papel de Parede" value="Instalador de Papel de Parede" />
                  <Picker.Item label="Jardineiro" value="Jardineiro" />
                  <Picker.Item label="Montador de Móveis" value="Montador de Móveis" />
                  <Picker.Item label="Construtor" value="Construtor" />
                  <Picker.Item label="Engenheiro" value="Engenheiro" />
                  <Picker.Item label="Limpeza pós obra" value="Limpeza pós obra" />
                  <Picker.Item label="Pedreiro" value="Pedreiro" />
                  <Picker.Item label="Remoção de Entulho" value="Remoção de Entulho" />
                  <Picker.Item label="Diarista" value="Diarista" />
                  <Picker.Item label="Mecânico" value="Mecânico" />
                  <Picker.Item label="Eletricista" value="Eletricista" />
                </Picker>
              </View>

              <View style={styles.marginInput}></View>


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
                          })
                      
                    }} >
            <Image source={Imagens.perfilUsuario4} style={styles.imgPerfilPro}/></TouchableOpacity>
                        <Text style={styles.NomeProfissional}>
                          {data.nomeContratado} {data.sobrenomeContratado}
                        </Text>
                        <Text style={styles.descrPerfil}>
                          {data.profissaoContratado}
                        </Text>

                        <View style={styles.containerAvaliacao}>
                          <AntDesign name="staro" size={18} color="black" />
                          <AntDesign name="staro" size={18} color="black" />
                          <AntDesign name="staro" size={18} color="black" />
                          <AntDesign name="staro" size={18} color="black" />
                          <AntDesign name="staro" size={18} color="black" />
                          <Text style={styles.textOpinioes}>150 avaliações</Text>
                        </View>

                        <View style={styles.containerRegiao}>
                          <Entypo name="location-pin" size={24} color="red" />
                          <Text> {data.regiaoContratado} </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
            </ScrollView>
          ) : null}
        </View>
      </ImageBackground>
    </>
  );
};

export default List;
