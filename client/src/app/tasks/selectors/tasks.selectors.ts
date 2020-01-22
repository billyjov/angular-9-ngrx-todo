import { createSelector } from '@ngrx/store';

import { getTaskModuleState } from '../reducers';
import { tasksAdapter } from '../states';
import { Task } from '../shared/models/task.model';

export const getTasksState = createSelector(
  getTaskModuleState,
  state => state.tasks
);

export const {
  selectAll: getAllTasks,
  selectIds: getAllTasksIds,
  selectEntities: getAllTasksEntities,
  selectTotal: getTotalTasks
} = tasksAdapter.getSelectors(getTasksState);

export const getTasks = createSelector(
  getAllTasks,
  (tasks: Task[]) => tasks
);
