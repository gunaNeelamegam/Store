import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"
import { useNavigation } from '@react-navigation/native';
import { BACK_END_API } from '../../Backend';
import { useDispatch } from 'react-redux';
import { IS_AUTHENTICATED, SET_TOKEN, SET_USER } from '../actions/action.type';
import EmptyContainer from "../components/EmptyContainer"
import AsyncStorage from "@react-native-async-storage/async-storage"
const SignIn = () => {

  const [success, setSuccess] = useState()
  const [message, setMessage] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const doSignIn = async () => {

    const formdata = new FormData()
    formdata.append("email", email)
    formdata.append("password", password)

    setIsLoading(true)
    let res = await fetch(`${BACK_END_API}/login`, {
      method: "post",
      body: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })

    console.log("ENTERD")
    let responseJson = await res.json()
    setSuccess(responseJson.success)
    setMessage(responseJson.message)
    console.log(responseJson)
    setIsLoading(false)
    if (!responseJson.success) {
      dispatch(
        {
          type: IS_AUTHENTICATED,
          payload: false
        }
      )
      return null
    }
    dispatch({
      type: IS_AUTHENTICATED,
      payload: true
    })

    dispatch({
      type: SET_USER,
      payload: responseJson.user
    })

    dispatch({
      type: SET_TOKEN,
      payload: responseJson.token
    })

    await AsyncStorage.setItem("token", JSON.stringify(responseJson.token))
    await AsyncStorage.setItem("user", JSON.stringify(responseJson.user))

    setIsLoading(false)
    setEmail("")
    setPassword("")
    navigation.navigate("Home")
  }













  return (

    <SafeAreaView className='bg-white flex-1 '>
      {isLoading && (
        <EmptyContainer />
      )}
      <View className="mt-5 item-center m-5  " >
        <View >
          <TouchableOpacity className="p-2" onPress={() => navigation.navigate("OnBoarding")} >
            <Feather name="arrow-left" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View className=" flex-1 justify-center items-center  ">

        < Animatable.Image
          animation="fadeInUpBig"
          iterationCount={1}
          source={
            require("../assets/images/model.jpg")
          }
          className="h-40 w-40 m-1 rounded-full "
        />
      </View>


      <Animatable.View className="flex-1 mt-50 ">
        <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3 ">
          <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 ">
            <MaterialCommunityIcons name="email-open-outline" size={24} color="#000" />
            <TextInput placeholder='Email'
              onChangeText={(text) => setEmail(text)}
              style={{
                fontFamily: "nova",
                fontSize: 16
              }}
              autoComplete="email"
            />
          </View>
        </View>
        <View className="flex-row items-center space-x-2 mx-4 pb-2 ">
          <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 ">
            <FontAwesome5 name="user" size={24} color="#000" />
            <TextInput
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder='Password' style={{
                fontFamily: "nova",
                fontSize: 16
              }}
              autoComplete="password"
            />
          </View>
        </View>
        {success && (
          <View className="font-thin text-sm  h-3 flex-grow flex-1  flex-row  space-x-5">
            <Text  >{message}</Text>
            <Text  >{success}</Text>
          </View>
        )}

        <View className="flex-1 items-center ">
          <TouchableOpacity className="m-10 b-10" onPress={doSignIn}>
            <Text className="text-center font-bold bg-transparent bg-gray-300  p-4 rounded-full " style={{
              color: "#000"
            }}>SignIp</Text>
          </TouchableOpacity>
        </View>

      </Animatable.View>
















    </SafeAreaView >
  )
}


export default SignIn