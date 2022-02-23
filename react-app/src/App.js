import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav';
import NewPostForm from './components/Posts/NewPost/';
import HomeFeed from './components/Home';
import Profile from './components/Profile';
import EditPostPage from './components/Posts/EditPostPage';
import PostIdPage from './components/Posts/PostIdPage';
import SplashPage from './components/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from "./store/session";




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
        <Route exact path="/" component={SplashPage} />
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/users/:userId' exact={true} >
          <Profile />
        </Route>
        <ProtectedRoute path='/posts' exact={true} >
         <HomeFeed />
        </ProtectedRoute>
        <Route path='/posts/:id' exact={true} >
          <PostIdPage />
        </Route>
        <Route path='/posts/:id/edit' exact={true} >
          <EditPostPage/>
        </Route>
        <Route path="/" exact={true}>
          <h1> SPLASH GOES HERE</h1>
        </Route>
        <Route path='/post/new' exact={true} >
          <NewPostForm />
        </Route>

      </Switch>
    </>
  );
}

export default App;
