import React from "react";
import UserCard from "@components/userCard";
import { useLocation } from "react-router-dom";

const User: React.FC = () => {
    const { state } = useLocation<LocationUserState>();
    return(<UserCard user={state.user} />);
};

export default User;