import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../shared/models/task.model';


export interface TasksState extends EntityState<Task> {}

export const tasksAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();
