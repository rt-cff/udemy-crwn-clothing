import {all, call} from 'redux-saga/effects'

import {fetchCollectionStart} from './shop/shop.saga'
// import {emailSignInStart, googleSignInStart} from './user/user.saga'
import {userSaga} from './user/user.saga'
import {cartSaga} from './cart/cart.saga'

export default function* rootSaga() {
    yield all([
        call(fetchCollectionStart), 
        call(userSaga), 
        call(cartSaga), 
    ]);
}