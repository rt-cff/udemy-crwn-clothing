import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateColelctions} from '../../redux/shop/shop.actions'

import CollectionOverview from '../../components/collection-overview/collection-overview.component' 
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class Shop extends Component {
    state = {
        loading: true
    }
    unsubscribeFromSnapshot = null
    
    componentDidMount() {
        const collectionRef = firestore.collection('collections')

        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
        //     const collectionsMap = convertCollectionSnapshotToMap(snapshot)
        //     console.log(collectionsMap)
        //     this.props.updateCollections(collectionsMap)
        //     this.setState({loading: false})
        // })

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot)

            this.props.updateCollections(collectionsMap)
            this.setState({loading: false})
        })

        // fetch('https://firestore.googleapis.com/v1/projects/udemy-crwn-db-3dd87/databases/(default)/documents/collections').then(res =>res.json())
        //     .then(collections => {
        //         console.log(collections)
        //     })
    }

    componentWillUnmount() {
        this.unsubscribeFromSnapshot()
    }

    render() {
        const {match} = this.props, {loading} = this.state

        return (
            <div className = 'shop-page'>
                <Route exact path = {`${match.path}`} render = {(props) => <CollectionOverviewWithSpinner isLoading = {loading} {...props}/>} />
                <Route path = {`${match.path}/:collectionId`} render = {(props) => <CollectionPageWithSpinner isLoading = {loading} {...props}/>}/>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateColelctions(collectionsMap))
})

export default connect(null, mapDispatchToProps)(Shop)