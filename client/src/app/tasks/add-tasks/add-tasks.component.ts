import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Task } from 'src/app/tasks/shared/models/task.model';
import { TasksService } from 'src/app/tasks/shared/services/tasks-http.service';
import { Store } from '@ngrx/store';
import { TasksState } from '../states/tasks.state';
import { addTask, updateTask, loadTasksRequest, updateTaskRequest, addTaskRequest } from '../actions';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {

  public taskForm: FormGroup;
  public isEditMode: boolean;
  public isSubmitted: boolean;
  private datePipe: DatePipe = new DatePipe('en-US');

  constructor(
    private formBuilder: FormBuilder,
    private tasksService: TasksService,
    private store: Store<TasksState>
  ) { }

  ngOnInit() {
    this.buildTaskForm();
    this.tasksService.isEditMode.subscribe((value: boolean) => {
      this.isEditMode = value;
    });
  }

  public submitTaskForm(): void {
    this.isSubmitted = true;
    if (this.taskForm.invalid) {
      return;
    }
    this.isEditMode ? this.updateTask() : this.addTask();
    this.isSubmitted = false;
  }

  public getActualDate(): string {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return today;
  }

  public get controls() {
    return this.taskForm.controls;
  }

  private addTask(): void {
    this.taskForm.value.dueDate = this.datePipe.transform(this.taskForm.value.dueDate, 'yyyy-MM-dd');
    const task: Task = this.taskForm.value;

    const action = addTaskRequest({ task });
    this.store.dispatch(action);

    // if (!this.store.error) {
    //   this.updateTaskList();
    // }
    // this.tasksService.createTask(task).subscribe((newTask: Task) => {
    //   if (newTask) {
    //     this.updateTaskList();
    //   }
    // });
  }

  private updateTask(): void {
    this.taskForm.value.dueDate = this.datePipe.transform(this.taskForm.value.dueDate, 'yyyy-MM-dd');
    const updatedTask = this.taskForm.value;
    const action = updateTaskRequest({ updatedTask });
    this.store.dispatch(action);
    this.isEditMode = false;
  }

  private updateTaskList(): void {
    // this.tasksService.retrieveAllTasks();
    // this.dispatchLoadTasks();
    this.taskForm.reset({ dueDate: [this.getActualDate()] });
  }

  private dispatchLoadTasks() {
    const action = loadTasksRequest();
    this.store.dispatch(action);
  }

  private buildTaskForm(): void {
    this.taskForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      dueDate: [this.getActualDate()]
    });
  }
}
