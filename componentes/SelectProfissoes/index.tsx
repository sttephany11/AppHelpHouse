import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const SelectOption: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // Estado para armazenar a opção selecionada
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para armazenar o termo de busca

  const options = [
    'Montador de Móveis',
    'Piscina',
    'Decorador',
    'Instalador de Papel de Parede',
    'Jardinagem',
    'Redes de Proteção',
    'Banheira',
    'Construção',
    'Arquitetos',
    'Design de Interiores',
    'Empreiteiro',
    'Engenheiro',
    'Limpeza pós obra',
    'Pedreiro',
    'Marmoraria e Granitos',
    'Remoção de Entulho',
    'Poço Artesiano',
    'Encanador',
  ];

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value); // Atualiza a opção selecionada
  };

  const handleSearchChange = (text: string) => {
    setSearchTerm(text); // Atualiza o termo de busca
  };

  return (
    <View style={styles.container}>
      <select value={selectedOption} onChange={handleSelectChange} style={styles.select}>
        <option value="" disabled>
          Selecione uma opção
        </option>
        {filteredOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {selectedOption && (
        <Text style={styles.selectedText}>Você selecionou: {selectedOption}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  
  },
  select: {
    height: 50,
    width: 300,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default SelectOption;
