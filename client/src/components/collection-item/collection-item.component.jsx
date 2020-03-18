import React, {Component, useContext} from 'react'
import {connect} from 'react-redux'

import {AddItem} from '../../redux/cart/cart.actions'

import CustomButton from '../custom-button/custom-button.component'

import './collection-item.styles.scss'

import {CartContext} from '../../providers/cart/cart.provider'

const CollectionItem = ({item}) => {
    const {id, name, imageUrl, price} = item 
    const {addItem} = useContext(CartContext)

    return (
        <div className = 'collection-item'>
            <div className = 'image' style = {{backgroundImage: `url(${imageUrl})`}}></div>
            <div className = 'collection-footer'>
                <div className = 'name'>{name}</div>
                <div className = 'price'>{price}</div>
            </div>
            <CustomButton inverted = "true" onClick = {() => addItem(item)}>Add to Cart</CustomButton>
        </div>
    )
}

const _CollectionItem = ({item, AddItem}) => {
    const {id, name, imageUrl, price} = item 

    return (
        <div className = 'collection-item'>
            <div className = 'image' style = {{backgroundImage: `url(${imageUrl})`}}></div>
            <div className = 'collection-footer'>
                <div className = 'name'>{name}</div>
                <div className = 'price'>{price}</div>
            </div>
            <CustomButton inverted = "true" onClick = {() => AddItem(item)}>Add to Cart</CustomButton>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    AddItem: (item) => dispatch(AddItem(item))
})

// export default connect(null, mapDispatchToProps)(CollectionItem)

export default CollectionItem