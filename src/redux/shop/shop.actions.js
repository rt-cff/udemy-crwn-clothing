import shopActionTypes from './shop.types'

export const updateColelctions = (collectionsMap) => ({
    type: shopActionTypes.UPDATE_COLLECTIONS, 
    payload: collectionsMap
})