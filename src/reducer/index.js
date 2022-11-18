import { combineReducers } from "redux"
import auth from "./auth"

//using the combine reducer we can join the multiple reducer into the single the combine reducer turn into the Object and combine into the Single Object

//all the state are turned into the single state based on the Key of the state the combine reducer add the state or change the state

export default combineReducers({
    auth,
})