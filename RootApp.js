import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { Provider as PaperProvider } from 'react-native-paper';
import App from './src/App';
import { Provider } from "react-redux"
import store from "./src/store"
const loadAllFonts = () => {
    const [fontloaded] = useFonts({
        "nova": require("./src/assets/fonts/nova.otf"),
        "just": require("./src/assets/fonts/just.otf"),
        "blossom": require("./src/assets/fonts/blossom.otf"),

    })
}


const RootApp = () => {

    try {
        loadAllFonts()
    } catch (error) {

    }

    return (
        <Provider store={store}>
            <NavigationContainer>
                <PaperProvider>
                    <App />
                </PaperProvider>
            </NavigationContainer>
        </Provider>
    )
}

export default RootApp