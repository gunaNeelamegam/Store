import Onboarding from "react-native-onboarding-swiper";
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Lottie from "lottie-react-native"
import { FontAwesome5, FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons"
const OnBoarding = ({ navigation }) => {

    const Skip = () => (

        <View style={{ padding: 20 }}  >
            <TouchableOpacity style={{ height: 45, width: 45 }} onPress={() => navigation.navigate("SignIn")} >
                <FontAwesome name="remove" size={30} color="#CAD5E2" />
            </TouchableOpacity>
        </View>
    )


    const Next = (props) => (
        <View style={{ padding: 20 }} >
            <TouchableOpacity style={{ height: 45, width: 45 }} {...props} >
                <MaterialIcons name="navigate-next" size={30} color="#CAD5E2" />
            </TouchableOpacity>
        </View>
    )




    const Done = () => (
        <View style={{ padding: 20 }}>
            <TouchableOpacity style={{ height: 45, width: 45 }} onPress={() => (navigation.navigate("SignIn"))}>
                <Ionicons name="ios-checkmark-done-circle-sharp" size={30} color="#CAD5E2" />
            </TouchableOpacity>
        </View>
    )










    return (
        <Onboarding




            onDone={() => navigation.push("SignIn")}
            onSkip={() => navigation.push("SignIn")}



            bottomBarHighlight={false}


            NextButtonComponent={Next}

            SkipButtonComponent={Skip}

            DoneButtonComponent={Done}



            pages={
                [{
                    titleStyles: {
                        fontFamily: "nova",
                        fontSize: 25,
                        fontWeight: "600",
                        color: "#FFF"
                    },
                    subTitleStyles: {
                        fontFamily: "nova",
                        fontSize: 25,
                        fontWeight: "600",
                        color: "#FFF"
                    },
                    backgroundColor: '#242B2E',
                    image: <Lottie source={
                        require("../assets/json/38608-fashionable-girl-in-red-dress.json")
                    }
                        style={{
                            width: 400,
                            height: 400,
                        }}
                        autoPlay
                        loop
                    />,
                    title: "Fashion House",
                    subtitle: "wordering women 's",
                }, {
                    titleStyles: {
                        fontFamily: "nova",
                        fontSize: 25,
                        fontWeight: "600",
                        color: "#FFF",
                        padding: 10
                    },
                    subTitleStyles: {},
                    backgroundColor: '#242B2E',
                    image: <Lottie source={
                        require("../assets/json/onlinePayment.json")
                    }
                        style={{
                            width: 400,
                            height: 400,
                        }}
                        autoPlay
                        loop
                    />,
                    title: "Ecom store",
                    subtitle: "wordering women 's",
                },
                {
                    titleStyles: {
                        fontFamily: "nova",
                        fontSize: 25,
                        fontWeight: "600",
                        color: "#FFF"
                    },
                    subTitleStyles: {},
                    backgroundColor: '#242B2E',
                    image: <Lottie source={
                        require("../assets/json/delivery.json")
                    }
                        style={{
                            width: 400,
                            height: 400,
                        }}
                        autoPlay
                        loop
                    />,
                    title: 'Ecom Store',
                    subtitle: "build by Guna",
                },

                ]}


        />

    )
}

export default OnBoarding





// <Lottie
//                         style={{
//                           flex:1,
//                           alignSelf: "stretch"
//                         }}
//                         source={require("../assets/json/delivery.json")} autoPlay loop />