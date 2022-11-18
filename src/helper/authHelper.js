//AUTHENTICATION HELPER 
import axios from "axios"
import { ToastAndroid } from "react-native"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { BACK_END_API } from "../../Backend"



export const signUp = () => {

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
    
        setIsSuccess(responseJson.success)
        setMessage(responseJson.message)
    
    
    
        dispatch({
          type: IS_AUTHENTICATED,
          payload: true
        })
    
        dispatch({
          type: "SET_USER",
          payload: responseJson.user
        })
        navigation.navigate("Tab")
      }

}


const signIn = (data) => {
    axios({ method: 'POST', url: `${BACK_END_API}/login`, data: data }).then(response => {
        if (response.data?.success) {
            dispatch({
                type: IS_AUTHENTICATED,
                payload: true
            })
            dispatch({
                type: SET_USER,
                payload: response.data
            })
            setIsLoading(false)
        }
    }).catch(error => {
        setIsLoading(false)
        console.error(error.response.data)
        dispatch(
            {
                type: IS_AUTHENTICATED,
                payload: false
            }
        )
    })
}




export const openCamera = (mediaType = "photo", cameraType = "back") => {

    launchCamera({
        mediaType: mediaType,
        presentationStyle: "pageSheet",
        quality: 1,
        saveToPhotos: true,
        cameraType: cameraType
    }).then(response => {
        if (response.didCancel || response.errorCode || response.errorMessage)
            ToastAndroid.showWithGravity(response.errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM)
        return response
    }).catch(error => {
        console.log("camera reject")
    })

}


const signOut = async (token) => {
    const response = await fetch(`${BACK_END_API}/signout`, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    const responseJson = response.json()
    return responseJson

}