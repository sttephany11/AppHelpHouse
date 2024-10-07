import api from "../../axios"

export const getServicos = async (setData, setLoading, setError) =>{
setLoading(true);

try{
    const response = await api.get("/servicos");
    setData(response?.data);
    setLoading(false)
}catch (e){
    setError(true);
    setLoading(false)

}
}