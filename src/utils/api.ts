import { Movie } from '../interfaces';

type AuthenticateStatus = {
    status_code: number;
    status_message: string;
};

export const API_URL = 'https://api.themoviedb.org/3';

export const API_KEY_3 = '3f4ca4f3a9750da53450646ced312397';

export const API_KEY_4 =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjRjYTRmM2E5NzUwZGE1MzQ1MDY0NmNlZDMxMjM5NyIsInN1YiI6IjVhYzlmNWRkOTI1MTQxNjJhZTA1Njk0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fc4f9DVB6pFWh6hIjYe0NCC4pImdmNzDIfi_3Nb3tC4';

export const callApi = (url = '', options = {}): Promise<{ results: Movie[] }> => {
    return new Promise(resolve => {
        fetch(`${API_URL}/${url}`, options)
            .then(response => {
                if (response.status < 400) {
                    return response.json();
                } else {
                    throw response.json();
                }
            })
            .then(data => {
                resolve(data);
            });
    });
};

export const authenticate = (username: string, password: string): Promise<AuthenticateStatus> => {
    return new Promise(resolve => {
        fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
            .then(response => response.json())
            .then(data => {
                const { request_token } = data;
                console.log('request_token', request_token);
                fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        request_token
                    })
                })
                    .then(response => {
                        console.log('response', response);
                        if (response.status < 402) {
                            return response.json();
                        } else {
                            throw response.json();
                        }
                    })
                    .then((status: AuthenticateStatus) => {
                        console.log('data', status);
                        resolve(status);
                    });
            });
    });
};
