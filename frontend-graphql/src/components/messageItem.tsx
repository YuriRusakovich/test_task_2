import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import { parseISO, fromUnixTime, getTime } from 'date-fns';

interface Props {
    message: Message;
}

const MessageWrapper = styled.div`
    margin: 20px 20px 0;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: whitesmoke;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    &:last-child {
        margin-bottom: 20px;
    }
`;

const MessageHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
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

const MessageItem: React.FC<Props> = ({ message }) => {
    const convertDate: (date: string) => string = (date: string) => {
        return format(
            new Date(getTime(parseInt(date))),
            'dd-LL-yyyy, HH:mm:ss',
        );
    };
    return (
        <MessageWrapper>
            <MessageHeader>
                <MessageImg src={message.user.photo} alt="" />
                <MessageSubHeader>
                    <div>{message.user.name}</div>
                    <MessageDate>
                        Created At: {convertDate(message.createdAt)}
                    </MessageDate>
                </MessageSubHeader>
            </MessageHeader>
            {message.text}
        </MessageWrapper>
    );
};

export default MessageItem;
