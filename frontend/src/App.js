

import React from 'react'
import { BrowserRouter ,Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

//import navigation
import Navigation from './component/navigation'

//import pages
import Home from './pages/homepage'
import Login from './pages/login'
import Register from './pages/register'
import Verify from "./pages/verification"
import Cart from './pages/cartPage'

//import action
import { keepLogin } from './actions'

class App extends React.Component {
  componentDidMount() {
    this.props.keepLogin()
}

  render() {
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path="/verification" component={Verify} />
          <Route path='/Cart' component={Cart}/>
        </Switch>
      </div>
    )
  }
}


export default connect(null, { keepLogin })(App)
