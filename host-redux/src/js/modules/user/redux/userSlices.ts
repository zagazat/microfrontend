import { createSlice } from '@reduxjs/toolkit';

type UserState = {};

const initialState: UserState = {};

const userSlices = createSlice({
	name: 'userSlices',
	initialState,
	reducers: {}
});

export const userActions = userSlices.actions;

export const userReducers = userSlices.reducer;