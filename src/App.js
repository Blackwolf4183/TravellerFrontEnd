import './App.css';
import { useState, useCallback } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (!isLoggedIn) {
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
          <Auth isLoging={true}/>
        </Route>
        <Route path="/auth/signup">
          <Auth isLoging={false}/>
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
        isLoggedIn: isLoggedIn,
        userId:userId,
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
