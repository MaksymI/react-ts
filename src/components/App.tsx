import React, { Component } from 'react';
import MoviesPage from './MoviesPage';
import LoginForm from './LoginForm';

const initialState = { isAuth: false };
type AppState = Readonly<typeof initialState>;

export class App extends Component<object, AppState> {
  readonly state: AppState = initialState;

  updateAuth = (value: boolean): void => {
    this.setState({
      isAuth: value
    });
  };

  render(): JSX.Element {
    return this.state.isAuth ? (
      <MoviesPage />
    ) : (
      <LoginForm updateAuth={this.updateAuth} />
    );
  }
}
