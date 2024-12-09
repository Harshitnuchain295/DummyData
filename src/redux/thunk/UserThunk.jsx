import { createAsyncThunk } from '@reduxjs/toolkit'
import React from 'react'
import { axiosInstance } from '../../utils/AxiosInstance'



export const LoginData=createAsyncThunk(
    "user/getdata",
    async(data,{ rejectWithValue })=>{
        try {
            const res=await axiosInstance.post('/user/login/',data)
            // console.log(res.data);
            return res.data
        } catch (error) {
            return  rejectWithValue(error)
        }
    }
)
