import { View, Text, ScrollView, SafeAreaView, Image, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Animatable from "react-native-animatable"
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { Dialog } from "react-native-paper"
import { addProduct } from "../../helper/ProductHelper"
import { connect } from "react-redux"
import propTypes from "prop-types"
// ["shortsleeves", "longsleeves", "sweatshirt", "hoodies"],

const CreateProduct = ({ authState }) => {


  const [photos, setPhotos] = useState([])
  const [visible, setVisible] = React.useState(true);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [isTouched, setIsTouched] = useState(false)
  const [response, setResponse] = useState()
  const [click, isClicked] = useState(false)
  //MAINTAIN THE FORMDATA IS REFERESH OR NOT


  const openWithCamera = async () => {

    let userpickedImage = []

    let response = await launchCamera({
      mediaType: 'photo',
      quality: 1,
      presentationStyle: 'overCurrentContext',
      includeBase64: false,
      cameraType: "back",
      saveToPhotos: true
    })
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return ToastAndroid.showWithGravity(response.errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }


    const { assets } = response

    //PUSHING THE IMAGE 

    assets.forEach((image) => {
      let { uri, fileName, type } = image
      userpickedImage.push({
        uri,
        name: fileName,
        type
      })
    })

    return userpickedImage
  }
  const openWithFileManager = async () => {

    let userpickedImage = []

    let response = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      presentationStyle: 'overCurrentContext',
      includeBase64: false,
      cameraType: "back",
      saveToPhotos: true,
      selectionLimit: 6
    })
    if (response.didCancel || response.errorCode || response.errorMessage) {
      return ToastAndroid.showWithGravity(response.errorMessage, ToastAndroid.LONG, ToastAndroid.BOTTOM)
    }


    const { assets } = response

    //PUSHING THE IMAGE 

    assets.forEach((image) => {
      let { uri, fileName, type } = image
      userpickedImage.push({
        uri,
        name: fileName,
        type
      })
    })
    setPhotos(userpickedImage)
    return userpickedImage

  }

  const openDialogforImagePickeing = () => {
    const hideDialog = () => setVisible(false);
    return (
      <View className="flex-1">
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>pick the Image for the Product with good quality</Dialog.Content>
          <Dialog.Content>
            <Text>If you want to pick the image from the file manager mean's ?</Text>
            <Text>click the current camera picture</Text>
            <Text>click the  pre-cooked picture to File Manager</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableOpacity onPress={openWithFileManager}>
              <Text>File Manager</Text></TouchableOpacity>
            <TouchableOpacity onPress={openWithCamera}>
              <Text>Camera</Text></TouchableOpacity>
          </Dialog.Actions>
        </Dialog>
      </View>

    )

  }


  const doSomething = async () => {


    const fields = ["name", "price", "description", "photos", "category", "stock", "brand"]
    const data = [name, price, description, photos, category, stock, brand]
    const formdata = new FormData()

    fields.forEach((field, index) => {
      if (field === "price")
        formdata.append(field, Number(data[index]))
      if (Array.isArray(data[index])) {
        formdata.append(field, JSON.stringify(data[index]))
      }
      formdata.append(field, data[index])
    })
    console.log("FORM ", { ...formdata })
    setResponse(await addProduct(authState.token, formdata))
  }


  return (
    <SafeAreaView className="bg-white flex-1 p-5">
      <View className="items-center mt-3 px-4  mb-4">
        <Text className="font-bold text-2xl " > Add Product {response?.message}</Text>
      </View>
      {click && (
        <ActivityIndicator
          color={`rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`} size={40}
        />
      )}


      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: 10,
        }}
      >
        {(photos.length == 0) && (
          <ScrollView
            contentContainerStyle={{
              marginTop: 5,
              paddingHorizontal: 10,
              paddingRight: 3
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {photos.map(image => (
              <View className="justify-start mx-auto flex-1 flex-grow  " >
                <Animatable.Image
                  animation="fadeInUpBig"
                  iterationCount={1}
                  iterationDelay={1000}
                  source={{
                    uri: image?.uri
                  }}
                  className="h-60 w-80 rounded-xl"
                />
              </View>
            ))}


          </ScrollView>)}

        <View className="mt-10  flex-1 space-x-2 space-y-2" >
          <Animatable.View
            animation="zoomIn"
            iterationDelay={1000}
            iterationCount={1}

            className="flex-1 mt-50 ">
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3  ">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3  rounded-lg">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput placeholder='Product Name'
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
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3 ">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 rounded-lg">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  placeholder='Price' style={{
                    fontFamily: "nova",
                    fontSize: 16
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 rounded-lg ">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput
                  value={stock}
                  onChangeText={(text) => setStock(text)}
                  secureTextEntry={true}
                  placeholder='Stock' style={{
                    fontFamily: "nova",
                    fontSize: 16
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 rounded-lg ">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput
                  value={brand}
                  onChangeText={(text) => setBrand(text)}
                  secureTextEntry={true}
                  placeholder='Brand' style={{
                    fontFamily: "nova",
                    fontSize: 16
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3  rounded-lg">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput
                  value={description}
                  onFocus={() => setIsTouched(filled => !filled)}
                  placeholder="description "
                  onChangeText={(text) => setDescription(text)}
                  multiline={true}
                  numberOfLines={10}
                  style={{ paddingHorizontal: 10, paddingVertical: 10, fontFamily: "JustSquash", fontSize: 15, height: isTouched ? 200 : 50, marginRight: -25, textAlignVertical: 'top', width: "70%", borderColor: "#6A2B4E" }} />
              </View>
            </View>
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3 ">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3  rounded-lg">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput
                  onChangeText={(text) => setCategory(text)}
                  secureTextEntry={true}
                  value={category}
                  placeholder='Product Category' style={{
                    fontFamily: "nova",
                    fontSize: 16
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3">
              <View className="flex-row  space-x-5 flex-1 bg-gray-200 p-3 rounded-lg">
                <Entypo name="chevron-small-down" size={24} color="#000" />
                <TextInput
                  value={price}
                  onChangeText={(text) => setPrice(text)}
                  secureTextEntry={true}
                  placeholder='Price' style={{
                    fontFamily: "nova",
                    fontSize: 16
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center space-x-2 mx-4 pb-2 mb-3">
              <View className="flex-row  space-x-5  ">
                <TouchableOpacity onPress={openWithFileManager} className="flex-row space-x-5 flex-1 bg-gray-200 p-3">
                  <Entypo name="chevron-small-down" size={24} color="#000" />
                  <Text
                    className="text-gray-400 ">pick the product image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center  mx-4 pb-2 mb-3">
              <View className="flex-row  space-x-5 bg-purple-300 rounded-t-full ">
                <TouchableOpacity
                  onPress={() => {
                    doSomething()
                    isClicked(data => !data)
                  }}
                  className="m-1  items-center flex-1 justify-center  flex-row space-x-2 ">
                  <Ionicons name="ios-create-outline" size={30} color="black" />
                  <Text className="font-semibold text-lg">create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View >
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  authState: state.auth
})
CreateProduct.propTypes = {
  authState: propTypes.object.isRequired
}

export default connect(mapStateToProps, null)(CreateProduct)

