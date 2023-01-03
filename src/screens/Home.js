import { View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Map from "../components/Map"
import { connect } from "react-redux"
import propTypes from "prop-types"
import { getAllProducts, getAllCategory } from "../helper/ProductHelper"
import ProductCard from '../components/ProductCard';
import ImageS from '../custom/Image';

/*
RESULT :

     products,
    filteredProductNumber,
    totalcountProduct,
    resultPerPage,

//CATEGORIES

{
    "categories": [
        "shortsleeves",
        "longsleeves",
        "sweatshirt",
        "hoodies"
    ],
    "success": true
}

*/



const Home = ({ authState }) => {

  //TO  RECTIFY


  const [openMap, setOpenMap] = useState(false)

  //JUST FOR DEMO PURPOSE ONLY
  const [categories, setCategories] = useState(['shortsleeves', 'longsleeves', 'sweatshirt', 'hoodies'])
  const [demoProduct, setDemoProduct] = useState()



  const navigation = useNavigation()

  const getCategories = async () => {
    const response = await getAllCategory(token)
    const { success, categories } = response
    setCategories(categories)
  }


  const getProduct = async (productName) => {
    const response = await getAllProducts(authState.token, productName)
    console.log(response)
    return response
  }




  useLayoutEffect(() => {

    //to setting the navigation for the Stack navigation
    navigation.setOptions({
      headerShown: false
    })
  }, [])





  return (
    <SafeAreaView className="bg-white pt-2" >
      <ImageS />
      <View className="flex-row pb-3 items-center mx-3 space-x-2 " >
        <Image source={
          require("../assets/images/logo.png")
        }
          className="h-10 w-10 rounded-full  p-4  "
        />
        <View className="flex-1 pl-2 ">
          <Text className="font-bold  text-gray-400 text-xs " >
            fashion house
          </Text>
          <TouchableOpacity onPress={() => { setOpenMap(data => !data) }
          }>
            <Text className="font-bold text-xl font-thim ">
              location
              <Feather name="chevron-down" size={20} color="#6A1B4D" />
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Admin")} >
          <FontAwesome5 name="user-alt" size={24} color="#6A1B4D" />
        </TouchableOpacity>

      </View>
      <View className="flex-row items-center space-x-2 mx-4 pb-2 ">
        <View className="flex-row  space-x-2 flex-1 bg-gray-200 p-3 ">
          <Ionicons name="search-outline" size={25} color="#6A1B4D" />
          <TextInput placeholder='search' style={{
            fontFamily: "nova",
            fontSize: 15
          }} />
        </View>
        <Feather name='sliders' size={20} color={"#6A1B4D"} />
      </View>
      <FlatList
        style={{
          marginVertical: 50,
          marginHorizontal: 10
        }}
        showsVerticalScrollIndicator={false}


        data={categories}

        keyExtractor={(item) => (item)}
        renderItem={({ item }) => (
          <View >

            <View className="flex-1 justify-between ml-3 flex-row">
              <Text className="font-bold  text-lg text-[#6A1B4D] ">{item}</Text>
              <TouchableOpacity onPress={{}} >
                <Text className="font-bold mr-4 mt-3  text-[#6A1B4D] ">view all</Text>
              </TouchableOpacity>
            </View>
            <View className=" py-5 mt-3  justify-around flex-row space-x-5 ">


              <FlatList

                style={{
                  paddingVertical: 10,
                  margin: 3
                }
                }
                horizontal
                data={getProduct(item, 2).then(response => (response.products))
                }

                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (<ProductCard product={item} />)}
              // ListEmptyComponent={() => (
              //   <ActivityIndicator
              //     color={`rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`} size={40}
              //   />
              // )}
              />
            </View>

          </View>

        )}

      />



      {/* {categories.map((category, index) => {

        const { products, filteredProductNumber, totalProduct } = getProduct()

        return (
         
        )

      })} */}
      {/* </ScrollView> */}








      {/* {openMap && (<Map />)} */}


    </SafeAreaView>

  )
}

Home.propTypes = {
  authState: propTypes.object.isRequired
}



const mapStateToProps = (state) => ({
  authState: state.auth
})


export default connect(mapStateToProps, null)(Home)

















/**
 *  <View
          className=" bg-white mt-3 mx-4 space-x-2 space-y-2   "
        >
          <View className="flex-row items-center justify-center  border border-black flex-wrap ">
            <Image
              source={require("../assets/images/model.jpg")}
              className="h-30 w-30 flex-1"
            />
            <Text
              className=""
            >{category}</Text>
          </View>
        </View>
 */