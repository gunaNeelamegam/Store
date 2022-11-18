import { View, Text, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IS_AUTHENTICATED, SET_TOKEN, SET_USER } from "../actions/action.type"
import { BACK_END_API } from '../../Backend';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage"



const SignUp = () => {
  const [isSuccess, setIsSuccess] = useState()
  const [message, setMessage] = useState()
  const [error, setError] = useState(false)

  const navigation = useNavigation()
  const dispatch = useDispatch()






  const handleSignUp = async () => {
    const formdata = new FormData()
    const response = await launchImageLibrary({
      maxWidth: 200,
      maxHeight: 200,
      selectionLimit: 1,
      mediaType: "photo",
      presentationStyle: "popover",
      quality: 1,
      includeBase64: false
    })

    console.log("Res = ", response)
    formdata.append("name", "Guna")
    formdata.append("email", "gunag5127@gmail.com")
    formdata.append("password", "12345678")
    formdata.append("photo", {
      uri: response.assets[0].uri,
      type: response.assets[0].type,
      name: response.assets[0].fileName
    })
    let res = await fetch(`${BACK_END_API}/signup`, {
      method: "post",
      body: formdata,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    let responseJson = await res.json()

    if (!responseJson.success) {
      setIsSuccess(responseJson.success)
      setMessage(responseJson.message)
      setError(true)
      return
    }
    setIsSuccess(responseJson.success)
    setMessage(responseJson.message)

    dispatch({
      type: IS_AUTHENTICATED,
      payload: true
    })

    dispatch({
      type: SET_USER,
      payload: responseJson.user,
    })
    dispatch({
      type: SET_TOKEN,
      payload: responseJson.token
    })

    await AsyncStorage.setItem("token", JSON.stringify(responseJson.token))
    await AsyncStorage.setItem("user", JSON.stringify(responseJson.user))

    navigation.navigate("Home")
  }


  return (

    <>
      <Text>
        {error && (
          <View className="bg-white m-5 p-4">

            <Text
              className="text-justify font-light"
              style={{
                color: (isSuccess) ? "#3DBE29" : "#B4161B"
              }}>
              {message}
            </Text>

            <Text
              className="text-justify font-light"
              style={{
                color: (isSuccess) ? "#3DBE29" : "#B4161B"
              }}>
              {isSuccess ? `success` : `failed`}
            </Text>
          </View>
        )}
      </Text>
    </>)
}

export default SignUp



/**
 *   axios({
        method: 'POST', url: `${BACK_END_API}/signup`,
        data: JSON.stringify({
          name: "Guna1",
          password: "12345678",
          email: "guna@lco.dev",
          file: {
            photo: image.uri
          },
        }),
        headers:{
          "Content-Type":""
        }
      }).then(response => {
        if (response.data?.success) {
          console.log(response.data)
        }
      }).catch(error => {
        console.error(error.response.body)
      })
 */