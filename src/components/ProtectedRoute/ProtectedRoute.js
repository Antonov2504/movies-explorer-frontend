import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function ProtectedRoute({ component: Component, ...props }) {
  const value = useContext(AppContext);
  return (
    <Route>
      <Header />
      {
        value.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
      {value.location.pathname !== "/profile" && <Footer />}
    </Route>
  )
}

export default ProtectedRoute;