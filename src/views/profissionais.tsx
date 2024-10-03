import { getPro } from "../functions/getPro";
import React, { useState, useEffect } from "react";
import { Loading } from "../../componentes";
import { TouchableOpacity, View, ScrollView, Text, ImageBackground } from "react-native";
import { CheckBox } from "@ui-kitten/components"; // Importação correta do CheckBox
import { Picker } from "@react-native-picker/picker"; // Picker para substituir os checkboxes das profissões
import styles from "../css/profissionaisCss";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Imagens from "../../img/img";

// Tipagem dos dados do profissional
interface Professional {
  nomeContratado: string;
  sobrenomeContratado: string;
  descContratado: string;
  regiaoContratado: string;
}

interface Props {
  navigation: any;
}

const List: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Estado para a seleção de zonas
  const [selectedZones, setSelectedZones] = useState({
    leste: false,
    oeste: false,
    norte: false,
    sul: false,
  });

  // Estado para a profissão selecionada (apenas uma no Picker)
  const [selectedProfession, setSelectedProfession] = useState<string>("");

  // Função para atualizar a seleção de zonas
  const toggleZone = (zone: keyof typeof selectedZones) => {
    setSelectedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
  };

  // Função para filtrar os profissionais pela zona e profissão
  const filterProfessionals = (pro: Professional) => {
    const { regiaoContratado, descContratado } = pro;

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
      !selectedProfession || descContratado.toLowerCase().includes(selectedProfession.toLowerCase());

    // Retorna true se o profissional atender a ambos os filtros
    return matchZone && matchProfession;
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
              {/* Filtros de Zona */}
              <Text style={styles.filtro}>Filtre por suas preferências</Text>
              <AntDesign name="menufold" size={24} color="#ff914d" style={styles.searchIcon2} />

              <Text style={styles.tituloselect}>Escolha a região:</Text>
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


              <View style={styles.marginInput}></View>
              {/* Filtro de Profissão - Picker */}
              <Text style={styles.tituloselect}>Selecione a profissão:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedProfession}
                  onValueChange={(itemValue) => setSelectedProfession(itemValue)}
                  style={{ height: 50, width: 320, borderColor:'#ff914d' }}
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

                  {/* Adicione mais profissões conforme necessário */}
                </Picker>
              </View>

              {/* Lista de Profissionais Filtrados */}
              {data
                .filter(filterProfessionals)
                .map((data, i) => (
                  <View key={i} style={styles.containerProfissionais}>
                    <View style={styles.containerDados}>
                      <TouchableOpacity>
                        <Text style={styles.NomeProfissional}>
                          {data.nomeContratado} {data.sobrenomeContratado}
                        </Text>
                        <Text style={styles.descrPerfil}>
                          {data.descContratado}
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
