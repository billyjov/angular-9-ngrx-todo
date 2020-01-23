import { Injectable } from '@angular/core';

import { createEffect, Actions, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { TasksService } from '../shared/services/tasks-http.service';
import {
  loadTasks,
  loadTasksRequest,
  loadTasksSuccess,
  loadTasksFail,
  addTaskRequest,
  addTask,
  addTaskSuccess,
  addTaskFail,
  updateTaskRequest,
  updateTask,
  updateTaskFail,
  deleteTaskRequest,
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFail,
  updateTasksSuccess
} from '../actions';
import { Task } from '../shared/models/task.model';


@Injectable()
export class TasksEffects implements OnInitEffects {


  public loadTasksRequest$ = createEffect(() => this.action$.pipe(
    ofType(loadTasksRequest),
    switchMap(() => {
      return this.tasksService.getTasks().pipe(
        mergeMap((tasks: Task[]) => [
          loadTasks({ tasks }),
          loadTasksSuccess()
        ]),
        catchError(error => of(loadTasksFail({ error })))
      );
    })
  ));

  public addTaskRequest = createEffect(() => this.action$.pipe(
    ofType(addTaskRequest),
    switchMap((action) => {
      return this.tasksService.createTask(action.task).pipe(
        mergeMap((task: Task) => [
          addTask({ task }),
          addTaskSuccess()
        ]),
        catchError(error => of(addTaskFail({ error })))
      );
    })
  ));

  public updateTaskRequest$ = createEffect(() => this.action$.pipe(
    ofType(updateTaskRequest),
    switchMap((action) => {
      const updatedTask = action.updatedTask;
      return this.tasksService.updateTask(updatedTask.changes).pipe(
        mergeMap(() => [
          updateTask({ updatedTask }),
          updateTasksSuccess()
        ]),

        catchError(error => of(updateTaskFail({ error })))
      );
    })
  ));

  public deleteTaskRequest$ = createEffect(() => this.action$.pipe(
    ofType(deleteTaskRequest),
    switchMap((action) => {
      const taskId = action.taskId;

      return this.tasksService.deleteTask(taskId).pipe(
        mergeMap(() => [
          deleteTask({ taskId }),
          deleteTaskSuccess()
        ]),
        catchError(error => of(deleteTaskFail({ error })))
      );
    })
  ));

  constructor(
    private action$: Actions,
    private tasksService: TasksService
  ) { }

  ngrxOnInitEffects(): Action {
    return { type: '[TaskModule] LoadTasksRequest' };
  }
}
