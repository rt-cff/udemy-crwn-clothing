import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import ShopPage from './pages/shop/shop.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils'

const Hats = () => (<h1>HATS</h1>)

class App extends React.Component {
  constructor(props) {
    super(props)

    this.unsubscribeFromAuth = null
    this.state = {
      currentUser: null, 
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        
        //Display Name is being updated in an async way, which we would have to use onSnapshot to get the update
        userRef.onSnapshot(snapshot => {
          this.setState({currentUser: {
            id: snapshot.id, 
            ...snapshot.data(), 
          }}, () => {
            console.log(this.state)
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
        this.setState({currentUser: null})
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div className="App">
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route exact path = '/' component = {HomePage}/>
          <Route exact path = '/shop' component = {ShopPage}/>
          <Route exact path = '/hats' component = {Hats}/>
          <Route exact path = '/signin' component = {SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
