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
  getAdmin: () => dispatch => api.get<User[]>('/users')  //get all admin to show out team.
    .then(res => dispatch(adminListSlice(res)))
    .catch(err => console.log(err))
  ,
  getById: (id: number) => api.get<User>(`/users/${id}`),
  register: (data: User) => dispatch => {
    try {
      api.post('/users/register', data)
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
  update: (id: number, data) => dispatch => {
    api.put<User>(`/users/${id}`, data)
      .then(res => {
        dispatch(login(res))
        dispatch(closeModalSlice());
      })
      .catch(err => {
        console.log(err);
        alert(JSON.stringify(err.response.data))
      })
  },

  delete: (id: number) => api.delete<void>(`/users/${id}`),
};


export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    adminList: []
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      if(confirm("Are you really going to log out?")) {
        window.localStorage.removeItem('token')
        state.isLoggedIn = false;
        state.user = null;
      }
    },
    adminListSlice: (state, { payload }) => {
      state.adminList = payload
    }
  },
});

export const { login, logout, adminListSlice } = slice.actions;
export default slice.reducer;
