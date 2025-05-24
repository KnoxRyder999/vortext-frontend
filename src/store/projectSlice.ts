import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { api } from '@/utils/api';

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  client: string;
  skills: string[];
  photos: string[];
  video?: string;
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

  create: (data: Partial<Project>) => async (dispatch) => {
    try {
      const res = await api.post<Project>('/projects', data);
      dispatch(addProject(res));
      toast.success('Project created');
    } catch (err) {
      toast.error('Failed to create project');
      console.error(err);
    }
  },

  update: (id: number, data: Partial<Project>) => async (dispatch) => {
    try {
      const res = await api.put<Project>(`/projects/${id}`, data);
      dispatch(updateProject(res));
      toast.success('Project updated');
    } catch (err) {
      toast.error('Failed to update project');
      console.error(err);
    }
  },

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
  flag: string,
  selected: number,
  showModal: boolean
}

const initialState: ProjectState = {
  list: [],
  current: null,
  flag: "add",
  selected: 0,
  showModal: false
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    showProjetModal: (state, { payload }) => {
      const { flag, selected } = payload
      state.selected = selected
      state.flag = flag
      state.showModal = true
    },
    closeProjetModal: (state, { payload }) => {
      state.showModal = false
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
  showProjetModal,
  closeProjetModal
} = projectSlice.actions;

export default projectSlice.reducer;
