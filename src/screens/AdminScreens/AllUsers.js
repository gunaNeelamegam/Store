import { View, Text, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getAllUsers } from "../../helper/UserHelper"
import UserCard from "../../components/UserCard"
import propTypes from "prop-types"
import { connect } from "react-redux"

const AllUsers = ({ authState }) => {

    const [users, setUsers] = useState([])

    const setAllUsers = async () => {
        const { token, user } = authState
        let response = await getAllUsers(token)
        const { users, success } = response
        setUsers(users)
    }

    useLayoutEffect(() => {
        setAllUsers()
    }, [])


    return (

        <View className="bg-white flex-1">
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <UserCard user={item} />
                )}

                ListHeaderComponent={({ ...props }) => <Text
                    className="text-center font-bold p-5 text-xl "
                >All User's</Text>}
                ListEmptyComponent={
                    () => (
                        <ActivityIndicator
                            color={`rgb(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)})`} size={40}
                        />
                    )
                }
            />
        </View>


    )
}

AllUsers.propTypes = {
    authState: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authState: state.auth
})

export default connect(mapStateToProps, null)(AllUsers)