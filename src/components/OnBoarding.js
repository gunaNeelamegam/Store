import Onboarding from "react-native-onboarding-swiper";
import { View, TouchableOpacity, SafeAreaView } from 'react-native'
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
        <SafeAreaView className=" flex-1 bg-white">

            <Onboarding

                bottomBarColor="grey"


                bottomBarHighlight={false}


                NextButtonComponent={Next}

                SkipButtonComponent={Skip}

                DoneButtonComponent={Done}



                pages={

                    [{
                        backgroundColor: "#FFF",
                        titleStyles: {
                            fontFamily: "nova",
                            fontSize: 25,
                            fontWeight: "600",
                            color: "#000"
                        },
                        subTitleStyles: {
                            fontFamily: "nova",
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#000"
                        },
                        image: <Lottie
                            source={
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
                        backgroundColor: "#FFF",
                        titleStyles: {
                            fontFamily: "nova",
                            fontSize: 25,
                            fontWeight: "600",
                            color: "#000",
                            padding: 10
                        },
                        subTitleStyles: {
                            fontFamily: "nova",
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#000"
                        },
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
                        backgroundColor: "#FFF",
                        titleStyles: {
                            fontFamily: "nova",
                            fontSize: 25,
                            fontWeight: "600",
                            color: "#000"
                        },
                        subTitleStyles: {
                            fontFamily: "nova",
                            fontSize: 15,
                            fontWeight: "600",
                            color: "#000"
                        },
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
        </SafeAreaView>

    )
}

export default OnBoarding



