export interface TasksUIState {
  errorLoadingTasks: string | null;
  loadingTasks: boolean;
  errorAddTask: string | null;
  loadingAddTask: boolean;
  errorUpdateTask: string | null;
  loadingUpdateTask: boolean;
  errorDeleteTask: string | null;
  loadingDeleteTask: boolean;
}
