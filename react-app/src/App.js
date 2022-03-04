import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav';
import NewPost from './components/Posts/NewPost/';
import HomeFeed from './components/Home';
import EditPostPage from './components/Posts/EditPostPage';
import SplashPage from './components/Splash';
import CategoriesPage from './components/CategoriesPage';
import PageNotFound from './components/PageNotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from "./store/session";
import SinglePost from './components/Posts/SinglePost';




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
        <Route exact={true} path="/" component={SplashPage} />
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/signup" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/posts" exact={true}>
          <HomeFeed />
        </ProtectedRoute>
        <ProtectedRoute path="/posts/:id" exact={true}>
          <SinglePost />
        </ProtectedRoute>
        <Route path="/posts/:id/edit" exact={true}>
          <EditPostPage />
        </Route>
        <Route path="/post/new" exact={true}>
          <NewPost />
        </Route>
        <Route path="/categories/:id" exact={true}>
          <CategoriesPage />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
