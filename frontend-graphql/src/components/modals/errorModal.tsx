import React from 'react';
import { ApolloError } from 'apollo-client';
import styled from 'styled-components';
import { Times } from '@styled-icons/typicons';

interface Props {
    error: ApolloError;
    show: boolean;
    onClose: Function;
}

const ModalBackground = styled.div<BackgroundProps>`
    z-index: auto;
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
    position: fixed;
    background: white;
    width: auto;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 14px;
    font-weight: normal;
    display: flex;
    flex-direction: column;
    color: black;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
`;

const ModalHeader = styled.div`
    color: red;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ModalClose = styled(Times)`
    height: 25px;
    width: 25px;
    color: black;
    cursor: pointer;
    &:hover {
        transform: translateY(-1px);
    }
`;

const Hr = styled.hr`
    border: none;
    height: 1px;
    color: black;
    background-color: black;
    width: 100%;
`;

const ErrorModal: React.FC<Props> = ({ error, show, onClose }) => {
    return (
        <ModalBackground show={show}>
            <ModalContainer>
                <ModalHeader>
                    Error <ModalClose onClick={() => onClose()} />
                </ModalHeader>
                <Hr />
                {error.graphQLErrors[0].message}
            </ModalContainer>
        </ModalBackground>
    );
};

export default ErrorModal;
