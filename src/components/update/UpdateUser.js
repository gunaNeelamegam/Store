import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { editSingleUserById, getSingleUserById } from "../../helper/UserHelper"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Animatable from "react-native-animatable"
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { useEffect } from 'react'
import { IS_AUTHENTICATED, SET_TOKEN, SET_USER } from '../../actions/action.type'
import { launchImageLibrary, launchCamera } from "react-native-image-picker"
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'


//IMPORTANT HOW TO BRING THE ID FROM THE CLICKING THE PRODUCT OR ANYTHING



const UpdateUser = ({ route }) => {


    const dispatch = useDispatch()
    const naviagtion = useNavigation()

    const [name, setName] = useState("")
    const [photo, setPhoto] = useState({})
    const [email, setEmail] = useState("")
    const [click, setIsClicked] = useState("")
    const [message, setMessage] = useState("")
    const [role, setRole] = useState("")
    const [id, setUserId] = useState()
    const [token, setUserToken] = useState()

    useEffect(() => {
        (async () => {

            const userToken = await AsyncStorage.getItem("token")
            setUserToken(JSON.parse(userToken))
            const { id } = route?.params
            setUserId(id)
            const userDetails = await getSingleUserById(token, id)
            const { user } = userDetails
            setName(user.name)
            setEmail(user.email)
            setPhoto(user.photo)
            setRole(user.role)
        })()
    }, [])






    const openWithFileManager = async () => {



        let response = await launchImageLibrary({
            mediaType: 'photo',
            quality: 1,
            presentationStyle: 'overCurrentContext',
            includeBase64: false,
            cameraType: "back",
            saveToPhotos: true,
            selectionLimit: 1
        })
        if (response.didCancel || response.errorCode || response.errorMessage) {
            return ToastAndroid.showWithGravity(response.errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }


        const { assets } = response

        //PUSHING THE IMAGE 

        let { uri, fileName, type } = assets[0]
        let photo = { uri, type, fileName }
        setPhoto(photo)
        return photo
    }



    /*
    formdata.append("photo", {
                ...photo
            })*/

    const updateUser = async () => {
        const formdata = new FormData()
        formdata.append("name", name)
        formdata.append("email", email)
        formdata.append("role", role)


        let responseJson = await editSingleUserById(token, id, formdata)
        console.log({ ...responseJson });
        if (!responseJson.success) {
            setMessage("user updated failed")
            setIsClicked(false)
            return
        } else {
            setMessage("updated successfully")
            const newDetails = await getSingleUserById(token, id)
            console.log(newDetails)
            await AsyncStorage.setItem("token", JSON.stringify(newDetails.token))
            await AsyncStorage.setItem("user", JSON.stringify(newDetails.user))
            console.log(await AsyncStorage.getItem("user"));
            dispatch({
                type: IS_AUTHENTICATED,
                payload: true
            })

            dispatch({
                type: SET_USER,
                payload: newDetails.user
            })

            dispatch({
                type: SET_TOKEN,
                payload: newDetails.token
            })
            setIsClicked(false)
            naviagtion.navigate("AllUsers")
        }




    }



    return (
        <SafeAreaView className="bg-white flex-1 p-5">
            <View className="items-center mt-3 px-4  mb-4">
                <Text className="font-bold text-2xl " > Update User {` \n ${message} `} </Text>
            </View>

            {click && (
                <ActivityIndicator
                    color={`rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`} size={40}
                />
            )}
            <KeyboardAvoidingView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        padding: 10,
                    }}
                >
                    <View className="justify-start mx-auto flex-1 flex-grow  " >

                        <Animatable.Image
                            animation="fadeInUpBig"
                            iterationCount={1}
                            iterationDelay={1000}
                            source={{
                                uri: photo?.secure_url
                            }}
                            className="h-60 w-80 rounded-xl"
                        />

                    </View>





                    <View className="mt-10  flex-1 space-x-2 space-y-2" >
                        <Animatable.View
                            animation="zoomIn"
                            iterationDelay={1000}
                            iterationCount={1}
                            className="flex-1 mt-50 ">
                            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3  ">
                                <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3  rounded-lg">
                                    <Entypo name="chevron-small-down" size={24} color="#000" />
                                    <TextInput placeholder=' Name'
                                        value={name}
                                        onChangeText={(text) => setName(text)}
                                        style={{
                                            fontFamily: "nova",
                                            fontSize: 16
                                        }}
                                        autoComplete="name"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3  ">
                                <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3  rounded-lg">
                                    <Entypo name="chevron-small-down" size={24} color="#000" />
                                    <TextInput placeholder='Role'
                                        value={role}
                                        onChangeText={(text) => setRole(text)}
                                        style={{
                                            fontFamily: "nova",
                                            fontSize: 16
                                        }}
                                        autoComplete="name"
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3 ">
                                <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 rounded-lg">
                                    <Entypo name="chevron-small-down" size={24} color="#000" />
                                    <TextInput
                                        value={email}
                                        onChangeText={(email) => setEmail(email)}

                                        placeholder='email' style={{
                                            fontFamily: "nova",
                                            fontSize: 16
                                        }}
                                    />
                                </View>
                            </View>
                            <View className="flex-row items-center  mx-4 pb-2 mb-3">
                                <View className="flex-row  space-x-5 bg-purple-300 rounded-t-full ">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setIsClicked(data => !data)
                                            if (click)
                                                updateUser()

                                        }}
                                        className="m-1  items-center flex-1 justify-center  flex-row space-x-2 ">
                                        <MaterialIcons name="update" size={30} color="black" />
                                        <Text className="font-semibold text-lg">update</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animatable.View >
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default UpdateUser