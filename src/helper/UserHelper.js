//All the Product Routes are handled here

import AsyncStorage from "@react-native-async-storage/async-storage"
import { BACK_END_API } from "../../Backend"



// router.route("/signup").post(signup);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/forgotPassword").post(forgotPassword);
// router.route("/password/reset/:token").put(passwordReset);
// router.route("/userdashboard").get(isLoggedIn, getLoggedInUserDetails);
// router.route("/password/update").put(isLoggedIn, changePassword);
// router.route("/userdashboard/update").put(isLoggedIn, updateUserDetails);

// //admin only routes
// router.route("/admin/users").get(isLoggedIn, customRole("admin"), adminAllUser);
// router
//   .route("/admin/user/:id")
//   .get(isLoggedIn, customRole("admin"), admingetOneUser)
//   .put(isLoggedIn, customRole("admin"), adminUpdateOneUserDetails)
//   .delete(isLoggedIn, customRole("admin"), adminDeleteOneUser);

// // manager only route
// router
//   .route("/manager/users")
//   .get(isLoggedIn, customRole("manager"), managerAllUser);
// module.exports = router;

export const logout = async () => {
    await AsyncStorage.removeItem("user")
    await AsyncStorage.removeItem("token")
    return "Success"
}

// router.route("/forgotPassword").post(forgotPassword);


export const forgetPassword = async (token, formdata) => {

    const response = await fetch(`${BACK_END_API}/forgotPassword`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })
    return await response.json()
}

// router.route("/password/reset/:token").put(passwordReset);


export const resetPassword = async (token, formdata) => {
    const response = await fetch(`${BACK_END_API}/reset/${token}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })

    return await response.json()
}

export const userDashBoard = async (token) => {
    const response = await fetch(`${BACK_END_API}/userdashboard`, {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return await response.json()
}


export const getAllUsers = async (token) => {
    let bearer = 'Bearer ' + token;
    let response = await fetch(`${BACK_END_API}/admin/users`, {
        method: "get",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}
export const getSingleUserById = async (token, id) => {
   
    let bearer = 'Bearer ' + token;
    let response = await fetch(`${BACK_END_API}/admin/user/${id}`, {
        method: "get",
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        }
    })
    return await response.json()
}



export const deleteSingleUserById = async ({ token, id }) => {

    let response = await fetch(`${BACK_END_API}/admin/user/${id}`, {
        method: "delete",
        headers: {
            "Authorozation": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return await response.json()

}
export const editSingleUserById = async (token, id, formdata) => {
    console.log({...formdata})
    let response = await fetch(`${BACK_END_API}/admin/user/${id}`, {
        method: "put",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body:formdata
    })
    return await response.json()
}