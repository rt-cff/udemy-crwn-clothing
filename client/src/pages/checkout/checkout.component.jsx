import React, {useContext} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selector'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

import './checkout.styles.scss'

import {CartContext} from '../../providers/cart/cart.provider'

const CheckoutPage = ({}) => {
    const {cartItems: items, total} = useContext(CartContext)

    return (
        <div className = 'checkout-page'>
            <div className = 'checkout-header'>
                <div className = 'header-block'>
                    <span>Product</span>
                </div>
                <div className = 'header-block'>
                    <span>Description</span>
                </div>
                <div className = 'header-block'>
                    <span>Quantity</span>
                </div>
                <div className = 'header-block'>
                    <span>Price</span>
                </div>
                <div className = 'header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {items.map(item => (
                    <CheckoutItem key = {item.id} item = {item}/>
                ))}
            <div className = 'total'>TOTAL: ${total}</div>
            <div className = 'test-warning'>
                *Please use the following test credit card for payments*
                <br/>
                4242 4242 4242 4242 - Exp: 01/20 - CVV:123
            </div>
            <StripeCheckoutButton price = {total}/>
        </div>
    )
}

const _CheckoutPage = ({items, total}) => (
    <div className = 'checkout-page'>
        <div className = 'checkout-header'>
            <div className = 'header-block'>
                <span>Product</span>
            </div>
            <div className = 'header-block'>
                <span>Description</span>
            </div>
            <div className = 'header-block'>
                <span>Quantity</span>
            </div>
            <div className = 'header-block'>
                <span>Price</span>
            </div>
            <div className = 'header-block'>
                <span>Remove</span>
            </div>
        </div>
        {items.map(item => (
                <CheckoutItem key = {item.id} item = {item}/>
            ))}
        <div className = 'total'>TOTAL: ${total}</div>
        <div className = 'test-warning'>
            *Please use the following test credit card for payments*
            <br/>
            4242 4242 4242 4242 - Exp: 01/20 - CVV:123
        </div>
        <StripeCheckoutButton price = {total}/>
    </div>
)

const mapStateToProps = createStructuredSelector({
    items: selectCartItems, 
    total: selectCartTotal, 
})

// export default connect(mapStateToProps)(CheckoutPage)
export default CheckoutPage