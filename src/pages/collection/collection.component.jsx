import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollection} from '../../redux/shop/shop.selector'

import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'

const Collection = ({collection: {title, items}}) => (
    <div className = 'collection-page'>
        <div className = 'title'>{title}</div> 
        <div className = 'items'>
            {items.map(item => <CollectionItem key = {item.id} item = {item}/>)}
        </div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    collection: selectCollection
})

export default connect(mapStateToProps)(Collection) 