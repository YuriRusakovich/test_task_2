import React, { useEffect, useState } from 'react';
import { ExecutionResult, useMutation, useQuery } from 'react-apollo';
import { signInMutation } from '@constants/mutations/signInMutation';
import { me } from '@constants/queries/meQuery';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ErrorModal from '@components/modals/errorModal';

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
    font-size: 14px;
`;

const Login: React.FC = () => {
    const history = useHistory();
    const token = localStorage.getItem('Token');
    if (token) {
        history.push('/users');
    }
    const [showModal, setShowModal] = useState(false);
    const [login, setLogin] = useState({ login: '' });
    const [errors, setErrors] = useState({ message: '' });
    const [signIn, { error }] = useMutation(signInMutation);
    const { client } = useQuery(me);

    useEffect(() => {
        if (error) {
            setShowModal(true);
            setLogin({ login: '' });
        }
    }, [error, setLogin, setShowModal]);

    const closeModal: () => void = () => {
        setShowModal(false);
    };

    return (
        <>
            <PageWrapper>
                <PageHeader>Login</PageHeader>
                <FormInput
                    id="login"
                    type="text"
                    value={login.login}
                    placeholder="Login"
                    onChange={(e) => {
                        if (e.target.value) {
                            setErrors({ message: '' });
                        }
                        setLogin({ login: e.target.value });
                    }}
                />
                {errors.message && (
                    <ErrorMessage>{errors.message}</ErrorMessage>
                )}
                <br />
                <FormButton
                    onClick={() => {
                        if (!login.login) {
                            setErrors({ message: 'That field is required' });
                        } else {
                            signIn({
                                variables: {
                                    signInLogin: login.login,
                                },
                            }).then(
                                (
                                    data: ExecutionResult<{
                                        signIn: { token: string };
                                    }>,
                                ) => {
                                    if (data) {
                                        localStorage.setItem(
                                            'Token',
                                            JSON.stringify(
                                                data.data?.signIn.token,
                                            ),
                                        );
                                        client.resetStore().then();
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
            {error && (
                <ErrorModal
                    error={error}
                    show={showModal}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default Login;
