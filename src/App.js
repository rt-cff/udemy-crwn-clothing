import React from 'react';
import {Switch, Route} from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

const Hats = () => (<h1>HATS</h1>)

function App() {
  return (
    <div className="App">
      <Route path = '/' component = {Header}/>
      <Switch>
        <Route exact path = '/' component = {HomePage}/>
        <Route exact path = '/shop' component = {ShopPage}/>
        <Route exact path = '/hats' component = {Hats}/>
      </Switch>
    </div>
  );
}

export default App;
