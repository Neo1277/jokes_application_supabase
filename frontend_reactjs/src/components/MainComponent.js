import React, { Component } from 'react';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  fetchChuckNorrisRandomJoke, 
  fetchFavoriteJokes,
  registerFavoriteJoke,
  signInWithEmail
} from '../redux/ActionCreators';

import { 
  LoginComponent
} from './LoginComponent';

import {
  HomeComponent
} from './HomeComponent';

import {
  ChuckNorrisRandomJokeComponent
} from './ChuckNorrisRandomJokeComponent';

import {
  MyJokesComponent
} from './MyJokesComponent';

/* Set data gotten from Django API with redux to the Component's props */
const mapStateToProps = state => {
  return{
    chuck_norris_random_joke: state.chuck_norris_random_joke,
    favorite_jokes: state.favorite_jokes
  }
}

/* Set functions from ActionCreators redux to the Cpmponent's props and dispatch */
const mapDispatchToProps = (dispatch) => ({

  fetchChuckNorrisRandomJoke: () => { dispatch(fetchChuckNorrisRandomJoke())},
  fetchFavoriteJokes: () => dispatch(fetchFavoriteJokes()),
  registerFavoriteJoke: (favorite_joke_data) => dispatch(registerFavoriteJoke(favorite_joke_data)),

  signInWithEmail: () => dispatch(signInWithEmail()),

});


class Main extends Component {

  //Execute this before render
  componentDidMount() {
    this.props.fetchChuckNorrisRandomJoke();
    this.props.fetchFavoriteJokes();
  }

  render(){

    /**
     * Set routes to open the different pages calling the components
     * And redirect to home if the url that the user type in the browser
     * does not match with any url from here
     */

     const user_id = localStorage.getItem('user_id');

     const PrivateRouteMainMenu = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        user_id != null
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )} />
    );

    const PrivateRouteMainChuckNorrisRandomJoke = ({ component: Component, ...rest }) => (
     <Route {...rest} render={(props) => (
       user_id != null
         ? <Component {...props} />
         : <Redirect to={{
             pathname: '/login',
             state: { from: props.location }
           }} />
     )} />
   );

   const PrivateRouteFavoriteJokes = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      user_id != null
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  );

    return (
      <div>
        <Header />
          <Switch>
            <Route path='/login' component={() => <LoginComponent signInWithEmail={this.props.signInWithEmail} />} />
            
            <PrivateRouteMainMenu exact path="/home" component={() => <HomeComponent />} />
            {/*<Route path='/home' component={() => <HomeComponent />} />*/}
            
            
            <PrivateRouteMainChuckNorrisRandomJoke exact path="/chuck_norris_random_joke" component={() => <ChuckNorrisRandomJokeComponent chuck_norris_random_joke={this.props.chuck_norris_random_joke} 
                                                                        registerFavoriteJoke={this.props.registerFavoriteJoke} />} />
            {/*<Route path="/chuck_norris_random_joke" component={() => <ChuckNorrisRandomJokeComponent chuck_norris_random_joke={this.props.chuck_norris_random_joke} 
                                                                        registerFavoriteJoke={this.props.registerFavoriteJoke} /> } />*/}
            
            <PrivateRouteFavoriteJokes exact path="/my_jokes" component={() => <MyJokesComponent favorite_jokes={this.props.favorite_jokes} />} />                                                
            {/*<Route path="/my_jokes" component={() => <MyJokesComponent favorite_jokes={this.props.favorite_jokes} /> } />*/}
            <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

