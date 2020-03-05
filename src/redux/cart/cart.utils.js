export const addItemToCart = (cartItems, cartItemToAdd) => {
    const newCartItems = cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)

    return cartItems.find(cartItem => cartItem.id === cartItemToAdd.id) ? newCartItems : [...newCartItems, {...cartItemToAdd, quantity: 1}]
}
