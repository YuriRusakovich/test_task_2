interface TableOptions {
    columns: any;
    data: any;
}

interface ColumnOptions {
    filterValue: string;
    setFilter: Function;
}

interface ColumnFilterOptions {
    column: ColumnOptions;
}

interface User {
    id: string;
    photo: string;
    name: string;
    login: string;
    email: string;
    phone: string;
    rating: number;
    large_photo?: string;
    messages?: Message[];
}

interface Message {
    id: string;
    text: string;
    createdAt: string;
    owner: {
        id: string;
    };
    user: {
        id: string;
        name: string;
        photo: string;
    };
}

interface SpanProps {
    bold?: boolean;
}

interface TableRowProps {
    rating?: boolean | undefined | 0;
}

interface BackgroundProps {
    show: boolean;
}
