import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { Update } from '@ngrx/entity';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Task } from 'src/app/tasks/shared/models/task.model';
import { TasksService } from 'src/app/tasks/shared/services/tasks-http.service';
import { TasksModuleState } from '../states';
import { getTasks } from '../selectors';
import { deleteTaskRequest, updateTaskRequest } from '../actions';
import { TaskSocketService } from '../shared/services/task-socket/task-socket.service';

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
    private store: Store<TasksModuleState>,
    private taskSocketService: TaskSocketService
  ) {
  }

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
    this.taskSocketService.dispatch('taskDeleted', task);
  }

  public markAsDone(isChecked, task: Task): void {
    const updatedTask: Update<Task> = {
      id: task.id,
      changes: {
        id: task.id,
        done: isChecked.target.checked
      }
    };
    const action = updateTaskRequest({ updatedTask });

    this.store.dispatch(action);
    this.taskSocketService.dispatch('taskUpdated', task);
  }

  private initTasksState() {
    this.tasks$ = this.store.pipe(select(getTasks));
  }
}
