import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import PrevFilterContext from "./context/PrevFilterContext";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import FAQ from "./Components/FAQ";
import Disclaimer from "./Components/Disclaimer";
import Privacy from "./Components/Privacy";
import Terms from "./Components/Terms";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/Payment/CheckoutSuccess";
import LogOut from "./pages/Logout";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./Layouts/AppLayout";
import AdminLayout from "./Layouts/AdminLayout";
import AdminRoute from "./Route/AdminRoute";
import Dashboard from "./Components/Admin/Dashboard";
import UsersPage from "./pages/Admin/UsersManagement/UsersPage";
import ProductsPage from "./pages/Admin/ProductsManagement/ProductsPage";
import ProductDetailPage from "./pages/Admin/ProductsManagement/ProductDetailPage";
import ProductCreatePage from "./pages/Admin/ProductsManagement/ProductCreatePage";
import OrdersPage from "./pages/Admin/OrdersManagement/OrdersPage";
import OrderDetail from "./pages/Admin/OrdersManagement/OrderDetail";
import  Calendar  from "./pages/Admin/Calendar/Calendar";


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">

          <PrevFilterContext>
              <Switch>
                <Route path="/" exact>
                  <AppLayout>
                      <Home />
                  </AppLayout>
                </Route>
                <Route path="/shop/:id" exact>
                  <AppLayout>
                    <DetailProduct />
                  </AppLayout>
                </Route>
                <Route path="/shop">
                  <AppLayout>
                      <Shop />
                  </AppLayout>
                </Route>
                <Route path="/sign-up">
                  <AppLayout>
                      <Signup />
                  </AppLayout>
                </Route>
                <Route path="/sign-in">
                  <AppLayout>
                      <Signin />
                  </AppLayout>
                </Route>
                <Route path="/profile" exact>
                  <AppLayout>
                      <Profile />
                  </AppLayout>
                </Route>
                <Route path="/checkout">
                  <AppLayout>
                      <Checkout />
                  </AppLayout>
                </Route>
                <Route path="/FAQ">
                  <AppLayout>
                      <FAQ />
                  </AppLayout>
                </Route>
                <Route path="/dis">
                  <AppLayout>
                      <Disclaimer />
                  </AppLayout>
                </Route>
                <Route path="/privacy">
                  <AppLayout>
                    <Privacy />
                  </AppLayout>
                </Route>
                <Route path="/term">
                  <AppLayout>
                      <Terms />
                  </AppLayout>
                </Route>
                <Route path="/pay">
                  <AppLayout>
                      <CheckoutSuccess />
                  </AppLayout>
                </Route>
                <Route path="/logout">
                  <AppLayout>
                      <LogOut />
                  </AppLayout>
                </Route>
                <Route path="/admin">
                  <AdminRoute path="/admin/dashboard" exact>
                      <AdminLayout>
                          <Dashboard />
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/users" exact>
                      <AdminLayout>
                           <UsersPage/>
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/products/create/one" exact>
                      <AdminLayout>
                           <ProductCreatePage />
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/products/:id" exact>
                      <AdminLayout>
                           <ProductDetailPage />
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/products" exact>
                      <AdminLayout>
                           <ProductsPage />
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/orders/:id" exact>
                      <AdminLayout>
                           <OrderDetail />
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/orders" exact>
                      <AdminLayout>
                           <OrdersPage />
                      </AdminLayout>
                  </AdminRoute>
                  <AdminRoute path="/admin/calendar" exact>
                      <AdminLayout>
                           <Calendar />
                      </AdminLayout>
                  </AdminRoute>
                </Route>
                <Route path="*">
                  <PageNotFound />
                </Route>
              </Switch>
            
          </PrevFilterContext>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
