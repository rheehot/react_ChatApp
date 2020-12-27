import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegitserPage from './components/RegisterPage/RegisterPage';



const App = () => {
  return (
    <Router>
      <Switch>
        {/* component 컴포넌트 */}
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegitserPage} />
      </Switch>
    </Router>
  );
};

export default App;