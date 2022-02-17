import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav';
import NewPostForm from './components/Posts/NewPost/';
import EditPost from './components/Posts/EditPost/';
import ProtectedRoute from './components/auth/ProtectedRoute';

import HomeFeed from './components/Home';
import Profile from './components/Profile';

import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path='/posts' exact={true} >
         <HomeFeed />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          <h1> SPLASH GOES HERE</h1>
        </Route>
        <ProtectedRoute path='/posts/new' exact={true} >
          <NewPostForm />
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId/edit' exact={true} >
          <EditPost />
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
