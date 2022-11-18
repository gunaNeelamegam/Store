import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
 const Map = () => {
    return (

        // 12.969994853352182, 80.25783408737075
        <View
            className="flex-1 mt-20 m-4"
        >
            <MapView
                initialRegion={{
                    latitude: 12.969994853352182,
                    longitude: 12.969994853352182,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                className="flex-1 -mt-10 z-50"
                mapType='mutedStandard'
            >
                <Marker coordinate={{
                    latitude: 12.969994853352182,
                    longitude: 12.969994853352182
                }}
                    title=""
                    description=''
                    identifier=''
                    pinColor=''
                />
            </MapView>
        </View>
    )
}

export default Map

/**
 * 
 * 
 * creating the progress bar using in react native application<Progress.Bar
 * indeterminate = true is used for 
 * 
 *  />
 * 
 */