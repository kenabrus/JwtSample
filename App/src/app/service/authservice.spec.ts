import { AuthService } from './authservice';
import { TestBed } from '@angular/core/testing';

describe('Authservice', () => {
  let service:AuthService;
  beforeEach(()=>{
    TestBed.configureTestingModule({});
    service=TestBed.inject(AuthService);
  })
  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
