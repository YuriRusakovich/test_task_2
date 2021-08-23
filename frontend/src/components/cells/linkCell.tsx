import React from "react";
import { Cell } from "react-table";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface Props {
    cell: Cell,
    user: User
}

const Styles = styled.div`    
  a {
    text-decoration: none;
    color: darkblue;
  }
`;

const LinkCell: React.FC<Props> = ({cell, user}) => {
    return(<td {...cell.getCellProps()}>
        <Styles>
            <Link to={{
                pathname: `/user/${user.id}`,
                state: { user: user }

            }}>
                {cell.value}
            </Link>
        </Styles>
    </td>);
};

export default LinkCell;