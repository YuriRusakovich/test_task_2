import React, { useEffect } from "react";
import UserCard from "@components/userCard";
import {Redirect, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/rootReducer";
import { getUserById } from "@redux/users";

const User: React.FC = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const userId = pathname.replace("/user/", "");

    const { users, fetchOneCalled } = useSelector((state:RootState) => state.users);

    const user = users.find((item) => item.id.toString() === userId);

    useEffect(() => {
        if (!user) {
            dispatch(getUserById(parseInt(userId)));
        }
    }, [user, userId, dispatch]);


    return(
        <>
            {user && <UserCard user={user} />}
            {!user && fetchOneCalled && <Redirect to='/404' />}
        </>
    );
};

export default User;