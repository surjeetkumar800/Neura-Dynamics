import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/* ---------------- MOCK DATA ---------------- */

const mockTasks = [
  {
    id: '1',
    title: 'Complete React assignment',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review Redux Toolkit documentation',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Build responsive UI components',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Write unit tests',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Setup project structure',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
];

/* ---------------- MOCK API DELAY ---------------- */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------------- ASYNC THUNKS ---------------- */

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    await delay(500);
    return mockTasks;
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (title) => {
    await delay(300);
    return {
      id: Date.now().toString(),
      title,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, title }) => {
    await delay(300);
    return { id, title };
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id) => {
    await delay(300);
    return id;
  }
);

export const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleStatus',
  async (id) => {
    await delay(200);
    return id;
  }
);

/* ---------------- INITIAL STATE ---------------- */

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all', // all | pending | completed
  searchQuery: '',
};

/* ---------------- SLICE ---------------- */

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })

      // Add task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state.tasks.find(
          (t) => t.id === action.payload.id
        );
        if (task) {
          task.title = action.payload.title;
        }
      })

      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(
          (t) => t.id !== action.payload
        );
      })

      // Toggle status
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const task = state.tasks.find(
          (t) => t.id === action.payload
        );
        if (task) {
          task.status =
            task.status === 'pending' ? 'completed' : 'pending';
        }
      });
  },
});

export const { setFilter, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
