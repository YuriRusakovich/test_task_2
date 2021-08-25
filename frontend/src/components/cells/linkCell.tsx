import React from "react";
import { Cell } from "react-table";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
    cell: Cell,
    user: User
}

const TableCell = styled.td`
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;
  
    :last-child {
        border-right: 0;
    }

    a {
        text-decoration: none;
        color: sandybrown;
        :hover {
            color: burlywood;
        }
    }
`;


const LinkCell: React.FC<Props> = ({cell, user}) => {
    return(<TableCell {...cell.getCellProps()}>
        <Link to={{
            pathname: `/user/${user.id}`,
            state: { user: user }
        }}>
            {cell.value}
        </Link>
    </TableCell>);
};

export default LinkCell;