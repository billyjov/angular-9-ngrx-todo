import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '@env/environment';
import { TasksState } from '../states/tasks.state';
import { TasksModuleState } from '../states';
import { tasksReducer } from './tasks.reducer';
import { taskUIReducer } from './tasks-ui.reducer';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('STATE: ', state);
    console.log('ACTION: ', action);

    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<TasksModuleState> = {
  tasks: tasksReducer,
  tasksUI: taskUIReducer
};

export const metaReducers: MetaReducer<TasksModuleState>[] = !environment.production ? [debug] : [];

export const getTaskModuleState = createFeatureSelector<TasksModuleState>('tasks-module');
