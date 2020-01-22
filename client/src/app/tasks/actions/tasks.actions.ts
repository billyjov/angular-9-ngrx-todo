import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from '../shared/models/task.model';

export const addTask = createAction(
  '[TaskModule] AddTask',
  // correct should be task: Task but haved to make this corresponding on backend response
  props<{ task: any }>()
);

export const updateTask = createAction(
  '[TaskModule] UpdateTask',
  props<{ updatedTask: Update<Task> }>()
);

export const deleteTask = createAction(
  '[TaskModule] DeleteTask',
  props<{ taskId: number }>()
);

export const loadTasks = createAction(
  '[TodoModule] LoadTasks',
  props<{ tasks: Task[] }>()
);
