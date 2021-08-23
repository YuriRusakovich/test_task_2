import React from "react";
import { Cell } from "react-table";

interface Props {
    cell: Cell
}

const ImageCell: React.FC<Props> = ({cell}) => {
    return(<td {...cell.getCellProps()}>
        <img
            src={cell.value}
            alt=''
        />
    </td>);
};

export default ImageCell;