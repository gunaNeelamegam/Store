

import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const UpdateUser = ({ productDetails }) => {


    setName(productDetails.name)
    setBrand(productDetails.brand)
    setPhotos(productDetails.photos)
    setCategory(productDetails.category)
    setDescription(productDetails)
    setPrice(productDetails.price)
    setStock(productDetails.stock)
    const [photos, setPhotos] = useState()
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


    return (
        <SafeAreaView className="bg-white flex-1 p-5">
            <View className="items-center mt-3 px-4  mb-4">
                <Text className="font-bold text-2xl " > Update Product {response?.message}</Text>
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




export default UpdateUser