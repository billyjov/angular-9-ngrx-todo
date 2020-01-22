import { createReducer, on } from '@ngrx/store';
import * as TasksActions from '../actions/index';
import { tasksAdapter, TasksState } from '../states/tasks.state';


export const initialState: TasksState = tasksAdapter.getInitialState({
  // additional entity state properties
});

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, (state, { tasks }) => {
    return tasksAdapter.addAll(tasks, state);
  }),
  on(TasksActions.addTask, (state, { task }) => {
    console.log('inside reducer: ');
    console.log('state: ', state);
    console.log('task: ', task);
    // task.response due to node structure inside server.
    return tasksAdapter.addOne(task.response, state);
  }),
  on(TasksActions.updateTask, (state, { updatedTask }) => {
    console.log('updated Task', updatedTask);
    console.log('updated state', state);
    return tasksAdapter.updateOne(updatedTask, state);
  }),
  on(TasksActions.deleteTask, (state, { taskId }) => {
    return tasksAdapter.removeOne(taskId, state);
  })
);
