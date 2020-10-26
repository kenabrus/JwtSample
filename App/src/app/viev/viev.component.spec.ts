import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VievComponent } from './viev.component';

describe('VievComponent', () => {
  let component: VievComponent;
  let fixture: ComponentFixture<VievComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VievComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VievComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
