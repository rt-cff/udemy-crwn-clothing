import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import ShopPage from './pages/shop/shop.component';

import {auth} from './firebase/firebase.utils'

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user)

      this.setState({currentUser: user})
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
