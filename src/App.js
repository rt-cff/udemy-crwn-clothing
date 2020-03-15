import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import './App.css';

import {setCurrentUser} from './redux/user/user.actions'
import {selectCollectionsForPreview} from './redux/shop/shop.selector'

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils'

import {checkUserSession} from './redux/user/user.actions'

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser, collectionsArray} = this.props

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if(userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth)
        
    //     //Display Name is being updated in an async way, which we would have to use onSnapshot to get the update
    //     userRef.onSnapshot(snapshot => {
    //       setCurrentUser({
    //         id: snapshot.id, 
    //         ...snapshot.data(), 
    //       })
    //     })

    //     // Using .get will not create a listener and streaming like onSnapshot
    //     // const snapshot = await userRef.get()
    //     // this.setState({currentUser: {
    //     //   id: snapshot.id, 
    //     //   ...snapshot.data(), 
    //     // }}, () => {
    //     //   console.log(this.state)
    //     // })
    //   }
    //   else
    //     setCurrentUser(null)
    // })

    //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})))

    this.props.checkUserSession()
  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route path = '/shop' component = {ShopPage}/>
          <Route exact path = '/checkout' component = {CheckoutPage}/>
          {/*<Route exact path = '/signin' component = {SignInAndSignUpPage}/>*/}
          <Route exact path = '/signin'>
            {this.props.loggedIn ? <Redirect to = '/'/> : <SignInAndSignUpPage/>}
          </Route>
          
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user, shop}) => ({
  loggedIn: !!user.currentUser, 
  collectionsArray: selectCollectionsForPreview({shop}), 
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)), 
  checkUserSession: () => dispatch(checkUserSession()), 
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
