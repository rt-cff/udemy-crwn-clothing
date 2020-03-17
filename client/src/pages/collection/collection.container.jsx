import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'

import Collection from './collection.component'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching, 
})

const CollectionContainer = compose(
    connect(mapStateToProps), 
    WithSpinner
)(Collection)

export default CollectionContainer