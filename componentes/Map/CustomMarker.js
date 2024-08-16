import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import styles from '../../src/css/CustomMarkCss';

export default function CustomMarker({ coordinate, title, image, description }) {
   // Exibe a localização no console
    console.log('my location', coordinate);
    return (
        //Marcador do mapa
        <Marker coordinate={coordinate}>
            <View style={styles.markerContainer}>
            {/* Foto do clodo e conteudo dentro do marker */}
                <Image source={image} style={styles.markerImage} />
            </View>
            <Callout tooltip>
                <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{title}</Text>
                    <Text style={styles.calloutDescription}>{description}</Text>
                    <Image source={image} style={styles.calloutImage} />
                </View>
            </Callout>
        </Marker>
    );
}
