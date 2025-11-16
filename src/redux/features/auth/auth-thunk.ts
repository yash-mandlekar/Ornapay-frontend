import { createAsyncThunk } from "@reduxjs/toolkit";

// export const asyncSendOtpThunk = createAsyncThunk<
//   { user: User; token: string },
//   { name: string; email: string; password: string },
//   { rejectValue: string }
// >("auth/sendOtp", async (credentials, { rejectWithValue }) => {
//   try {
//     const res = await apiClient.post("/api/auth/sendOtp", credentials);
//     return res.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || "Send Otp failed");
//   }
// });

// export const asyncSignupThunk = createAsyncThunk<
//   { user: User; token: string },
//   { name: string; email: string; password: string },
//   { rejectValue: string }
// >("auth/signupUser", async (credentials, { rejectWithValue }) => {
//   try {
//     const res = await apiClient.post("/api/auth/signup", credentials);
//     return res.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || "Signup failed");
//   }
// });

// export const asyncSignupThunk = createAsyncThunk<
//   { user: User; token: string },
//   { name: string; email: string; password: string },
//   { rejectValue: string }
// >("auth/signupUser", async (credentials, { rejectWithValue }) => {
//   try {
//     const res = await apiClient.post("/api/auth/signup", credentials);
//     return res.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || "Signup failed");
//   }
// });