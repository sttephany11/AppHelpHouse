import React, { useState, useContext } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Alert, ScrollView,TextInput ,} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import Imagens from "../../img/img";
import styles from '../css/configuracaoCss';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useUser } from '../cliContext';
import myContext from '../functions/authContext';
import api from '../../axios';

const Configuracao: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { userData } = useUser(); 
  const { user } = useContext(myContext);

  // Estados para os dados do formulário
  const [telefone, setTelefone] = useState(user ? user.telefoneContratante : '');
  const [email, setEmail] = useState(user ? user.emailContratante : '');
  const [cep, setCep] = useState(user ? user.cepContratante : '');

  // Função para atualizar o usuário
  async function update() {
    if (!user) {
      Alert.alert("Erro", "Usuário não encontrado");
      return;
    }

    // Remove caracteres não numéricos dos campos telefone e cep
    const telefoneFormatado = telefone.replace(/\D/g, '');
    const cepFormatado = cep.replace(/\D/g, '');

    try {
      // Chama a API com os dados atualizados
      const response = await api.put(`/cli/${user.idContratante}`, {
        telefoneContratante: telefoneFormatado,
        emailContratante: email,
        cepContratante: cepFormatado
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      } else {
        Alert.alert("Erro", "Houve um problema ao atualizar. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error.response?.data);
      // Exibe mensagens de erro detalhadas
      const errorMsg = error.response?.data?.message || "Erro ao atualizar os dados. Tente novamente.";
      const errorDetails = error.response?.data?.errors ? JSON.stringify(error.response.data.errors) : '';
      Alert.alert("Erro", `${errorMsg}\n${errorDetails}`);
    }
  }

  const perfilNav = () => {
    navigation.navigate('perfil');
  };


  return (
    <ImageBackground 
      source={Imagens.fundoBemVindo}
      style={styles.background}
      resizeMode="cover"
    >
        <View style={{marginTop:70}}>
            <TouchableOpacity>
            <AntDesign name="leftcircle" size={35} color='#004aad' style={{ marginLeft: 24 }} />
          </TouchableOpacity>
        <Text style={styles.Textconfiguracao}> Configurações</Text>
        </View>
      <View style={styles.fundoBranco}>
        <View style={styles.container}>
            <Text style={styles.TextmeuDados}>Meus dados </Text> 

      

              {/* Campo para editar o CEP */}
          <Text style={styles.dados}>CEP</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              value={cep}
              onChangeText={setCep}
              keyboardType="numeric"
              placeholder="Digite o CEP"
            />
            <Entypo name="edit" size={22} color="black" style={{ marginLeft: 10, top: 3 }} />
          </View>

        
            <Text style={styles.dadosCli}> {user.cidadeContratante} {user.bairroContratante}</Text>
            <Text style={styles.dadosCli}> {user.ruaContratante}, {user.numCasaContratante}</Text>

            <View style={{marginTop:15}}></View>
            
            {/* Campo para editar o email */}
          <Text style={styles.dados}>Email</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input2}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Digite o email"
            />
            <Entypo name="edit" size={22} color="black" style={{ marginLeft: 10,}} />
          </View>

            <View style={{marginTop:15}}></View>
            
            {/* Campo para editar o telefone */}
          <Text style={styles.dados}>Telefone</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={styles.input3}
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
              placeholder="Digite o telefone"
            />
            <Entypo name="edit" size={22} color="black" style={{ marginLeft: 10,}} />
          </View>


            <View style={{marginTop:15}}></View>
            
            <Text style={styles.dados}>Senha</Text>   
            <TouchableOpacity><Text style={styles.dadosCli}>Trocar minha senha </Text> </TouchableOpacity>
            
            <View style={{marginTop:15}}></View>

            <Text style={styles.dados}>CPF</Text> 
            <Text style={styles.dadosCli}>{user.cpfContratante}</Text>

            <View style={{marginTop:15}}></View> 

            <Text style={styles.dados}>Métodos de pagamento</Text> 
            <View style={{flexDirection:'row', marginTop:10}}>
            <Ionicons name="card" size={45} color="black"  style={styles.cartao}/>
            <Text style={styles.nomeCartao}> Mastercard </Text>
            </View>
            <Text style={styles.numeroCartao}> 2589.7845.156.25</Text>

            <Text style={styles.adicionar}>+ Adicionar Cartão </Text>

            <TouchableOpacity style={styles.saveButton} onPress={update}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>


        </View>
      </View>
    </ImageBackground>
  );
};

export default Configuracao;