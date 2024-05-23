// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Update the URLs according to your fake store API documentation
const API_BASE_URL = 'http://localhost:3000';

export const signIn = createAsyncThunk('auth/signIn', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign in');
    }
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign up');
    }
    return data;
  } catch (error) {
    console.error('SignUp Error:', error.message);
    return rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async (details, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${details.token}`, // Assuming you use a token for auth
      },
      body: JSON.stringify(details),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user');
    }
    return data;
  } catch (error) {
    console.error('Update User Error:', error.message);
    return rejectWithValue(error.message);
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signout`, {
      method: 'POST',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to sign out');
    }
    return data;
  } catch (error) {
    console.error('SignOut Error:', error.message);
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
