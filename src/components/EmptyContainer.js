import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { ProgressBar } from 'react-native-paper'
import AnimatedLottieView from 'lottie-react-native'


const EmptyContainer = () => {
    return (
        <SafeAreaView className="flex-1 items-center justify-center ">
            <View >
                <AnimatedLottieView source={
                    require("../assets/json/loading.json")
                }
                    loop
                    autoPlay
                />
            </View>
        </SafeAreaView>

    )
}

export default EmptyContainer