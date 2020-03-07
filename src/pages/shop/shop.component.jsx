import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollections} from '../../redux/shop/shop.selector'

import CollectoinPreview from '../../components/collection-preview/collection-preview.component' 

const Shop = ({collections}) => (
    <div>
        SHOP PAGE
        {collections.map(({id, ...collectionProps}) => (<CollectoinPreview key = {id} {...collectionProps}/>))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(Shop)