import React, {useContext} from 'react'
import {connect} from 'react-redux'

import {AddItem, RemoveItem, EmptyItemFromCart} from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'

import {CartContext} from '../../providers/cart/cart.provider'

const CheckoutItem = ({item}) => {
    const {name, quantity, price, imageUrl} = item
    const {addItem, removeItem, clearItemFromCart} = useContext(CartContext)

    return (
        <div className = 'checkout-item'>
            <div className = 'image-container'>
                <img src = {imageUrl} alt = 'item'/>
            </div>
            <div className = 'name'>{name}</div>
            <div className = 'quantity'>
                <div className = 'arrow' onClick = {() => removeItem(item)}>&#10094;  </div>
                <span className = 'value'>{quantity}</span>
                <div className = 'arrow' onClick = {() => addItem(item)}>  &#10095;</div>
            </div>
            <div className = 'price'>{price}</div>
            <div className = 'remove-button' onClick = {() => clearItemFromCart(item)}>&#10005;</div>
        </div>
    )
}

const _CheckoutItem = ({item, dispatch}) => {
    const {name, quantity, price, imageUrl} = item

    return (
        <div className = 'checkout-item'>
            <div className = 'image-container'>
                <img src = {imageUrl} alt = 'item'/>
            </div>
            <div className = 'name'>{name}</div>
            <div className = 'quantity'>
                <div className = 'arrow' onClick = {() => dispatch(RemoveItem(item))}>&#10094;  </div>
                <span className = 'value'>{quantity}</span>
                <div className = 'arrow' onClick = {() => dispatch(AddItem(item))}>  &#10095;</div>
            </div>
            <div className = 'price'>{price}</div>
            <div className = 'remove-button' onClick = {() => dispatch(EmptyItemFromCart(item))}>&#10005;</div>
        </div>
    )
}


// export default connect(null)(CheckoutItem)
export default CheckoutItem