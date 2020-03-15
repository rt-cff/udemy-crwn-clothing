import {UserActionTypes} from './user.types'
import {fetchCollectionFailure, signInSuccess, signInFailure} from './user.actions'

import {firestore, createUserProfileDocument, signInWithEmailAndPassword, signInWithGoogle, getCurrentUser} from '../../firebase/firebase.utils'
import {takeLatest, call, put, all} from 'redux-saga/effects'

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

        yield put(signInSuccess(userProfile))
    }catch(errorMessage) {
        yield put(signInFailure(errorMessage))
    }
}

function* emailSignInStartAsync({payload: [email, password]}) {
    yield console.log('emailSignInStartAsync fired')

    try {
        const {user} = yield call(signInWithEmailAndPassword, email, password,)
        const userProfile = yield call(getUserProfile, user)

        yield put(signInSuccess(userProfile))
    }catch(errorMessage) {
        yield put(signInFailure(errorMessage))
    }
}

function* isUserAuthenticated() {
    yield console.log('isUserAuthenticated fired')
    try {
        const user = yield call(getCurrentUser)

        if(user) {
            const userProfile = yield call(getUserProfile, user)

            yield put(signInSuccess(userProfile))
        }
    }catch(errorMessage) {
        yield put(signInFailure(errorMessage))
    }
}

export function* googleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignInStartAsync)
}
export function* emailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignInStartAsync)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSaga() {
    yield all([
        call(googleSignInStart), 
        call(emailSignInStart), 
        call(onCheckUserSession), 
    ])
}
