import React, { Component, ReactElement } from 'react';
import { MoviesPage, LoginForm } from '.';

const initialState = { isAuth: false };
type AppState = Readonly<typeof initialState>;

export class App extends Component<object, AppState> {
    readonly state: AppState = initialState;

    updateAuth = (value: boolean) => {
        this.setState({
            isAuth: value
        });
    };

    render(): ReactElement<any> {
        return this.state.isAuth ? <MoviesPage /> : <LoginForm updateAuth={this.updateAuth} />;
    }
}
