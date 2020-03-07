import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {selectCollectionsForPreview} from '../../redux/shop/shop.selector'

import CollectoinPreview from '../../components/collection-preview/collection-preview.component' 

const CollectoinOverview = ({collections}) => (
    <div>
        {collections.map(({id, ...collectionProps}) => (<CollectoinPreview key = {id} {...collectionProps}/>))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectoinOverview)