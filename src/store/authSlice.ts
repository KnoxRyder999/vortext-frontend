import { createSlice } from '@reduxjs/toolkit';
import { api } from '@/utils/api';
import { closeModalSlice } from './userModalSlice';
import { toast } from 'sonner';

export interface LogData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string; // typically this will be a URL returned from the backend
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  avatar?: File | null;
}

export const userApi = {
  getAll: () => api.get<User[]>('/users'),
  getById: (id: number) => api.get<User>(`/users/${id}`),
  register: data => dispatch => {
    try {
      const formData = new FormData();
      for (let key in data) formData.append(key, data[key])
      api.post('/users/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => {
          toast.success("Register successfully!")
          localStorage.setItem('token', res['token'])
          dispatch(login(res['user']))
          dispatch(closeModalSlice())
        })
        .catch(err => {
          toast.error("err")
        })
    } catch (e) {
      console.log(e);
    }
  },
  login: (data: CreateUserPayload) => async (dispatch) => {
    try {
      api.post('/users/login', data)
        .then(res => {
          localStorage.setItem('token', res['token'])
          toast.success("Logged in successfully!")
          dispatch(login(res['user']))
          dispatch(closeModalSlice())
        })
        .catch(err => {
          toast.error(err.message)
        })
    } catch (e) {
      console.log(e);
    }
  },
  update: (id: number, data: Partial<CreateUserPayload>) => dispatch => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.email) formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    if (data.avatar) formData.append('avatar', data.avatar);

    dispatch(closeModalSlice());
    return api.put<User>(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  delete: (id: number) => api.delete<void>(`/users/${id}`),
};


export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      window.localStorage.removeItem('token')
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
