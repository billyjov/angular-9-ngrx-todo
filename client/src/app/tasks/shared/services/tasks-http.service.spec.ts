import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TasksService } from './tasks-http.service';

describe('TasksHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TasksService = TestBed.inject(TasksService);
    expect(service).toBeTruthy();
  });
});
