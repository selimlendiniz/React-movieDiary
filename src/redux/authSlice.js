import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser} from "firebase/auth";
import {auth} from "../config/firebase";

const initialState = {
    name:'',
    email:'',
    password:'',

    isLoading:false,
    error:null
};

export const register =  createAsyncThunk("auth/register", async ({name,email,password},{rejectWithValue}) => {
    try {
        await createUserWithEmailAndPassword(auth,email,password);
        await updateCurrentUser(auth,{displayName:name});
    }catch (e) {
        return rejectWithValue(e.code)
    }

})

export const login =  createAsyncThunk("auth/login", async ({email,password},{rejectWithValue}) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    }catch (e) {
        return rejectWithValue(e.code)
    }

})

const authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        changeName:(state,action) => {
            state.name = action.payload;
        },
        changeEmail:(state,action) => {
            state.email = action.payload;
        },
        changePassword:(state,action) => {
            state.password = action.payload;
        },


    },
    extraReducers:builder => {
        builder
            .addCase(register.pending,state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled,state => {
                state.isLoading = false;
            })
            .addCase(register.rejected,(state,action) => {
            state.error = action.payload;
                state.isLoading = false;
            })
            .addCase(login.pending,state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled,state => {
                state.isLoading = false;
            }).addCase(login.rejected,(state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        })
    }
})

export const {changeName,changeEmail,changePassword} = authSlice.actions;

export default authSlice.reducer;