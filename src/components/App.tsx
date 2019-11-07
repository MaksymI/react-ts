import React, { ReactElement, useState } from 'react';
import { MoviesPage, LoginForm } from '.';

export function App(): ReactElement<any> {
    const [isAuth, setIsAuth] = useState(false);
    return isAuth ? <MoviesPage /> : <LoginForm setIsAuth={setIsAuth} />;
}
