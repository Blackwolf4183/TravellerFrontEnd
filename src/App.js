import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Users from './user/pages/Users';
import Main from './main/pages/Main';
import NewPlace from './places/NewPlace';
import Navbar from './shared/components/Navbar';
import Footer from './shared/components/Footer';
import User from './user/pages/User';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './auth/pages/Auth';


function App() {
  return (
    <Router>
      <Navbar/>
      <main>
        <Switch>

          <Route path="/" exact>
            <Main />
          </Route>

          <Route path="/auth">
            <Auth/>
          </Route>

          <Route path="/users">
            <Users/>
          </Route>

          {/* <Route path="/Profile/:userId" exact>  */} {/* TODO: remove and change dynamic path */}

          <Route path="/user/:uid" exact>
            <User/>
          </Route>

          <Route path="/places/new">
            <NewPlace />
          </Route>

          <Route path="/places/:placeId">
            <UpdatePlace/>
          </Route>

          <Redirect to="/" />

        </Switch>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
