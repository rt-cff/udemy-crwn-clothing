// {
//     type: '', 
//     payload: '', 
// }

import {UserActionTypes} from './user.types'

const INIT_STATE = {
    currentUser: null, 
}

const userReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state, 
                currentUser: action.payload
            }

        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state, 
                currentUser: action.payload, 
                error: null
            }

        case UserActionTypes.SIGN_IN_FAILURE:
            return {
                ...state, 
                error: action.payload
            }

        default: 
            return state
    }
}

export default userReducer