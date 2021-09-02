import React from 'react';
import { Cell } from 'react-table';
import RatingCounter from '@components/ratingCounter';
import styled from 'styled-components';

interface Props {
    cell: Cell;
    user: User;
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
`;

const RatingCell: React.FC<Props> = ({ cell, user }) => {
    return (
        <TableCell {...cell.getCellProps()}>
            <RatingCounter user={user} />
        </TableCell>
    );
};

export default RatingCell;
