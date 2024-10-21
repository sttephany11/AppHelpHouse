import React, { useState, useEffect, useRef } from 'react';
import Index from './src/routes/index';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import myContext from './src/functions/authContext';
import Pusher from 'pusher-js';

export default function App() {
  const [user, setUser] = useState('');
  const [pedido, setPedido] = useState('');
  const pusherRef = useRef<Pusher | null>(null); // Ref agora com tipo correto

  useEffect(() => {
    try {
      const pusher = new Pusher('c58eb1455bc63e559d2c', {
        cluster: 'sa1',
        encrypted: true,
      });

      pusherRef.current = pusher; // Armazena a instância do Pusher em `pusherRef`

      const channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function (data) {
        console.log('Evento recebido:', data);
      });

      console.log('Pusher inicializado e inscrito no canal');
    } catch (error) {
      console.error('Erro ao inicializar o Pusher:', error); // Log de erro para debugging
    }

    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect(); // Certifica-se de desconectar o Pusher
        console.log('Pusher desconectado');
      }
    };
  }, []);

  return (
    <myContext.Provider value={{ user, setUser, pedido, setPedido }}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Index />
      </ApplicationProvider>
    </myContext.Provider>
  );
}
