import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './Components/Header/Header';
import PrevFilterContext from './context/PrevFilterContext';
import DetailProduct from './pages/DetailProduct';
import Home from './pages/Home';
import Shop from './pages/Shop';
import FAQ from './Components/FAQ';
import Disclaimer from './Components/Disclaimer';
import Privacy from './Components/Privacy';
import Terms from './Components/Terms';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/Payment/CheckoutSuccess';
import LogOut from './pages/Logout';
import Profile from './pages/Profile';

function App() {
  return (

    <BrowserRouter>
     <PrevFilterContext>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/shop/:id" exact>
              <DetailProduct />
          </Route>
          <Route path="/shop">
            <Shop />
          </Route>
          <Route path="/sign-up">
              <Signup />
          </Route>
          <Route path="/sign-in">
              <Signin />
          </Route>
          <Route path="/profile" exact>
             <Profile />
          </Route>
          <Route path="/checkout">
              <Checkout />
          </Route>
          <Route path="/FAQ">
              <FAQ />
          </Route>
          <Route path="/dis">
              <Disclaimer />
          </Route>
          <Route path="/privacy">
              <Privacy />
          </Route>
          <Route path="/term">
              <Terms />
          </Route>
          <Route path="/pay">
            <CheckoutSuccess />
          </Route>
          <Route path="/logout">
              <LogOut />
          </Route>
          
        </Switch>
     </PrevFilterContext>
    </BrowserRouter>
  );
}

export default App;
