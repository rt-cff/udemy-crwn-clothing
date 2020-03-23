import React, {Component, Suspense, lazy, useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import {updateColelctions} from '../../redux/shop/shop.actions'

import {fetchCollectionStart, fetchCollectionStartAsync} from '../../redux/shop/shop.actions'
import {selectIsCollectionFetching} from '../../redux/shop/shop.selector'

// import CollectionOverview from '../../components/collection-overview/collection-overview.component' 
// import CollectionPage from '../collection/collection.component';
import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container' 
import CollectionPageContainer from '../collection/collection.container';
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import Spinner from '../../components/spinner/spinner.component'

import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils'

//const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
// const CollectionPageWithSpinner = WithSpinner(CollectionPage)

const CollectionOverview = lazy(() => import('../../components/collection-overview/collection-overview.component'))
const CollectionPage = lazy(() => import('../collection/collection.component'))

const Shop = ({match, fetchCollectionStartAsync}) => {
    useEffect(() => {
        fetchCollectionStartAsync()
    }, [])

    return (
        <div className = 'shop-page'>
            <Suspense>
                <Route exact path = {match.path} component = {CollectionOverviewContainer} />
                <Route path = {`${match.path}/:collectionId`} component = {CollectionPageContainer}/>
            </Suspense>
        </div> 
    )
}

class _Shop extends Component {
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

        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionSnapshotToMap(snapshot)
        //     this.props.updateCollections(collectionsMap)
        //     this.setState({loading: false})
        // })

        // fetch('https://firestore.googleapis.com/v1/projects/udemy-crwn-db-3dd87/databases/(default)/documents/collections').then(res =>res.json())
        //     .then(collections => {
        //         console.log(collections)
        //     })

        this.props.fetchCollectionStartAsync()
    }

    componentWillUnmount() {
        // this.unsubscribeFromSnapshot()
    }

    render() {
        const {match, isCollectionFetching} = this.props, {loading} = this.state

        return (
            <div className = 'shop-page'>
                <Route exact path = {`${match.path}`} component = {CollectionOverviewContainer} />
                <Route path = {`${match.path}/:collectionId`} component = {CollectionPageContainer}/>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateColelctions(collectionsMap)), 
    // fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()), 
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStart()), 
})

export default connect(null, mapDispatchToProps)(Shop)