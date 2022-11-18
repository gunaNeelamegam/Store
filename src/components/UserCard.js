import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"



const UserCard = ({ user }) => {

    const navigation = useNavigation()

    return (
        <View >
            <TouchableOpacity onPress={() =>
                navigation.navigate("UpdateUser",{
                    id:user._id
                })
            }

                className="bg-purple-200 flex-1 my-3 mx-3 space-x-3 p-5 rounded-2xl flex-row "
            >
                <Image
                    source={
                        {
                            uri: user.photo.secure_url
                        }
                    }
                    className="h-20 w-20 rounded-lg"
                />

                <View className="flex-1 space-y-2 font-semibold">
                    <Text className="text-left " >{user.name}</Text>
                    <Text className="text-left" >{user.email}</Text>
                    <Text className="text-left" >{user.role}</Text>
                    <Text className="text-left" >{user.createdAt}</Text>
                </View>
            </TouchableOpacity>

        </View>





    )
}

export default UserCard