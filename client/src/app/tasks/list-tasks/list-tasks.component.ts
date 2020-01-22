import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from 'src/app/tasks/shared/models/task.model';
import { TasksService } from 'src/app/tasks/shared/services/tasks-http.service';
import { TaskObserverService } from 'src/app/core/task-observer/task-observer.service';
import { TasksState } from '../states/tasks.state';
import { TasksModuleState } from '../states';
import { getTasks } from '../selectors';
import { loadTasksRequest, deleteTaskRequest, updateTaskRequest } from '../actions';
import { tap, take } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  public tasks$: Observable<Task[]>;

  @Input()
  public taskForm: FormGroup;

  constructor(
    private tasksHttpService: TasksService,
    private store: Store<TasksModuleState>
  ) { }

  ngOnInit() {
    this.initTasksState();
  }

  public editTask(task: Task): void {
    const datePipe = new DatePipe('en-US');
    const formatedDueDate = datePipe.transform(task.dueDate, 'yyyy-MM-dd');
    this.taskForm.setValue({
      id: task.id,
      title: task.title,
      dueDate: formatedDueDate
    });
    this.tasksHttpService.isEditMode.next(true);
  }

  public removeTask(task: Task): void {
    const action = deleteTaskRequest({ taskId: task.id });
    this.store.dispatch(action);
  }

  public markAsDone(isChecked, task: Task): void {
    task.done = isChecked.target.checked;
    const updatedTask = task as unknown as Update<Task>;
    const action = updateTaskRequest({ updatedTask });

    this.store.dispatch(action);
  }

  private initTasksState() {
    this.tasks$ = this.store.pipe(select(getTasks), tap(tasks => {
      if (tasks.length === 0) {
        const action = loadTasksRequest();
        this.store.dispatch(action);
      }
    }));
  }
}
