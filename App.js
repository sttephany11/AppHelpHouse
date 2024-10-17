import React, { useState } from 'react';
import Index from './src/routes/index';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import myContext from './src/functions/authContext';


export default function App(){

    const [user, setUser]= useState('');
    const [pedido, setPedido]= useState('');

    return ( 
        <myContext.Provider value={{
            user,setUser,
            pedido, setPedido
          
        }}>

        <ApplicationProvider {...eva} theme={eva.light}> 
              <Index />
        </ApplicationProvider>
        </myContext.Provider>


    );

}

