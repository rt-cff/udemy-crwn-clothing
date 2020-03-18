import React, {Component, useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.copmonent'

import {selectCartHidden} from '../../redux/cart/cart.selector'
import {selectCurrentUser} from '../../redux/user/user.selector'
import {signOutStart} from '../../redux/user/user.actions'

import {ReactComponent as Logo} from '../../assets/crown.svg'
import './header.styles.scss'

import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionContainer} from './header.styles'

import CurrentUserContext from '../../context/current-user/current-user.context'
// import CartContext from '../../context/cart/cart.context'
import {CartContext} from '../../providers/cart/cart.provider'

const Header = ({_currentUser, cartDropdownHidden, dispatch}) => {
    const currentUser = useContext(CurrentUserContext)
    // const [hidden, setHidden] = useState(true)
    // const toggleHidden = () => setHidden(!hidden)
    
    const {hidden} = useContext(CartContext)
    
    return (
        <HeaderContainer>
            <LogoContainer to="/"><Logo className = 'logo'/></LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/contact">CONTACT</OptionLink>
                {currentUser ? currentUser.displayName : null}
                {   currentUser ?
                    <OptionLink as = 'div' onClick = {() => dispatch(signOutStart())}>SIGN OUT</OptionLink> :
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                {/*<CartIcon/>*/}
                {/*<CartContext.Provider value = {{hidden, toggleHidden}}>
                    <CartIcon />
                </CartContext.Provider>*/}
                <CartIcon/>
            </OptionsContainer>
            {/*cartDropdownHidden ? null : <CartDropdown />*/}
            {hidden ? null : <CartDropdown />}
        </HeaderContainer>
    )
}
    

const mapStateToProps = createStructuredSelector({
    _currentUser: selectCurrentUser, 
    cartDropdownHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)