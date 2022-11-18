import react, { useEffect, useState } from "react"
import { requestPermission } from "./utils/permission";
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding from "./components/OnBoarding"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import Home from "./navigation/TabNavigation"
import { SET_USER, IS_AUTHENTICATED, SET_TOKEN } from "./actions/action.type"
//Redux component
import { connect, useDispatch } from "react-redux"
import propTypes from "prop-types"
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminDashboard from "./screens/AdminDashboard";
import AllUsers from "./screens/AdminScreens/AllUsers"
import CreateProduct from "./screens/AdminScreens/CreateProduct"
import UpdateUser from "./components/update/UpdateUser"
import SingleProduct from "../src/screens/SingleProduct"
//STACK NAVIGATION

const Stack = createStackNavigator()












const App = ({ authState }) => {


  const [isLoading, setIsLoading] = useState(false)

  // console.log({ ...authState })
  const dispatch = useDispatch()

  const validateUser = async () => {


    const userToken = await AsyncStorage.getItem("token")
    const user = await AsyncStorage.getItem("user")
    const token = JSON.parse(userToken)
    if (token) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true
      })
      dispatch({
        type: SET_USER,
        payload: user
      })
      dispatch({
        type: SET_TOKEN,
        payload: token
      })
    }
  }




  useEffect(() => {

    requestPermission()
    validateUser()

  }, [])


  if (authState.isAuthenicated) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        {authState.role === "admin" && (
          <Stack.Navigator>

            <Stack.Screen
              name='Admin'
              component={AdminDashboard}
            />
            <Stack.Screen
              name='AllUsers'
              component={AllUsers}
            />
            <Stack.Screen
              name='CreateProduct'
              component={CreateProduct}
            />
            <Stack.Screen
              name='UpdateUser'
              component={UpdateUser}
            />

          </Stack.Navigator>

        )}
        <Stack.Screen
          name="SingleProduct"
          component={SingleProduct}
        />
        <Stack.Screen
          name='Home'
          component={Home}
        />
      </Stack.Navigator>

    )
  }
  else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='OnBoarding'
          component={OnBoarding}
          options={{
            headerShown: false,
            presentation: "modal"
          }}
        />
        <Stack.Screen
          name='SignIn'
          component={SignIn}
          options={{
            headerShown: false,

          }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}

          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  }
}

//PropTypes 

App.propTypes = {
  authState: propTypes.object.isRequired
}



const mapStateToProps = (state) => ({
  authState: state.auth

})

export default connect(mapStateToProps, null)(App)
















/*
As you what to hide the Splash Screen at the Runtime means at the time you can go with the given Functionality 
 
SplashScreen.preventAutoHideAsync()  --->which is used to hide the Splash screen at the  runtime 
<Stack.Navigator screenOptions={
  {
    header: (props) => <CustomHeader {...props} />
  }
}

to resume the SplashScreen using the SplashScreen.hideAsync()===> resume that 
 
*/