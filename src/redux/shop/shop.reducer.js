import SHOP_DATA from './shop.data'
import shopActionTypes from './shop.types'

const INIT_STATE = {
    collections: null
}

const shopReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case shopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state, 
                collections: action.payload, 
            }

        default: 
            return state
    }
}

export default shopReducer