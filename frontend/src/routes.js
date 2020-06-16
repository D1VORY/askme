import React from 'react'
import {Route,Redirect,Switch} from 'react-router-dom'
import Wall from './containers/Wall'
import QuestionList from './containers/QuestionList'
import SignIn from './containers/SignIn'
import SignUp from './containers/SignUp'
import Settings from "./containers/Settings";
import { connect } from 'react-redux'



const PrivateRoute = ({ component: Component, ...rest }) => {
  const authenticated = localStorage.getItem("token") !== null;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const Hoc = props => props.children;


export  const BaseRouter = () => (
  <Hoc>
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <PrivateRoute path = '/wall' component={Wall}/>
    <PrivateRoute path = '/questions' component={QuestionList}/>
    <PrivateRoute path = '/settings' component={Settings}/>

  </Hoc>
);

export default BaseRouter
