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
import CategoryIdPage from './components/Categories';
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
        <Route path="/users/:userId" exact={true}>
          <Profile />
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
        <Route path="/categories/:id" exact={true}>
          <CategoryIdPage />
        </Route>
        <Route path="/post/new" exact={true}>
          <NewPostForm />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
