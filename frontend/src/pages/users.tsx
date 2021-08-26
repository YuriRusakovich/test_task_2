import React, { useEffect } from "react";
import UserTable from "@components/usersTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxStore/rootReducer";
import { fetchUsers } from "@reduxStore/users";

const Users: React.FC = () => {
    const dispatch = useDispatch();
    const { users, isLoading, fetchAllCalled } =
        useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (!users.length || !fetchAllCalled) {
            dispatch(fetchUsers());
        }
    }, [users, dispatch, fetchAllCalled]);

    return(<UserTable title='Users' users={users} isLoading={isLoading}/>);
};

export default Users;