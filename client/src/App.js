import React from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { About } from "./pages/about/About"
import { Contact } from "./pages/contact/Contact"

import { Login } from "./pages/login/Login"
import { Regsiter } from "./pages/login/Regsiter"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { useContext } from 'react';
import { Context } from './context/Context';
// "proxy": "http://localhost:5000/api/"
export const PF =   " https://blogback-8voh.onrender.com/images/";
const App = () => {
  const {user} = useContext(Context);
  return (
    <>
   
      <Router>
        <Header />
        <div className="app">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />

          <Route exact path='/login' component={!user  && Login} />
          <Route exact path='/register' component={ !user  && Regsiter} />
          <Route exact path='/details/:id' component={user? DetailsPages: Login} />
          <Route exact path='/account' component={user?  Account : Login} />
          <Route exact path='/create' component={ user? Create: Login } />
        </Switch>
        </div>
        <Footer />
      </Router>
     
    </>
  )
}
export default App
