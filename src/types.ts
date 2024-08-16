import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Cadastro: undefined;
};

export type CadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Cadastro'
>;
