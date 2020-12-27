import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';

import firebase from './firebase'

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';;

const App = () => {

  let history = useHistory();
  let dispatch = useDispatch();

  // State => User => isLoading
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // 로그인 상태
      if (user) {
        history.push('/');
        dispatch(setUser(user));
      }
      // 로그인 실패 상태
      else {
        history.push('/login');
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <Switch>
        {/* component 컴포넌트 */}
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
};

export default App;