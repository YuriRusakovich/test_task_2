import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { UserDelete } from "@styled-icons/typicons";
import { deleteUser } from "@redux/users";
import { useHistory } from "react-router-dom";

interface Props {
    user: User;
}

const DeleteButton = styled(UserDelete)`
    color: burlywood;
    width: 25px;
    height: 25px;
    cursor: pointer;

    :hover {
        color: sandybrown;
    }
`;

const DeleteUserButton: React.FC<Props> = ({user}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteUserById: () => void = () => {
        dispatch(deleteUser(parseInt(user.id)));
        history.push('/users');
    };

    return(<DeleteButton onClick={deleteUserById} />);
};

export default DeleteUserButton;