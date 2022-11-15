import { View, Text } from 'react-native'
import React from 'react'
import { Appbar, Avatar } from "react-native-paper"
import { Ionicons } from '@expo/vector-icons';
const CustomHeader = ({ navigation }) => {
  return (
    <Appbar.Header
      statusBarHeight={10}
      style={{
        marginBottom: 10,
        backgroundColor: "#FFF",
      }}
    >

      <View
        style={{
          flexDirection: "row"
        }}
      >

        <Avatar.Icon
          size={50}
          color={"#758283"}
          icon={(icon, color, style) => <Ionicons name="location-sharp" size={24} color="#cb202d" />
          }
          style={{
            backgroundColor: "#f4f4f2",
            // opacity: 0.4
          }}
        />


      </View>
      <Appbar.Content
        titleStyle={{
          fontFamily: "nova",
          fontWeight: "600",
          color: "#cb202d"
        }}
        title="Store" subtitle="fashion house"
        subtitleStyle={{
          color: "#cb202d",
          fontFamily: "nova"
        }}
      />

      <Avatar.Image
        source={require("../assets/images/logo.png")}
        size={40}
        style={{
          backgroundColor: "#FFF",
          paddingLeft: -30,
          marginBottom: 10
        }} />
    </Appbar.Header>
  )
}

export default CustomHeader