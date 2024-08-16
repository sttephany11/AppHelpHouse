import { View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../../src/css/mapCss';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import CustomMarker from './CustomMarker';  // Importando o CustomMarker

function Map() {
    //Aqui é para quando você iniciar o Map, como local prédefinido caso não aceite a localiização
    const initialLocation = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421, 
    };
// Criamos variaveis como, minhaLocalização, regiao, mapa e o pin como marcador
    const [myLocation, setMyLocation] = useState(initialLocation);
    const [pin, setPin] = useState(initialLocation);
    const [region, setRegion] = useState(initialLocation);
    const mapRef = React.useRef();

    useEffect(() => {
        _getLocation();
    }, []);

    const _getLocation = async () => {
        try {
            // Solicitação de permissao para localização
            const { status } = await Location.requestForegroundPermissionsAsync();

            // Caso não seja aceita
            if (status !== 'granted') {
                console.warn('Pode usar sua localização ai namoral ');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            // Atualiza o local para myLocation atual
            setMyLocation(location.coords);
            setRegion({
                ...location.coords,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            // Exibindo a localização no console
            console.log('Localização atual =>', location);
        } catch (err) {
            console.warn(err);
        }
    };

    const focusOnLocation = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                ref={mapRef}
                provider='google'
            >
                {myLocation.latitude && myLocation.longitude &&
                    <CustomMarker
                        coordinate={{
                            latitude: myLocation.latitude,
                            longitude: myLocation.longitude,
                        }}
                        title='My current location'
                        image={require('./clodo.png')}  // Defina o caminho correto para a imagem
                    />
                }

                {pin.latitude && pin.longitude &&
                    <Marker
                        coordinate={{
                            latitude: pin.latitude,
                            longitude: pin.longitude,
                        }}
                        title='Default Location'
                        description='I am here'
                    />
                }
            </MapView>
          
        </View>
    );
}

export default Map;
