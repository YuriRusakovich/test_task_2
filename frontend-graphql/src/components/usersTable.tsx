import React from 'react';
import styled, { css } from 'styled-components';
import { useTable, useSortBy, Row, useFilters } from 'react-table';
import ImageCell from '@components/cells/imageCell';
import DefaultCell from '@components/cells/defaultCell';
import LinkCell from '@components/cells/linkCell';
import RatingCell from '@components/cells/ratingCell';
import {
    ArrowSortedUp,
    ArrowSortedDown,
    ArrowUnsorted,
} from '@styled-icons/typicons';

interface Props {
    users: User[];
    title: string;
}

const PageWrapper = styled.div`
    padding: 1rem;
`;

const MainTable = styled.table`
    border-spacing: 0;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 5px;
`;

const TableHeader = styled.th`
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    text-align: center;

    :last-child {
        border-right: 0;
    }
`;

const TableSort = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
`;

const TableSortUp = styled(ArrowSortedUp)`
    color: burlywood;
    width: 20px;
    height: 20px;
    margin-left: 10px;
`;

const TableSortDown = styled(ArrowSortedDown)`
    color: burlywood;
    width: 20px;
    height: 20px;
    margin-left: 10px;
`;

const TableUnsorted = styled(ArrowUnsorted)`
    color: burlywood;
    width: 20px;
    height: 20px;
    margin-left: 10px;
`;

const TableRow = styled.tr`
    ${(props: TableRowProps) =>
        props.rating &&
        css`
            background: antiquewhite;
        `}

    :last-child {
        td {
            border-bottom: 0;
        }
    }
`;

function DefaultColumnFilter(
    columnFilterOptions: ColumnFilterOptions,
): JSX.Element {
    return (
        <input
            value={columnFilterOptions.column.filterValue || ''}
            onChange={(e) => {
                e.preventDefault();
                columnFilterOptions.column.setFilter(
                    e.target.value || undefined,
                );
            }}
            placeholder={`Search records...`}
        />
    );
}

function Table({ columns, data }: TableOptions): JSX.Element {
    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable(
            {
                columns,
                data,
                defaultColumn,
                autoResetFilters: false,
                autoResetSortBy: false,
            },
            useFilters,
            useSortBy,
        );

    return (
        <>
            <MainTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableHeader {...column.getHeaderProps()}>
                                    <TableSort
                                        {...column.getSortByToggleProps()}
                                        data-testid={`${column.id}-sort`}
                                    >
                                        {column.render('Header')}
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TableSortDown />
                                            ) : (
                                                <TableSortUp />
                                            )
                                        ) : column.canSort ? (
                                            <TableUnsorted />
                                        ) : (
                                            ''
                                        )}
                                    </TableSort>
                                    <div data-testid={`${column.id}-filter`}>
                                        {column.canFilter
                                            ? column.render('Filter')
                                            : null}
                                    </div>
                                </TableHeader>
                            ))}
                        </TableRow>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: Row) => {
                        prepareRow(row);
                        const user = row.original as User;
                        return (
                            <TableRow
                                {...row.getRowProps()}
                                rating={user.rating && user.rating <= -3}
                            >
                                {row.cells.map((cell) => {
                                    if (cell.column.Header === 'Photo') {
                                        return (
                                            <ImageCell
                                                cell={cell}
                                                key={cell.value}
                                            />
                                        );
                                    }
                                    if (cell.column.Header === 'Name') {
                                        return (
                                            <LinkCell
                                                cell={cell}
                                                user={row.original as User}
                                                key={cell.value}
                                            />
                                        );
                                    }
                                    if (cell.column.Header === 'Rating') {
                                        return (
                                            <RatingCell
                                                cell={cell}
                                                user={row.original as User}
                                                key={cell.value}
                                            />
                                        );
                                    }
                                    return (
                                        <DefaultCell
                                            cell={cell}
                                            key={cell.value}
                                        />
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </tbody>
            </MainTable>
        </>
    );
}

const UserTable: React.FC<Props> = ({ users, title }) => {
    const numberSort = React.useMemo(
        () => (rowA: Row, rowB: Row, columnId: string) => {
            const a = parseFloat(rowA.values[columnId]);
            const b = parseFloat(rowB.values[columnId]);
            return a > b ? 1 : -1;
        },
        [],
    );

    const columns = React.useMemo(
        () => [
            {
                Header: title,
                columns: [
                    {
                        Header: 'Photo',
                        accessor: 'photo',
                        disableSortBy: true,
                        disableFilters: true,
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Login',
                        accessor: 'login',
                    },
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Phone',
                        accessor: 'phone',
                    },
                    {
                        Header: 'Rating',
                        accessor: 'rating',
                        sortType: numberSort,
                    },
                ],
            },
        ],
        [numberSort, title],
    );

    return (
        <PageWrapper>
            <Table columns={columns} data={users} />
        </PageWrapper>
    );
};

export default UserTable;
