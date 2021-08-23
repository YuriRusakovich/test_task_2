import React from "react";
import { Cell } from "react-table";

interface Props {
    cell: Cell
}

const DefaultCell: React.FC<Props> = ({cell}) => {
    return(<td {...cell.getCellProps()}>
        {cell.render('Cell')}
    </td>);
};

export default DefaultCell;