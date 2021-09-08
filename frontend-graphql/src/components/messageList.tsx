import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import { createMessageMutation } from '@constants/mutations/createMessageMutation';
import MessageItem from '@components/messageItem';
import { userQuery } from '@constants/queries/userQuery';
import ErrorModal from '@components/modals/errorModal';

interface Props {
    user: User;
}

const CardWrapper = styled.div`
    overflow: hidden;
    padding: 15px;
    margin: 30px;
    display: flex;
    flex-direction: column;
    font-family: Quicksand, arial, sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0 40px rgba(0, 0, 0, 0.08);
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

const FormInput = styled.input`
    border: 2px solid black;
    border-radius: 3px;
    font-size: 14px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    width: 200px;
    margin: 0;
    padding: 0;
`;

const FormButton = styled.button`
    border: none;
    background: burlywood;
    border-radius: 3px;
    height: 25px;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    outline: none;
    width: 204px;
    transition: all 0.3s ease 0s;
    font-weight: bold;
    margin: 10px 0;
    padding: 0;
    &:hover {
        background: sandybrown;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
        transform: translateY(-1px);
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 14px;
`;

const ListWrapper = styled.div`
    position: relative;
    overflow-y: scroll;
    max-height: 200px;
    box-shadow: inset 0 0 15px 10px rgba(219, 161, 103, 0.3);
    width: 400px;
    background: rgba(219, 161, 103, 0.1);

    &::-webkit-scrollbar {
        width: 0.4em;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(219, 161, 103, 0.5);
        border-radius: 4px;
    }
`;

const MessageList: React.FC<Props> = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState({ message: '' });
    const [errors, setErrors] = useState({ message: '' });
    const [messages, setMessages] = useState(user.messages);
    const [createMessage, { error }] = useMutation(createMessageMutation, {
        update(cache, mutationResult) {
            try {
                const newMessage = mutationResult.data.createMessage;
                const data: { user: User } | null = cache.readQuery({
                    query: userQuery,
                    variables: { userId: parseInt(user.id) },
                });
                if (data && data.user) {
                    data.user.messages?.push(newMessage);
                    cache.writeQuery({
                        query: userQuery,
                        variables: { userId: parseInt(user.id) },
                        data,
                    });
                }
            } catch {}
        },
    });

    useEffect(() => {
        if (error) {
            setShowModal(true);
            setMessage({ message: '' });
        }
    }, [error, setShowModal, setMessage]);

    const handleDelete: () => void = () => {
        setMessages(user.messages);
    };

    const closeModal: () => void = () => {
        setShowModal(false);
    };

    return (
        <>
            <CardWrapper>
                <FormInput
                    id="message"
                    type="text"
                    value={message.message}
                    placeholder="Message"
                    onChange={(e) => {
                        if (e.target.value) {
                            setErrors({ message: '' });
                        }
                        setMessage({ message: e.target.value });
                    }}
                />
                {errors.message && (
                    <ErrorMessage>{errors.message}</ErrorMessage>
                )}
                <FormButton
                    onClick={() => {
                        if (!message.message) {
                            setErrors({ message: 'That field is required.' });
                        } else {
                            createMessage({
                                variables: {
                                    createMessageText: message.message,
                                    createMessageId: parseInt(user.id),
                                },
                            }).then(() => {
                                setMessage({ message: '' });
                            });
                        }
                    }}
                >
                    Add message
                </FormButton>
                {messages && messages.length > 0 && (
                    <ListWrapper>
                        {messages
                            .sort((a: Message, b: Message) => {
                                return (
                                    parseInt(b.createdAt) -
                                    parseInt(a.createdAt)
                                );
                            })
                            .map((item: Message) => {
                                return (
                                    <MessageItem
                                        key={item.id}
                                        message={item}
                                        onDelete={handleDelete}
                                    />
                                );
                            })}
                    </ListWrapper>
                )}
                {messages && !messages.length && (
                    <div>There are no messages</div>
                )}
            </CardWrapper>
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

export default MessageList;
