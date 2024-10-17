import {
    Pusher,
    PusherEvent,
  } from '@pusher/pusher-websocket-react-native';
  
  const pusher = Pusher.getInstance();
  
    await pusher.init({
      apiKey: "c58eb1455bc63e559d2c",
      cluster: "sa1"
    });
      
    await pusher.connect();
    await pusher.subscribe({
      channelName: "channel", 
      onEvent: (event: PusherEvent) => {
        console.log(`Event received: ${event}`);
      }
    });