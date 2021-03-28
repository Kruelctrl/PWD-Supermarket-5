import logo from './logo.svg';
import './App.css';

import React from 'react'
import { BrowserRouter ,Route, Switch } from 'react-router-dom'

//import navigation
import Navigation from './component/navigation'

//import pages
import Home from './pages/hometest'
import Cart from './pages/cartPage'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/Cart' component={Cart}/>
        </Switch>
      </div>
    )
  }
}

export default App;
