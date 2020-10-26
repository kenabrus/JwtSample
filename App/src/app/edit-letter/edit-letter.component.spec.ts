import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLetterComponent } from './edit-letter.component';

describe('EditLetterComponent', () => {
  let component: EditLetterComponent;
  let fixture: ComponentFixture<EditLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
