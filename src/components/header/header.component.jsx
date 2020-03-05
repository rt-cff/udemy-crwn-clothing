import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.copmonent'

import {auth} from '../../firebase/firebase.utils'

import {ReactComponent as Logo} from '../../assets/crown.svg'
import './header.styles.scss'

const Header = ({currentUser, cartDropdownHidden}) => (
    <div className = 'header'>
        <Link className = 'logo-conatainer' to="/"><Logo className = 'logo'/></Link>
        <div className = 'options'>
            <Link className = 'option' to="/shop">SHOP</Link>
            <Link className = 'option' to="/contact">CONTACT</Link>
            {   currentUser ?
                <div className = 'option' onClick = {() => auth.signOut()}>SIGN OUT</div> :
                <Link className = 'option' to="/signin">SIGN IN</Link>
            }
            <CartIcon />
        </div>
        {cartDropdownHidden ? null : <CartDropdown />}
    </div>
)

const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser: currentUser, 
    cartDropdownHidden: hidden
})

export default connect(mapStateToProps)(Header)