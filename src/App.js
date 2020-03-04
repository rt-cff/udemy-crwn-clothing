import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import './App.css';

import {setCurrentUser} from './redux/user/user.actions'

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import ShopPage from './pages/shop/shop.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

const Hats = () => (<h1>HATS</h1>)

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        //Display Name is being updated in an async way, which we would have to use onSnapshot to get the update
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id, 
            ...snapshot.data(), 
          })
        })

        // Using .get will not create a listener and streaming like onSnapshot
        // const snapshot = await userRef.get()
        // this.setState({currentUser: {
        //   id: snapshot.id, 
        //   ...snapshot.data(), 
        // }}, () => {
        //   console.log(this.state)
        // })
      }
      else
        setCurrentUser(null)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route exact path = '/shop' component = {ShopPage}/>
          <Route exact path = '/hats' component = {Hats}/>
          {/*<Route exact path = '/signin' component = {SignInAndSignUpPage}/>*/}
          <Route exact path = '/signin'>
            {this.props.loggedIn ? <Redirect to = '/'/> : <SignInAndSignUpPage/>}
          </Route>
          
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  loggedIn: !!user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
