import { PermissionsAndroid, ToastAndroid } from 'react-native'


export const requestPermissionBack = async () => {

    const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERANL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.CAMERA,
    ])

    Object.keys(granted).forEach((permission) => {
        console.log(permission)
        if (granted[permission] == "never_ask_again" || "denied") {
            console.log(granted)
            ToastAndroid.showWithGravity("All Permission are needed",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            )
        }
    })
}



export const requestPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE

        ])

        if (
            granted['PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADVERTISE'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT'] === 'denied' ||
            granted['PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION'] === 'denied' ||
            granted['PermissionAndroid.PERMISSIONS.BLUETOOTH_SCAN'] === "denied"
        ) {
            ToastAndroid.show('We cannot procees without permissions', ToastAndroid.LONG)
        }

    } catch (error) {
        console.error(error)
    }
}




// Object.keys(granted).forEach((permission) => {
        //     console.log(permission)
        //     if (granted[permission] === "denied") {
        //         console.log(granted)
        //         ToastAndroid.showWithGravity("permission for using the bluetooth devices in the Application ",
        //             ToastAndroid.LONG,
        //             ToastAndroid.CENTER
        //         )
        //     }
        // })