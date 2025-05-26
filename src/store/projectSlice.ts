import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { api } from '@/utils/api';
import { boolean } from 'zod';
import { useNavigate } from 'react-router-dom';

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  client: string;
  skills: string[];
  photos: string[];
  video?: string;
  clientPublic: boolean;
}

export const projectActions = {
  getAll: () => async (dispatch) => {
    try {
      const data = await api.get<Project[]>('/projects');
      dispatch(setProjects(data));
    } catch (err) {
      toast.error('Failed to fetch projects');
      console.error(err);
    }
  },

  getById: (id: number) => async (dispatch) => {
    try {
      const data = await api.get<Project>(`/projects/${id}`);
      dispatch(setCurrentProject(data));
    } catch (err) {
      toast.error('Failed to fetch project');
      console.error(err);
    }
  },

  create: data => async (dispatch) => new Promise((resolve, reject) => {
    try {
      api.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res: Project) => {
          toast.success('Project created');
          dispatch(addProject(res));
          resolve("");
        })
    } catch (err) {
      toast.error('Failed to create project');
      console.error(err);
      reject("")
    }
  }),

  update: (id: number, data: FormData) => async (dispatch) => new Promise((resolve, reject) => {
      try {
        api.put('/projects/' + id, data, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then((res: Project) => {
            toast.success('Project created');
            dispatch(addProject(res));
            resolve("");
          })
      } catch (err) {
        toast.error('Failed to create project');
        console.error(err);
        reject("")
      }
  }),

  remove: (id: number) => async (dispatch) => {
    try {
      await api.delete(`/projects/${id}`);
      dispatch(deleteProject(id));
      toast.success('Project deleted');
    } catch (err) {
      toast.error('Failed to delete project');
      console.error(err);
    }
  },
};

interface ProjectState {
  list: Project[];
  current: Project | null;
  editFlag: boolean,
  selected: number
}

const initialState: ProjectState = {
  list: [],
  current: null,
  editFlag: false,
  selected: 0,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    editProjetPage: (state, { payload }) => {
      state.selected = payload
      state.editFlag = true
    },
    closeProjetPage: (state) => {
      state.editFlag = false
      state.selected = 0
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.list = action.payload;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.current = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.list.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        if (state.current?.id === action.payload.id) {
          state.current = action.payload;
        }
      }
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(p => p.id !== action.payload);
      if (state.current?.id === action.payload) {
        state.current = null;
      }
    },
    clearCurrentProject: (state) => {
      state.current = null;
    },
  },
});

// 👇 Custom action handlers using `api` and `dispatch`
export const {
  setProjects,
  setCurrentProject,
  addProject,
  updateProject,
  deleteProject,
  clearCurrentProject,
  closeProjetPage,
  editProjetPage
} = projectSlice.actions;

export default projectSlice.reducer;
