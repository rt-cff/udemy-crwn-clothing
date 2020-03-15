import {UserActionTypes} from './user.types'
import {fetchCollectionFailure, checkUserSession, signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure} from './user.actions'

import {firestore, createUserProfileDocument, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle, getCurrentUser, signOut} from '../../firebase/firebase.utils'
import {takeLatest, call, put, all} from 'redux-saga/effects'

function* getUserProfile(userAuth, additionalData) {
    const userRef = yield createUserProfileDocument(userAuth, additionalData)
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

function* onSignOut() {
    try{
        yield signOut()
        yield put(signOutSuccess())
    }catch(errorMessage) {
        yield put(signOutFailure(errorMessage))
    }
}

function* onSignUp({payload: {email, password, displayName}}) {
    try {
        const {user} = yield createUserWithEmailAndPassword(email, password)

        yield put(signUpSuccess(user, displayName))
    }catch(errorMessage) {
        yield put(signUpFailure(errorMessage))
    }
}

function* onSignUpSuccessFtn({payload: {user, displayName}}) {
    try {
        const userProfile = yield getUserProfile(user, {displayName})

        yield put(signInSuccess(userProfile))
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

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, onSignOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, onSignUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, onSignUpSuccessFtn)
}

export function* userSaga() {
    yield all([
        call(googleSignInStart), 
        call(emailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutStart), 
        call(onSignUpStart), 
        call(onSignUpSuccess), 
    ])
}
