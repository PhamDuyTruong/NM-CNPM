import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './Components/Header/Header';
import PrevFilterContext from './context/PrevFilterContext';
import DetailProduct from './pages/DetailProduct';
import Home from './pages/Home';
import Shop from './pages/Shop';
import FAQ from './Components/FAQ';

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
          <Route path="/FAQ">
              <FAQ />
          </Route>
        </Switch>
     </PrevFilterContext>
    </BrowserRouter>
  );
}

export default App;
