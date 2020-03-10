import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateColelctions} from '../../redux/shop/shop.actions'

import CollectoinOverview from '../../components/collection-overview/collection-overview.component' 
import CollectionPage from '../collection/collection.component';

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'

class Shop extends Component {
    unsubscribeFromSnapshot = null
    
    componentDidMount() {
        const collectionRef = firestore.collection('collections')

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot)
            console.log(collectionsMap)
            this.props.updateCollections(collectionsMap)
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot()
    }

    render() {
        const {match} = this.props

        return (
            <div className = 'shop-page'>
                <Route exact path = {`${match.path}`} component = {CollectoinOverview} />
                <Route path = {`${match.path}/:collectionId`} component = {CollectionPage}/>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateColelctions(collectionsMap))
})

export default connect(null, mapDispatchToProps)(Shop)