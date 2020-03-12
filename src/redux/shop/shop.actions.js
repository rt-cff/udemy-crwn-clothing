import shopActionTypes from './shop.types'
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'


export const updateColelctions = (collectionsMap) => ({
    type: shopActionTypes.UPDATE_COLLECTIONS, 
    payload: collectionsMap
})



export const fetchCollectionStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionStartAsync = () => dispatch => {
    const collectionRef = firestore.collection('collections')

    dispatch(fetchCollectionStart())
    collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionSnapshotToMap(snapshot)
        dispatch(fetchCollectionSuccess(collectionsMap))
    }).catch((errorMessage) => {
        dispatch(fetchCollectionFailure(errorMessage))
    })
}


export const fetchCollectionSuccess = (collectionsMap) => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS, 
    payload: collectionsMap
})

export const fetchCollectionFailure = (errorMessage) => ({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE, 
    payload: errorMessage
})