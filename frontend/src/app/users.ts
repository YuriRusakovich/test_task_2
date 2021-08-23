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
        await api.get('/users')
            .then((response) => {
                return dispatch(usersSuccess(response.data));
            });
    }
    catch (e) {
        return console.error(e.message);
    }
};