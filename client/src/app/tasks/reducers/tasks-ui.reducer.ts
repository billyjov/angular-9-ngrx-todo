import { createReducer, on } from '@ngrx/store';

import { TasksUIState } from '../states';
import * as TasksUIActions from '../actions/tasks-ui.actions';


export const initialState: TasksUIState = {
  loadingTasks: false,
  errorLoadingTasks: null,
  loadingAddTask: false,
  errorAddTask: null,
  loadingUpdateTask: false,
  errorUpdateTask: null,
  loadingDeleteTask: false,
  errorDeleteTask: null,
};

export const taskUIReducer = createReducer(
  initialState,

  // LOAD TASKS UI REDUCERS
  on(TasksUIActions.loadTasksRequest, (state: TasksUIState) => {
    return {
      ...state,
      loadingTasks: true,
      errorLoadingTasks: null
    };
  }),

  on(TasksUIActions.loadTasksSuccess, (state: TasksUIState) => {
    return {
      ...state,
      loadingTasks: false,
      errorLoadingTasks: null
    };
  }),

  on(TasksUIActions.loadTasksFail, (state: TasksUIState, { error }) => {
    return {
      ...state,
      loadingTasks: false,
      errorLoadingTasks: error || null
    };
  }),

  // TODO: more
);
