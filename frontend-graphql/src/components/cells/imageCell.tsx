import React from 'react';
import { Cell } from 'react-table';
import styled from 'styled-components';

interface Props {
    cell: Cell;
}

const Img = styled.img`
    margin: 0 auto;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0 40px rgba(0, 0, 0, 0.08);
`;

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

const ImageCell: React.FC<Props> = ({ cell }) => {
    return (
        <TableCell {...cell.getCellProps()}>
            <Img src={cell.value} alt="" />
        </TableCell>
    );
};

export default ImageCell;
