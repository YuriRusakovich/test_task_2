import React from "react";
import styled, { css } from "styled-components";
import RatingCounter from "@components/ratingCounter";

interface Props {
    user: User;
}

const CardWrapper = styled.div`
    overflow: hidden;
    padding: 0 0 32px;
    margin: 48px auto 0;
    width: 500px;
    font-family: Quicksand, arial, sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, .05), 0 0px 40px rgba(0, 0, 0, .08);
    border-radius: 5px;
`;

const CardHeader = styled.header`
    padding: 32px 30px 0;
    display: flex;
    justify-content: space-between;
`;

const CardHeading = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const CardImage = styled.img`
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, .05), 0 0px 40px rgba(0, 0, 0, .08);
`;

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const CardRow = styled.div`
    font-size: 14px;
    padding: 5px 0;
`;

const CardRowContent = styled.span`
    font-size: 14px;  
    width: 50%;
    &:first-child {
      margin-right: 10px;
    }

    ${(props:SpanProps) => props.bold && css`
        font-weight: bold;
    `}
`;

const CardBody = styled.div`
    padding: 10px 30px;
`;

const CardRating = styled.div`
    display: flex;
    justify-content: center;
`;

const UserCard: React.FC<Props> = ({user}) => {
    return(
        <CardWrapper>
            <CardHeader>
                <CardImage src={user.large_photo} alt=""/>
                <CardContent>
                    <CardHeading>{user.name}</CardHeading>
                    <CardRow>
                        <CardRowContent bold>
                            Login:
                        </CardRowContent>
                        <CardRowContent>
                            {user.login}
                        </CardRowContent>
                    </CardRow>
                </CardContent>
            </CardHeader>
            <CardBody>
                <CardHeading>
                    Contacts
                </CardHeading>
                <CardRow>
                    <CardRowContent bold>
                        Email:
                    </CardRowContent>
                    <CardRowContent>
                        {user.email}
                    </CardRowContent>
                </CardRow>
                <CardRow>
                    <CardRowContent bold>
                        Phone:
                    </CardRowContent>
                    <CardRowContent>
                        {user.phone}
                    </CardRowContent>
                </CardRow>
                <CardHeading>
                    Rating
                </CardHeading>
                <CardRating>
                    <RatingCounter user={user}/>
                </CardRating>
            </CardBody>
        </CardWrapper>
    );
};

export default UserCard;