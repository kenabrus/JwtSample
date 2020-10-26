import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLetterComponent } from './delete-letter.component';

describe('DeleteLetterComponent', () => {
  let component: DeleteLetterComponent;
  let fixture: ComponentFixture<DeleteLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
