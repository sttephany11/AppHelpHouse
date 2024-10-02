import {getPro} from "../functions/getPro";
import React, {useState, useEffect} from 'react';
import { Loading } from "../../componentes";
import { Card, Text } from '@ui-kitten/components';




const List = ({ navigation })=> {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState (false);
  const [error, setError] = useState (false)

  useEffect(() => {
    getPro(setData, setLoading, setError);
  }, [])
  useEffect(() => {
    console.log(data)
  }, [data]);


  return (
    <>

        
    {loading && <Loading />}
    {!loading && data?.length 
    ? data.map ((data, i )=> (
        <Card style={{marginBottom: 5, width:"85%"}} key={i}>
            <Text>{data.nomeContratado} {data.sobrenomeContratado}</Text>
            <Text></Text>

        </Card>
    ))
    : null}
    </>
  )
  
};


export default List;