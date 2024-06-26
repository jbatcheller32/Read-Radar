import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import '../styles/styles.css'; 
main

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target; 

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);

        try {
            const { data } = await login({
                variables: {...formState},
            });
            Auth.login(data.login.token); 
        } catch (err) {
            console.error(err);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                   
                    <div className="card-body">
                        {data ? (
                            <p>
                                Success! 
                                <Link to="/"></Link>
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit} className="form">
                                <input
                                    className="form-input"
                                    placeholder="Your email"
                                    name="email"
                                    type="email"
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                                <input
                                    className="form-input"
                                    placeholder="******"
                                    name="password"
                                    type="password"
                                    value={formState.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="btn btn-block btn-primary"
                                    style={{ cursor: 'pointer' }}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;
