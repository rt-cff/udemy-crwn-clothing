import React, {createContext, useState, useEffect} from 'react'

import {addItemToCart, removeItemFromCart, emptyItemFromCart, getItemCount, getCartTotal} from './cart.utils'

export const CartContext = createContext({
    hidden: true, 
    toggleHidden: () => {}, 
    cartItems: [], 
    addItem: () => {}, 
    removeItem: () => {}, 
    clearItemFromCart: () => {}, 
    cartItemsCount: 0, 
}) 

export const CartProvider = ({children}) => {
    const [hidden, setHidden] = useState(true)
    const [cartItems, setCartItems] = useState([])
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const [total, setTotal] = useState(0)
    
    const toggleHidden = () => setHidden(!hidden)
    const addItem = (item) => setCartItems(addItemToCart(cartItems, item))
    const removeItem = (item) => setCartItems(removeItemFromCart(cartItems, item))
    const clearItemFromCart = (item) => setCartItems(emptyItemFromCart(cartItems, item))

    useEffect(() => {
        setCartItemsCount(getItemCount(cartItems))
        setTotal(getCartTotal(cartItems))
    }, [cartItems])

    return (
        <CartContext.Provider value = {{hidden, cartItems, cartItemsCount, total, toggleHidden, addItem, removeItem, clearItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

