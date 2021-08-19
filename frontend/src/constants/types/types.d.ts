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
    photoUrl: string,
    name: string,
    login: string,
    email: string,
    phone: string,
    rating?: number
}