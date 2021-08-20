import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useTable, useSortBy, Row, useFilters } from 'react-table';
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@redux/users";
import { RootState } from "@redux/rootReducer";

const Styles = styled.div`
  padding: 1rem;
  
  .errorContainer {
    margin: 0 auto;
    display: table;
  }
  
  img {
    margin: 0 auto;
    display: flex;
  }

  table {
    border-spacing: 0;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 5px;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      text-align: center;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function DefaultColumnFilter(
    columnFilterOptions: ColumnFilterOptions
): JSX.Element {
    return (
        <input
            value={columnFilterOptions.column.filterValue || ''}
            onChange={e => {
                e.preventDefault();
                columnFilterOptions.column
                    .setFilter(e.target.value || undefined);
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
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useSortBy
    );

    const firstPageRows = rows.slice(0, 20);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div {...column
                                        .getSortByToggleProps()}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </div>
                                    <div>
                                        {column.canFilter ?
                                            column.render('Filter') :
                                            null}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map(
                        (row:Row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        if (cell.column.Header === 'Photo') {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    <img
                                                        src={cell.value}
                                                        alt=''
                                                    />
                                                </td>
                                            );
                                        }
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );}
                    )}
                </tbody>
            </table>
        </>
    );
}

function UserTable(): JSX.Element {
    const dispatch = useDispatch();
    const { users, isLoading } = useSelector((state: RootState) =>
        state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Users',
                columns: [
                    {
                        Header: 'Photo',
                        accessor: 'photo',
                        disableSortBy: true,
                        disableFilters: true
                    },
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Login',
                        accessor: 'login'
                    },
                    {
                        Header: 'Email',
                        accessor: 'email'
                    },
                    {
                        Header: 'Phone',
                        accessor: 'phone'
                    },
                    {
                        Header: 'Rating',
                        accessor: 'rating'
                    },
                ],
            },
        ],
        []
    );

    return (
        <Styles>
            {isLoading && <div className="errorContainer">Loading... </div>}
            {!isLoading && <Table columns={columns} data={users} />}
        </Styles>
    );
}

export default UserTable;
