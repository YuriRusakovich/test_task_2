import React, { useEffect } from "react";
import UserTable from "@components/usersTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxStore/rootReducer";
import { fetchUsers } from "@reduxStore/users";

const Leaders: React.FC = () => {
    const dispatch = useDispatch();
    const { users, isLoading, fetchAllCalled } =
        useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!users.length || !fetchAllCalled) {
            dispatch(fetchUsers());
        }
    }, [users, dispatch, fetchAllCalled]);

    let leaders:User[] = [...users].sort((a:User, b:User) => {
        if (a.rating === b.rating) {
            return a.name > b.name ? 1 : -1;
        }
        return b.rating - a.rating;
    });

    if (leaders.length >= 5) {
        leaders = [...leaders].slice(0, 5);
    }

    return(<UserTable
        title='Leaders'
        users={leaders}
        isLoading={isLoading}/>);
};

export default Leaders;