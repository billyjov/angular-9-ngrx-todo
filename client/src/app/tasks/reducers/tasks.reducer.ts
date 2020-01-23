import { createReducer, on } from '@ngrx/store';
import * as TasksActions from '../actions/index';
import { tasksAdapter, TasksState } from '../states/tasks.state';
import { Update } from '@ngrx/entity';
import { Task } from '../shared/models/task.model';


export const initialState: TasksState = tasksAdapter.getInitialState({
  // additional entity state properties
});

export const tasksReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, (state, { tasks }) => {
    return tasksAdapter.addAll(tasks, state);
  }),
  on(TasksActions.addTask, (state, { task }) => {
    return tasksAdapter.addOne(task, state);
  }),
  on(TasksActions.updateTask, (state, { updatedTask }) => {
    const task: Update<Task> = {
      id: updatedTask.id,
      changes: {
        ...updatedTask
      }
    };
    return tasksAdapter.updateOne(task, state);
  }),
  on(TasksActions.deleteTask, (state, { taskId }) => {
    return tasksAdapter.removeOne(taskId, state);
  })
);
