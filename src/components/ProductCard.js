import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

//// base - Product.find(email: {"gunag5127@gmail.com"})




const ProductCard = ({ product }) => {

    console.log(product?._id)

    const navigation = useNavigation()

    return (
        <View  >

            <TouchableOpacity onPress={() =>
                navigation.navigate("SingleProduct", {
                    id: product?._id
                })
            }

                className="bg-purple-200  "
            >
                <Image
                    source={
                        {
                            uri: product.photos.secure_url
                        }
                    }
                    className="h-40 w-40 rounded-xl"
                />
                <Text className="text-center font-semibold " >{product.name}</Text>
            </TouchableOpacity>

        </View>





    )
}


export default ProductCard














/**
 *  <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingVertical: 10,
                paddingHorizontal: 10
            }}
        >
        
            <View>
                <Text>ProductCard</Text>
            </View>
        </ScrollView>
 */