import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './Components/Header/Header';
import PrevFilterContext from './context/PrevFilterContext';
import DetailProduct from './pages/DetailProduct';
import Home from './pages/Home';
import Shop from './pages/Shop';
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
        </Switch>
     </PrevFilterContext>
    </BrowserRouter>
  );
}

export default App;
