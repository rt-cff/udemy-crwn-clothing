import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollections} from '../../redux/shop/shop.selector'

import PreviewCollection from '../../components/preview-collection/preview-collection.component' 

const Shop = ({collections}) => (
    <div>
        SHOP PAGE
        {collections.map(({id, ...collectionProps}) => (<PreviewCollection key = {id} {...collectionProps}/>))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(Shop)