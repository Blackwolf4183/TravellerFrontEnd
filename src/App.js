import './App.css';
import { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { Authcontext } from './shared/context/auth-context';

import Users from './user/pages/Users';
import Main from './main/pages/Main';
import NewPlace from './places/NewPlace';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import User from './user/pages/User';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './auth/pages/Auth';

function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    const toeknExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //new date + 1 hour
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: toeknExpirationDate.toISOString(),
      })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData'); // on logout
  }, []);

  useEffect(() => {
    //get token stored in localstorage
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/user/:uid" exact>
          <User />
        </Route>
        <Route path="/auth/login">
          <Auth isLoging={true} />
        </Route>
        <Route path="/auth/signup">
          <Auth isLoging={false} />
        </Route>
        <Redirect to="/auth/login" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/user/:uid" exact>
          <User />
        </Route>
        <Route path="/places/new">
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Authcontext.Provider
      value={{
        isLoggedIn: !!token, //this will be true if there is a token
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navbar />
        <main>{routes}</main>
        <Footer />
      </Router>
    </Authcontext.Provider>
  );
}

export default App;
