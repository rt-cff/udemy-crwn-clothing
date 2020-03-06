import CartActionTypes from './cart.types'

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN,
    payload: {}, 
})

export const AddItem = (item) => ({
    type: CartActionTypes.ADD_ITEM, 
    payload: item, 
})

export const RemoveItem = (item) => ({
    type: CartActionTypes.REMOVE_ITEM, 
    payload: item, 
})

export const EmptyItemFromCart = (item) => ({
    type: CartActionTypes.EMPTY_ITEM_FROM_CART, 
    payload: item, 
})