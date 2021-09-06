import React, { useState } from 'react';
import { ExecutionResult, useMutation, useQuery } from 'react-apollo';
import { signInMutation } from '@constants/mutations/signInMutation';
import { me } from '@constants/queries/meQuery';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const PageWrapper = styled.div`
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 200px;
`;

const FormInput = styled.input`
    border: 2px solid black;
    border-radius: 3px;
    font-size: 14px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
`;

const FormButton = styled.button`
    border: none;
    background: burlywood;
    border-radius: 3px;
    height: 25px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease 0s;
    font-weight: bold;
    &:hover {
        background: sandybrown;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
        transform: translateY(-1px);
    }
`;

const PageHeader = styled.h2`
    text-align: center;
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
`;

const Login: React.FC = () => {
    const [login, setLogin] = useState({ login: '' });
    const [error, setError] = useState({ message: '' });
    const history = useHistory();
    const [signIn] = useMutation(signInMutation);
    const { client } = useQuery(me);

    return (
        <PageWrapper>
            <PageHeader>Login</PageHeader>
            <FormInput
                id="login"
                type="text"
                value={login.login}
                placeholder="Login"
                onChange={(e) => {
                    if (e.target.value) {
                        setError({ message: '' });
                    }
                    setLogin({ login: e.target.value });
                }}
            />
            {error.message && <ErrorMessage>{error.message}</ErrorMessage>}
            <br />
            <FormButton
                onClick={() => {
                    if (!login.login) {
                        setError({ message: 'That field is required' });
                    } else {
                        signIn({
                            variables: {
                                signInLogin: login.login,
                            },
                        }).then(
                            async (
                                data: ExecutionResult<{
                                    signIn: { token: string };
                                }>,
                            ) => {
                                if (data) {
                                    localStorage.setItem(
                                        'Token',
                                        JSON.stringify(data.data?.signIn.token),
                                    );
                                    await client.resetStore();
                                    history.push('/users');
                                }
                            },
                        );
                    }
                }}
            >
                Login
            </FormButton>
        </PageWrapper>
    );
};

export default Login;
