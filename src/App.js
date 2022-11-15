import react, { useEffect, useState } from "react"
import { requestPermission } from "./utils/permission";
import { createStackNavigator } from '@react-navigation/stack';
//Load all the user- defined components
import CustomHeader from "./custom/CustomHeader";
import OnBoarding from "./components/OnBoarding"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import TabNavigation from "./navigation/TabNavigation"

const Stack = createStackNavigator()







/*
As you what to hide the Splash Screen at the Runtime means at the time you can go with the given Functionality 

SplashScreen.preventAutoHideAsync()  --->which is used to hide the Splash screen at the  runtime 

to resume the SplashScreen using the SplashScreen.hideAsync()===> resume that 
 
*/






const App = () => {


  const [authState, setAuthState] = useState()

  useEffect(() => {
    requestPermission()
  }, [])


  if (!authState?.isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={
        {
          header: (props) => <CustomHeader {...props} />
        }
      }>
        <Stack.Screen
          name='Tab'
          component={TabNavigation}
        />
      </Stack.Navigator>
    )
  }
  else {
    return (
      <Stack.Navigator >
        <Stack.Screen
          name='OnBoarding'
          component={OnBoarding}
          options={{
            headerShown: false,
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



export default App