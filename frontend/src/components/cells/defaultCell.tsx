import React from "react";
import { Cell } from "react-table";
import styled from "styled-components";

interface Props {
    cell: Cell
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

const DefaultCell: React.FC<Props> = ({cell}) => {
    return(<TableCell {...cell.getCellProps()}>
        {cell.render('Cell')}
    </TableCell>);
};

export default DefaultCell;