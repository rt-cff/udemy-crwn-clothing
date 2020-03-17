import SHOP_DATA from './shop.data'
import shopActionTypes from './shop.types'

const INIT_STATE = {
    collections: null, 
    isFetching: false, 
}

const shopReducer = (state = INIT_STATE, action) => {
    switch(action.type) {
        case shopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state, 
                collections: action.payload, 
            }
        
        case shopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state, 
                isFetching: true, 
            }
        case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state, 
                isFetching: false, 
                collections: action.payload, 
            }
        case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state, 
                isFetching: false, 
                errorMessage: action.payload
            }

        default: 
            return state
    }
}

export default shopReducer