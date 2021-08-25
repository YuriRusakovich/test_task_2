import {createSlice, Dispatch} from "@reduxjs/toolkit";
import { api } from "../api";

const initialState: InitialState = {
    users: [],
    isLoading: false,
    fetchAllCalled: false,
    fetchOneCalled: false
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        startLoading: state => {
            state.isLoading = true;
        },
        usersSuccess: (state, actions) => {
            state.users = actions.payload.sort((a:User, b:User) => {
                return parseInt(a.id) - parseInt(b.id);
            });
            state.isLoading = false;
            state.fetchAllCalled = true;
        },
        userSuccess: (state, action) => {
            if (action.payload) {
                state.users.push(action.payload);
            }
            state.fetchOneCalled = true;
        },
        userUpdated: (state, action) => {
            const { id, rating } = action.payload;
            const existingUser = state.users.find((user) => user.id === id);
            if (existingUser) {
                existingUser.rating = rating;
            }
        },
        userDeleted: (state, action) => {
            state.users = state.users
                .filter(item => action.payload !== item.id);
        },
    },
});

export default slice.reducer;

const {
    usersSuccess,
    startLoading,
    userUpdated,
    userSuccess,
    userDeleted
} = slice.actions;

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

export const getUserById = (id: number) =>
    async (dispatch: Dispatch) => {
        try {
            await api.get(`/users/${id}`)
                .then((response) => {
                    return dispatch(userSuccess(response.data));
                });
        }
        catch (e) {
            return console.error(e.message);
        }
    };

export const updateUser = (id: number, rating: number) =>
    async (dispatch: Dispatch) => {
        try {
            await api.put(`/users/${id}`, {
                rating: rating
            })
                .then((response) => {
                    const data = {
                        id: response.data.result.id,
                        rating: response.data.result.rating
                    };
                    return dispatch(userUpdated(data));
                });
        }
        catch (e) {
            return console.error(e.message);
        }
    };

export const deleteUser = (id: number) =>
    async (dispatch: Dispatch) => {
        try {
            await api.delete(`/users/${id}`)
                .then((response) => {
                    return dispatch(userDeleted(response.data.result.id));
                });
        }
        catch (e) {
            return console.error(e.message);
        }
    };