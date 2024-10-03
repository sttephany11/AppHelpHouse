import { getPro } from "../../src/functions/getPro";
import React, { useState, useEffect } from "react";
import { Loading } from "../../componentes";
import { CheckBox } from "@ui-kitten/components";
import { TouchableOpacity, View, ScrollView, Text } from "react-native";
import styles from "../../src/css/profissionaisCss";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

const List = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Estado para a seleção de zonas
  const [selectedZones, setSelectedZones] = useState({
    leste: false,
    oeste: false,
    norte: false,
    sul: false,
  });

  // Estado para as profissões selecionadas
  const [selectedProfessions, setSelectedProfessions] = useState({
    encanador: false,
    monstro: false,
    professor: false,
    // Adicione mais profissões conforme necessário
  });

  // Função para atualizar a seleção de zonas
  const toggleZone = (zone) => {
    setSelectedZones((prev) => ({
      ...prev,
      [zone]: !prev[zone],
    }));
  };

  // Função para atualizar a seleção de profissões
  const toggleProfession = (profession) => {
    setSelectedProfessions((prev) => ({
      ...prev,
      [profession]: !prev[profession],
    }));
  };

  // Função para filtrar os profissionais pela zona e profissão
  const filterProfessionals = (pro) => {
    const { regiaoContratado, descContratado } = pro;

    // Filtro por zona
    const zonesSelected = Object.keys(selectedZones).filter(
      (zone) => selectedZones[zone]
    );
    const zoneMap = {
      leste: "Zona Leste",
      oeste: "Zona Oeste",
      norte: "Zona Norte",
      sul: "Zona Sul",
    };
    const matchZone = zonesSelected.length === 0 || zonesSelected.some(zone => regiaoContratado === zoneMap[zone]);

    // Filtro por profissão
    const selectedProfessionKeys = Object.keys(selectedProfessions).filter(
      (profession) => selectedProfessions[profession]
    );
    const matchProfession = selectedProfessionKeys.length === 0 || selectedProfessionKeys.some(profession => descContratado.toLowerCase().includes(profession.toLowerCase()));

    // Retorna true se o profissional atender a ambos os filtros
    return matchZone && matchProfession;
  };

  // Chama a API para buscar os profissionais
  useEffect(() => {
    getPro(setData, setLoading, setError);
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && data?.length ? (
        <ScrollView>
          {/* Filtros de Zona */}
          <View style={styles.checkboxContainer}>
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

          {/* Filtro de Profissão - Checkboxes */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={selectedProfessions.engenheiro}
              onChange={() => toggleProfession("engenheiro")}
            >
              engenheiro
            </CheckBox>
            <CheckBox
              checked={selectedProfessions.monstro}
              onChange={() => toggleProfession("monstro")}
            >
              monstro
            </CheckBox>
            <CheckBox
              checked={selectedProfessions.encanador}
              onChange={() => toggleProfession("encanador")}
            >
              Encanador
            </CheckBox>
            {/* Adicione mais Checkboxes conforme necessário */}
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
    </>
  );
};

export default List;
