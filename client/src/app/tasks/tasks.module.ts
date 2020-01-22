import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TasksComponent } from './tasks.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AddTasksComponent,
    ListTasksComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: TasksComponent }
    ])
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
