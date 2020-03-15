import {UserActionTypes} from '../user/user.types'

import {takeLatest, call, put, all} from 'redux-saga/effects'

import {emptyCart} from '../cart/cart.actions'

function* onSignOutSuccess() {
    yield put(emptyCart())
}

export function* onSignOut () {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, onSignOutSuccess)
}

export function* cartSaga() {
    yield all([
        call(onSignOut)
    ])
}
