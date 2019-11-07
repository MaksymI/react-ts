import React, { ReactElement, useState, useEffect } from 'react';
import { authenticate } from '../utils/api';
import { useSignUpForm } from '../hooks/use-sign-up-form';
import { loginFormInitialValues } from '../constants/initial-values';

type LoginFormProps = { setIsAuth: (value: boolean) => void };

export function LoginForm(props: LoginFormProps): ReactElement<any> {
    const [error, setError] = useState<string | null>(null);
    const authenticateUser = (username: string, password: string): void => {
        authenticate(username, password)
            .then(data => {
                props.setIsAuth(true);
                console.log('post data', data);
            })
            .catch(response => {
                response.then((error: { status_message: string }) => {
                    console.log('error', error);
                    setError(error.status_message);
                });
            });
    };
    const { handleSubmit, handleInputChange, inputs } = useSignUpForm(
        loginFormInitialValues,
        authenticateUser
    );

    const inputNameRef: React.RefObject<HTMLInputElement> = React.createRef();

    useEffect(() => inputNameRef.current.focus(), []);

    return (
        <div className="form-login-container">
            <form className="form-login" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="username"
                        name="username"
                        value={inputs.username}
                        ref={inputNameRef}
                        onChange={handleInputChange}
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
                        value={inputs.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-lg btn-primary btn-block">
                    Enter
                </button>
                {error ? <div className="invalid-feedback">{error}</div> : null}
            </form>
        </div>
    );
}
