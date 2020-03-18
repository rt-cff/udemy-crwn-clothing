import React, {Component, useContext} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {selectCartItemsCount} from '../../redux/cart/cart.selector'

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'

// import CartContext from '../../context/cart/cart.context'

import {CartContext} from '../../providers/cart/cart.provider'

const CartIcon = ({_toggleCartHidden, _count}) => {
    const {toggleHidden: toggleCartHidden, cartItemsCount: count} = useContext(CartContext)
    
    return (
        <div className = 'cart-icon' onClick = {toggleCartHidden}>
            <ShoppingIcon className = 'shopping-icon'/>
            <span className = 'item-conut'>{count}</span>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()), 
})

const mapStateToProps = createStructuredSelector({
    count: selectCartItemsCount, 
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)