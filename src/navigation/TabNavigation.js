import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Cart from "../screens/Bottom/Cart"
import Payment from "../screens/Bottom/Payment"
import React from 'react'
import Home from "../screens/Home"

import { Ionicons, MaterialIcons } from '@expo/vector-icons';



const TabNav = createBottomTabNavigator()


const TabNavigation = () => {
    return (
        <TabNav.Navigator
            screenOptions={
                {
                    tabBarHideOnKeyboard: false,
                    header: () => null,
                    tabBarLabel: ({ color, position }) => false,
                    tabBarActiveTintColor: '#cb202d',
                    tabBarInactiveTintColor: "#000",
                }
            }
            initialRouteName="Home"
        >
            <TabNav.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (<Ionicons name="ios-home-outline" size={size} color={color} />)
                }}

            />

            <TabNav.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (<Ionicons name="cart-outline" size={size} color={color} />),
                    tabBarActiveTintColor: "#cb202d"

                }}
            />
            <TabNav.Screen
                name="Payment"
                component={Payment}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (<MaterialIcons name="payment" size={size} color={color} />)
                }}
            />

        </TabNav.Navigator>
    )
}

export default TabNavigation