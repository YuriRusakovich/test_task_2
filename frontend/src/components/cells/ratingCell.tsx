import React from "react";
import { Cell } from "react-table";
import RatingCounter from "@components/ratingCounter";

interface Props {
    cell: Cell,
    user: User
}

const RatingCell: React.FC<Props> = ({cell, user}) => {
    return(<td {...cell.getCellProps()}>
        <RatingCounter user={user} />
    </td>);
};

export default RatingCell;