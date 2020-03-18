export const addItemToCart = (cartItems, cartItemToAdd) => {
    const newCartItems = cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)

    return cartItems.find(cartItem => cartItem.id === cartItemToAdd.id) ? newCartItems : [...newCartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)

    return newCartItems.filter(cartItem => cartItem.quantity !== 0)
}

export const emptyItemFromCart = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const getItemCount = (cartItems) => {
    return cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
}

export const getCartTotal = (cartItems) => {
    return cartItems.reduce((count, cartItem) => count + cartItem.price * cartItem.quantity, 0)
}
 