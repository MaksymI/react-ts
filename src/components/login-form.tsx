import React, { Component, FormEvent, ChangeEvent, ReactElement } from 'react';
import { authenticate } from '../utils/api';

const initialState: LoginFormState = {
    username: '',
    password: '',
    error: null
};
type LoginFormState = {
    [key: string]: string;
};
type LoginFormProps = { updateAuth: (value: boolean) => void };

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
    readonly state: LoginFormState = initialState;
    readonly inputNameRef: React.RefObject<HTMLInputElement> = React.createRef();

    componentDidMount(): void {
        this.inputNameRef.current.focus();
    }

    onChange = (event: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onSubmit = (event: FormEvent): void => {
        event.preventDefault();
        console.log('onSubmit() this.state --', this.state);

        authenticate(this.state.username, this.state.password)
            .then(data => {
                this.props.updateAuth(true);
                console.log('post data', data);
            })
            .catch(response => {
                response.then((error: { status_message: string }) => {
                    console.log('error', error);
                    this.setState({
                        error: error.status_message
                    });
                });
            });
    };

    render(): ReactElement<any> {
        return (
            <div className="form-login-container">
                <form className="form-login" onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal text-center">Login</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="username"
                            name="username"
                            value={this.state.username}
                            ref={this.inputNameRef}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block">
                        Enter
                    </button>
                    {this.state.error ? (
                        <div className="invalid-feedback">{this.state.error}</div>
                    ) : null}
                </form>
            </div>
        );
    }
}
