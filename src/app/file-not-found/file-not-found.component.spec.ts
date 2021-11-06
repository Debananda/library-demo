import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileNotFoundComponent } from './file-not-found.component';

describe('FileNotFoundComponent', () => {
  let component: FileNotFoundComponent;
  let fixture: ComponentFixture<FileNotFoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
