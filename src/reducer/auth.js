import { SET_USER, IS_AUTHENTICATED, SET_TOKEN } from "../actions/action.type"



const intialState = {
    isLoading: false,
    user: null,
    error: false,
    isAuthenicated: false,
    token: null
}

export default (state = intialState, action) => {
    // console.log("STATE =", { ...state })

    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenicated: action.payload,
                isLoading: true
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}