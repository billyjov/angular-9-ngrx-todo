import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Task } from '../shared/models/task.model';


// LOAD ACTIONS
export const loadTasksRequest = createAction(
  '[TaskModule] LoadTasksRequest'
);

export const loadTasksSuccess = createAction(
  '[TaskModule] LoadTaskSuccess'
);

export const loadTasksFail = createAction(
  '[TaskModule] LoadTasksFail',
  props<{ error: string }>()
);

// ADD ACTIONS
export const addTaskRequest = createAction(
  '[TaskModule] AddTasksRequest',
  props<{ task: Task }>()
);

export const addTaskSuccess = createAction(
  '[TaskModule] AddTaskSuccess'
);

export const addTaskFail = createAction(
  '[TaskModule] AddTasksFail',
  props<{ error: string }>()
);

// UPDATE ACTIONS
export const updateTaskRequest = createAction(
  '[TaskModule] UpdateTasksRequest',
  props<{ updatedTask: Task }>()
);

export const updateTasksSuccess = createAction(
  '[TaskModule] UpdateTaskSuccess'
);

export const updateTaskFail = createAction(
  '[TaskModule] UpdateTasksFail',
  props<{ error: string }>()
);

// DELETE ACTIONS
export const deleteTaskRequest = createAction(
  '[TaskModule] DeleteTasksRequest',
  props<{ taskId: number }>()
);

export const deleteTaskSuccess = createAction(
  '[TaskModule] DeleteTaskSuccess'
);

export const deleteTaskFail = createAction(
  '[TaskModule] DeleteTasksFail',
  props<{ error: string }>()
);
