import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { api } from '@/utils/api';

export interface Service {
	id: number;
	name: string;
	description: string;
	photo: string;
	product: string;
}

export const serviceActions = {
	getAll: () => async (dispatch) => {
		try {
			const data = await api.get<Service[]>('/services');
			dispatch(setServices(data));
		} catch (err) {
			toast.error('Failed to fetch services');
			console.error(err);
		}
	},

	getById: (id: number) => async (dispatch) => {
		try {
			const data = await api.get<Service>(`/services/${id}`);
			dispatch(setCurrentService(data));
		} catch (err) {
			toast.error('Failed to fetch service');
			console.error(err);
		}
	},

	create: (data: Service) => async (dispatch) => new Promise((resolve, reject) => {
		try {
			api.post('/services', data)
				.then((res: Service) => {
					toast.success('Service created');
					dispatch(addService(res));
					resolve("");
				})
		} catch (err) {
			toast.error('Failed to create service');
			console.error(err);
			reject("")
		}
	}),

	update: (id: number, data: Service) => async (dispatch) => new Promise((resolve, reject) => {
		try {
			api.put('/services/' + id, data)
				.then((res: Service) => {
					toast.success('Service created');
					dispatch(updateService(res));
					resolve("");
				})
		} catch (err) {
			toast.error('Failed to create service');
			console.error(err);
			reject("")
		}
	}),

	remove: (id: number) => async (dispatch) => {
		try {
			await api.delete(`/services/${id}`);
			dispatch(deleteService(id));
			toast.success('Service deleted');
		} catch (err) {
			toast.error('Failed to delete service');
			console.error(err);
		}
	},
};

interface ServiceState {
	list: Service[];
	addFlag: boolean;
	editFlag: boolean,
	selected: number
}

const initialState: ServiceState = {
	list: [],
	addFlag: false,
	editFlag: false,
	selected: 0,
};

const serviceSlice = createSlice({
	name: 'services',
	initialState,
	reducers: {
		editServicePage: (state, { payload }) => {
			state.selected = payload
			state.editFlag = true
		},
		closeServicePage: (state) => {
			state.editFlag = false
			state.selected = 0
		},
		setServices: (state, action: PayloadAction<Service[]>) => {
			state.list = action.payload;
		},
		setCurrentService: (state, action: PayloadAction<Service | null>) => {
			state.current = action.payload;
		},
		addService: (state, action: PayloadAction<Service>) => {
			state.list.push(action.payload);
		},
		updateService: (state, action: PayloadAction<Service>) => {
			const index = state.list.findIndex(p => p.id === action.payload.id);
			if (index !== -1) {
				state.list[index] = action.payload;
				if (state.current?.id === action.payload.id) {
					state.current = action.payload;
				}
			}
		},
		deleteService: (state, action: PayloadAction<number>) => {
			state.list = state.list.filter(p => p.id !== action.payload);
			if (state.current?.id === action.payload) {
				state.current = null;
			}
		},
		clearCurrentService: (state) => {
			state.current = null;
		},
	},
});

// 👇 Custom action handlers using `api` and `dispatch`
export const {
	setServices,
	setCurrentService,
	addService,
	updateService,
	deleteService,
	clearCurrentService,
	closeServicePage,
	editServicePage
} = serviceSlice.actions;

export default serviceSlice.reducer;
