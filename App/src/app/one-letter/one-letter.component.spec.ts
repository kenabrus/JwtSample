import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLetterComponent } from './one-letter.component';

describe('OneLetterComponent', () => {
  let component: OneLetterComponent;
  let fixture: ComponentFixture<OneLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
