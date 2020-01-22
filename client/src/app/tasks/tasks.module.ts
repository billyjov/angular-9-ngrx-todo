import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { TasksComponent } from './tasks.component';

import { EFFECTS } from './effects';

import * as fromReducers from './reducers';

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
    ]),
    StoreModule.forFeature('tasks-module', fromReducers.reducers, {
      metaReducers: fromReducers.metaReducers
    }),
    EffectsModule.forFeature(EFFECTS)
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
