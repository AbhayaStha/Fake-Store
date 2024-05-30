import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clearOrders } from './ordersSlice';

const API_BASE_URL = 'http://192.168.1.108:3000';

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${details.token}`,
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

export const signOut = createAsyncThunk('auth/signOut', async (_, { dispatch }) => {
  try {
    dispatch(resetAuthState());
    dispatch(clearOrders());
  } catch (error) {
    console.error('SignOut Error:', error.message);
  }
});

export const resetAuthState = () => {
  return {
    type: 'auth/resetAuthState',
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    status: 'idle',
    isLoggedIn: false,
  },
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.status = 'idle';
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.status === 'OK') {
          state.user = action.payload;
          state.token = action.payload.token;
          state.error = null;
          state.isLoggedIn = true;
        } else {
          state.error = 'Failed to sign in';
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.status === 'OK') {
          state.user = action.payload;
          state.token = action.payload.token;
          state.error = null;
          state.isLoggedIn = true;
        } else {
          state.error = 'Failed to sign up';
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'idle';  // Set status to idle after successful update
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
        state.status = 'idle';
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
