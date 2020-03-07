import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import CollectoinOverview from '../../components/collection-overview/collection-overview.component' 
import CollectionPage from '../collection/collection.component';

const Shop = ({match}) => (
    <div className = 'shop-page'>
        <Route exact path = {`${match.path}`} component = {CollectoinOverview} />
        <Route path = {`${match.path}/:collectionId`} component = {CollectionPage}/>
    </div> 
)

export default Shop