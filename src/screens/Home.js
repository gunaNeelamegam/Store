
import React, { useEffect, useState } from 'react'
import { BACK_END_API } from "../../Backend"
import { Text, View } from 'react-native';
import axios from 'axios';



const get = () => {

  axios.get(`${BACK_END_API}/userdashboard`).then(response => {
    console.log(response)
  }).catch(error => {
    console.error(error)
  })

}

export default function Home() {


  const [authUser, setAuthUser] = useState(null)

  get()

  return (
    <View>
      <View  >
        <Text>Open up Home.js to start working on your Home!</Text>
      </View >
    </View>
  );


}