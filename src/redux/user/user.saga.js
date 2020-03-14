import {UserActionTypes} from './user.types'
import {firestore, createUserProfileDocument, signInWithEmailAndPassword, signInWithGoogle} from '../../firebase/firebase.utils'
import {GOOGLE_SIGN_IN_SUCCESS, fetchCollectionFailure} from './user.actions'
import {takeLatest, call, put, all} from 'redux-saga/effects'

import {googleSignInSuccess, emailSignInSuccess, googleSignInFailure, emailSignInFailure} from './user.actions'


function* getUserProfile(userAuth) {
    const userRef = yield createUserProfileDocument(userAuth)
    const snapshot = yield userRef.get()

    return {
        id: snapshot.id, 
        ...snapshot.data(), 
    }
}

function* googleSignInStartAsync() {
    yield console.log('googleSignInStartAsync fired')

    try {
        const {user} = yield call(signInWithGoogle)
        const userProfile = yield getUserProfile(user)

        yield put(googleSignInSuccess(userProfile))
    }catch(errorMessage) {
        yield put(googleSignInFailure(errorMessage))
    }
}

function* emailSignInStartAsync({payload: [email, password]}) {
    yield console.log('emailSignInStartAsync fired')

    try {
        const {user} = yield call(signInWithEmailAndPassword, email, password,)
        const userProfile = yield call(getUserProfile, user)

        yield put(emailSignInSuccess(userProfile))
    }catch(errorMessage) {
        yield put(emailSignInFailure(errorMessage))
    }
}

export function* googleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignInStartAsync)
}
export function* emailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInStartAsync)
}

export function* userSaga() {
    yield all([
        call(googleSignInStart), 
        call(emailSignInStart), 
    ])
}
