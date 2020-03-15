import React, {Component} from 'react'
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

const Header = ({currentUser, cartDropdownHidden, dispatch}) => (
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
            <CartIcon />
        </OptionsContainer>
        {cartDropdownHidden ? null : <CartDropdown />}
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser, 
    cartDropdownHidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)