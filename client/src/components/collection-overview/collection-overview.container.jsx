import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'

import CollectionOverview from './collection-overview.component'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching, 
})

// export default connect(mapStateToProps)(WithSpinner(ColelctionOverview))

const CollectionOverviewContainer = compose(
    connect(mapStateToProps), 
    WithSpinner
)(CollectionOverview)

export default CollectionOverviewContainer