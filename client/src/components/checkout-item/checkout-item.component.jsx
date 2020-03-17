import React from 'react'
import {connect} from 'react-redux'

import {AddItem, RemoveItem, EmptyItemFromCart} from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'

const CheckoutItem = ({item, dispatch}) => {
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



export default connect(null)(CheckoutItem)