import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { getTime } from 'date-fns';
import { useMutation } from 'react-apollo';
import { deleteMessageMutation } from '@constants/mutations/deleteMessageMutation';
import { userQuery } from '@constants/queries/userQuery';
import { Trash } from '@styled-icons/typicons';
import ErrorModal from '@components/modals/errorModal';

interface Props {
    message: Message;
    onDelete: Function;
}

const MessageWrapper = styled.div`
    margin: 20px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: whitesmoke;
    box-shadow: 0 8px 15px rgba(219, 161, 103, 0.3);
    border-radius: 10px;
`;

const MessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 5px;
`;

const MessageSubHeader = styled.div`
    display: flex;
    flex-direction: column;
`;

const MessageImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 10px;
    margin-right: 10px;
`;

const MessageDate = styled.div`
    font-weight: normal;
    font-size: 12px;
    color: gray;
`;

const DeleteMessage = styled(Trash)`
    width: 30px;
    height: 30px;
    color: black;
    cursor: pointer;
    &:hover {
        transform: translateY(-1px);
    }
`;

const MessageHeaderWithImage = styled.div`
    display: flex;
    align-items: center;
`;

const MessageItem: React.FC<Props> = ({ message, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [deleteMessage, { error }] = useMutation(deleteMessageMutation, {
        update(cache) {
            try {
                const data: { user: User } | null = cache.readQuery({
                    query: userQuery,
                    variables: { userId: parseInt(message.owner.id) },
                });
                if (data && data.user) {
                    data.user.messages = data.user.messages?.filter(
                        (g) => message.id !== g.id,
                    );
                    cache.writeQuery({
                        query: userQuery,
                        variables: { userId: parseInt(message.owner.id) },
                        data,
                    });
                }
            } catch {}
        },
    });

    useEffect(() => {
        if (error) {
            setShowModal(true);
        }
    }, [error, setShowModal]);

    const convertDate: (date: string) => string = (date: string) => {
        return format(
            new Date(getTime(parseInt(date))),
            'dd-LL-yyyy, HH:mm:ss',
        );
    };

    const closeModal: () => void = () => {
        setShowModal(false);
    };

    return (
        <>
            <MessageWrapper>
                <MessageHeader>
                    <MessageHeaderWithImage>
                        <MessageImg src={message.user.photo} alt="" />
                        <MessageSubHeader>
                            <div>{message.user.name}</div>
                            <MessageDate>
                                Created At: {convertDate(message.createdAt)}
                            </MessageDate>
                        </MessageSubHeader>
                    </MessageHeaderWithImage>
                    <DeleteMessage
                        onClick={(event) => {
                            event.preventDefault();
                            deleteMessage({
                                variables: { deleteMessageId: message.id },
                            }).then(() => {
                                onDelete();
                            });
                        }}
                    />
                </MessageHeader>
                {message.text}
            </MessageWrapper>
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

export default MessageItem;
