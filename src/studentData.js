import { createSlice, configureStore } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "students",
    initialState: [],
    reducers: {
        setStudents: (state, action) => {
            return action.payload;
        },
    },
});

export const { setStudents } = studentSlice.actions;

const store = configureStore({
    reducer: {
        students: studentSlice.reducer,
    },
});

export default store;