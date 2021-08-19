import {createSlice, Dispatch} from "@reduxjs/toolkit";
import { api } from "../api";

const slice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        isLoading: false,
    },
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        usersSuccess: (state, actions) => {
            state.users = actions.payload;
            state.isLoading = false;
        },
    },
});

export default slice.reducer;

const { usersSuccess, startLoading } = slice.actions;

export const fetchUsers = () => async (dispatch: Dispatch) => {
    dispatch(startLoading());
    try {
        await api.get(
            '/api/?results=25&seed=abc&inc=name,' +
            'login,email,phone,id,picture')
            .then((response) => {
                const users: User[] = response.data.results.map((item: any) => {
                    return {
                        id: item.id.value,
                        photoUrl: item.picture.thumbnail,
                        name: `${item.name.first} ${item.name.last}`,
                        login: item.login.username,
                        email: item.email,
                        phone: item.phone,
                        rating: 0
                    };
                });
                return dispatch(usersSuccess(users));
            });
    }
    catch (e) {
        return console.error(e.message);
    }
};