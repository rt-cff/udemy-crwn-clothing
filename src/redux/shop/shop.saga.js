import shopActionTypes from './shop.types'
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'
import {fetchCollectionSuccess, fetchCollectionFailure} from './shop.actions'
import {takeLatest, call, put} from 'redux-saga/effects'


export function * fetchCollectionStartAsync() {
    yield console.log('I am fired')

    try {
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot)
    
        yield put(fetchCollectionSuccess(collectionsMap))
    }catch(errorMessage) {
        yield put(fetchCollectionFailure(errorMessage))
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionStartAsync)
}

