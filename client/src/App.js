import React, {useEffect, lazy, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

// import './App.css';
import {GlobalStyle} from './global.styles'

import {setCurrentUser} from './redux/user/user.actions'
import {selectCollectionsForPreview} from './redux/shop/shop.selector'

import Header from './components/header/header.component';
// import HomePage from './pages/homepage/homepage.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
// import ShopPage from './pages/shop/shop.component';
// import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument, addCollectionAndDocuments} from './firebase/firebase.utils'

import {checkUserSession} from './redux/user/user.actions'

import CurrentUserContext from './context/current-user/current-user.context'

import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))


const App = ({loggedIn, checkUserSession, currentUser}) => {
  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <div className="App">
      <GlobalStyle />
      <CurrentUserContext.Provider value = {currentUser}>
        <Header/>
      </CurrentUserContext.Provider>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback = 'Loading'>
            <Route exact path = '/' component = {HomePage}/>
            <Route path = '/shop' component = {ShopPage}/>
            <Route exact path = '/checkout' component = {CheckoutPage}/>
            {/*<Route exact path = '/signin' component = {SignInAndSignUpPage}/>*/}
            <Route exact path = '/signin'>
              {loggedIn ? <Redirect to = '/'/> : <SignInAndSignUpPage/>}
            </Route>
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  )
}

class _App extends React.Component {
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
  currentUser: user.currentUser, 
  collectionsArray: selectCollectionsForPreview({shop}), 
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)), 
  checkUserSession: () => dispatch(checkUserSession()), 
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
