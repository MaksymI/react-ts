import React, { Component, FormEvent, ChangeEvent } from 'react';
import { API_URL, API_KEY_3 } from '../utils/api';

const initialState: LoginFormState = {
  username: '',
  password: '',
  error: null
};
type LoginFormState = {
  [x: string]: string;
};
type LoginFormProps = { updateAuth: (value: boolean) => void };

export default class LoginForm extends Component<
  LoginFormProps,
  LoginFormState
> {
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

    fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(response => response.json())
      .then(data => {
        const { request_token } = data;
        console.log('request_token', request_token);
        fetch(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: request_token
            })
          }
        )
          .then(response => {
            console.log('response', response);
            if (response.status < 400) {
              return response.json();
            } else {
              throw response.json();
            }
          })
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
      });
  };

  render(): JSX.Element {
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
