import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../services/taskService';

export const getTasks = createAsyncThunk(
  'tasks/getAllTasks',
  async (task, { dispatch }) => {
    const res = await taskService.getAllTasks();
    console.log(res);
    dispatch(tasksReceived(res));
  }
);

export const myTasks = createAsyncThunk(
  'tasks/myTasks',
  async (task, { dispatch }) => {
    const res = await taskService.getMyTasks();
    dispatch(myTasksReceived(res));
  }
);

export const departmentTasks = createAsyncThunk(
  'tasks/departmentTasks',
  async (task, { dispatch }) => {
    const res = await taskService.getPendingTasks();
    dispatch(departmentTasksReceived(res));
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task, { dispatch }) => {
    console.log(task);
    const res = await taskService.createTask(task);
    dispatch(taskCreated(task));
    console.log(res);
  }
);
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, { dispatch }) => {
    console.log(task);
    const res = await taskService.updateTask(task);
    dispatch(taskUpdated(task));
    console.log(res);
    return res;
  }
);
export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (taskId, { dispatch }) => {
    console.log(taskId);
    const res = await taskService.completeTask(taskId);
    dispatch(taskCompleted(res));
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { dispatch }) => {
    const res = await taskService.deleteTask(taskId);
    dispatch(taskDeleted(res));
    console.log(res);
  }
);

export const rejectTask = createAsyncThunk(
  'tasks/rejectTask',
  async (taskId, { dispatch }) => {
    const res = await taskService.rejectTask(taskId);
    dispatch(taskRejected(res));
  }
);

const slice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    myTasksReceived: (tasks, action) => {
      tasks.list = action.payload;
      tasks.loading = false;
    },
    departmentTasksReceived: (tasks, action) => {
      tasks.list = action.payload;
      tasks.loading = false;
    },
    taskUpdated: (tasks, action) => {
      const index = tasks.list.findIndex(
        (task) => task.id === action.payload.id
      );
      tasks.list[index] = action.payload;
    },
    taskCompleted: (tasks, action) => {
      const index = tasks.list.findIndex(
        (task) => task.id === action.payload.id
      );
      tasks.list[index] = action.payload;
    },
    taskDeleted: (tasks, action) => {
      tasks.list = tasks.list.filter((task) => task.id !== action.payload);
      tasks.loading = false;
    },
    taskCreated: (tasks, action) => {
      tasks.list.push(action.payload);
      tasks.loading = false;
    },
    tasksReceived: (tasks, action) => {
      tasks.list = action.payload;
      tasks.loading = false;
    },

    taskRejected: (tasks, action) => {
      const index = tasks.list.findIndex(
        (task) => task.id === action.payload.id
      );
      tasks.list[index] = action.payload;
      tasks.loading = false;
    },
    tasksRequestFailed: (tasks, action) => {
      tasks.loading = false;
    },
  },
  // extraReducers: {
  //   [getTasks.pending]: (tasks) => {
  //     tasks.loading = true;
  //   },
  //   [getTasks.fulfilled]: (tasks, { payload }) => {
  //     tasks.loading = false;
  //     // tasks.list = payload;
  //     console.log(payload);
  //   },
  //   [getTasks.rejected]: (tasks) => {
  //     tasks.loading = false;
  //   },
  // },
});

const {
  myTasksReceived,
  departmentTasksReceived,
  taskCreated,
  tasksReceived,
  taskUpdated,
  taskCompleted,
  taskDeleted,
  taskRejected,
  tasksRequestFailed,
} = slice.actions;
export default slice.reducer;

// export const getAllTasks = () =>
//   apiCallBegan({
//     url: "/task",
//     onStart: taskRequested.type,
//     onSuccess: tasksReceived.type,
//     onError: tasksRequestFailed.type,
//     headers: {
//       Authorization: `Bearer ${
//         JSON.parse(localStorage.getItem("auth")).jwtToken
//       }`,
//     },
//   });
