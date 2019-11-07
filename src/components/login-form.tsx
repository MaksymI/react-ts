import React, { FormEvent, ReactElement, useState, useEffect } from 'react';
import { authenticate } from '../utils/api';

type LoginFormProps = { setIsAuth: (value: boolean) => void };

export function LoginForm(props: LoginFormProps): ReactElement<any> {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const inputNameRef: React.RefObject<HTMLInputElement> = React.createRef();

    useEffect(() => {
        inputNameRef.current.focus();
    });

    const onSubmit = (event: FormEvent): void => {
        event.preventDefault();

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

    return (
        <div className="form-login-container">
            <form className="form-login" onSubmit={onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal text-center">Login</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="username"
                        name="username"
                        value={username}
                        ref={inputNameRef}
                        onChange={event => setUsername(event.target.value)}
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
                        value={password}
                        onChange={event => setPassword(event.target.value)}
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
