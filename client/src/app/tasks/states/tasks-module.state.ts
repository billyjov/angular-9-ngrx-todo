import { TasksState } from './tasks.state';
import { TasksUIState } from './tasks-ui.state';

export interface TasksModuleState {
  tasks: TasksState;
  tasksUI: TasksUIState;
}
