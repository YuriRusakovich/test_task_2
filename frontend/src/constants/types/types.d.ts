interface TableOptions {
    columns: any,
    data: any,
}

interface ColumnOptions {
    filterValue: string,
    setFilter: Function
}

interface ColumnFilterOptions {
    column: ColumnOptions
}

interface User {
    id: string,
    photo: string,
    name: string,
    login: string,
    email: string,
    phone: string,
    rating?: number,
    large_photo?: string
}

interface LocationUserState { user: User }

interface SpanProps {
    bold?: boolean
}

interface TrProps {
    rating?: boolean | undefined | 0;
}