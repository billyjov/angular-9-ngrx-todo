import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, last, first, take, takeLast, skip, elementAt } from 'rxjs/operators';

import { TaskSocketService } from './shared/services/task-socket/task-socket.service';
import { TasksModuleState } from './states';
import { addTask, updateTask, deleteTask } from './actions';
import { Update } from '@ngrx/entity';
import { Task } from './shared/models/task.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {

  private taskCreated$: Observable<any>;
  private taskUpdated$: Observable<any>;
  private taskDeleted$: Observable<any>;
  private destroySubject$: Subject<void> = new Subject();

  constructor(
    private taskSocketService: TaskSocketService,
    private store: Store<TasksModuleState>
  ) {
    this.taskCreated$ = this.taskSocketService.subscribeToMessage('taskCreated');
    this.taskUpdated$ = this.taskSocketService.subscribeToMessage('taskUpdated');
    this.taskDeleted$ = this.taskSocketService.subscribeToMessage('taskDeleted');
  }

  ngOnInit() {
    this.taskCreated$
      .pipe(
        takeUntil(this.destroySubject$),
      )
      .subscribe((payload) => {
        if (payload.createdAt) {
          const action = addTask({ task: payload });
          this.store.dispatch(action);
        }
      });

    this.taskUpdated$
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe((payload) => {
        const updatedTask: Update<Task> = {
          id: payload.id,
          changes: {
            ...payload
          }
        };
        const action = updateTask({ updatedTask });
        this.store.dispatch(action);
      });

    this.taskDeleted$
      .pipe(
        takeUntil(this.destroySubject$)
      )
      .subscribe((payload) => {
        const action = deleteTask({ taskId: payload.id });
        this.store.dispatch(action);
      });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
