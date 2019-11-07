import { ChangeEvent, FormEvent, useState } from 'react';
import { loginFormInitialValues } from '../constants/initial-values';

type LoginFormInitialValues = Readonly<typeof loginFormInitialValues>;

export const useSignUpForm = (initialValues: LoginFormInitialValues, callback): any => {
    const [inputs, setInputs] = useState(initialValues);
    const handleSubmit = (event: FormEvent): void => {
        if (event) event.preventDefault();
        callback(inputs.username, inputs.password);
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    };
    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
};
