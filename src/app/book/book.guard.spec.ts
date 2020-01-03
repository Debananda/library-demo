import { TestBed, async, inject } from '@angular/core/testing';

import { BookGuard } from './book.guard';

describe('BookGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookGuard]
    });
  });

  it('should ...', inject([BookGuard], (guard: BookGuard) => {
    expect(guard).toBeTruthy();
  }));
});
