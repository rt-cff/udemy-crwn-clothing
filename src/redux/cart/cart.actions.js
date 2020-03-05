import CartActionTypes from './cart.types'

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
    payload: {}, 
})

export const AddItem = (item) => ({
    type: CartActionTypes.ADD_ITEM, 
    payload: item, 
})