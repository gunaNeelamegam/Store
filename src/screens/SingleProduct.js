import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { getSingleProduct } from '../helper/ProductHelper';
import { connect } from "react-redux"
import propTypes from "prop-types"
import AsyncStorage from '@react-native-async-storage/async-storage';


const SingleProduct = ({ route }) => {

  const naviagtion = useNavigation()
  const [id, setId] = useState()
  const [product, setProduct] = useState()

  // const { userId } = route?.params
  // setId(userId)
  const getProduct = async () => {
    // const product = await getSingleProduct(authState.token, id)
    // setProduct(product)
    const token = await AsyncStorage.getItem("token")
    console.log( token)
  }

  useEffect(() => {
    getProduct()
  })


  return (
    <SafeAreaView className="bg-gray-200 flex-1 space-x-2 space-y-2 p-5 ">
      <View>
        <Text className="m-auto  p-2 font-mono text-lg " >{`Product name`}</Text>
        <TouchableOpacity onPress={() => { naviagtion.canGoBack() }}>
          <View className=" space-x-2 justify-between p-3 flex-row ">
            <Ionicons name="chevron-back-circle-outline" size={30} color="#6A2b4D" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-1 p-3 bg-white rounded-lg h-40 w-70 items-center space-x-2 flex-row">
        <ScrollView
        >
          {/**CREATE THE MAP TO RENDER ALL THE PHOTOS */}
          <View className="flex-1 items-center space-y-20 mt-10 ">
            <Image
              source={
                require("../assets/images/model.jpg")
              }
              className="h-60 w-60 rounded-lg "
            />
          </View>
        </ScrollView>
      </View>
      <View className="flex-1    rounded-2xl bg-gray-100">
        <View className="flex-row  space-x-2">
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={20}

          />
          <Text >
            {product?.price}  {'\u20B9'}
          </Text>
        </View>
      </View>
    </SafeAreaView>

  )
}

SingleProduct.propTypes = {
  authState: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  authState: state.authState
})
export default connect(mapStateToProps, null)(SingleProduct)