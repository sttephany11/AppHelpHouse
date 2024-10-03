import api from "../../axios"; // Importa a instância do Axios

export const postPedido = async (setData, setLoading, setError) => {
  setLoading(true);

  try {
    const response = await api.post("/pedido");
    setData(response?.data); // Armazena os dados da resposta
    setLoading(false); // Desativa o loading
  } catch (e) {
    setError(true); // Define o estado de erro
    setLoading(false); // Desativa o loading
  }
};
