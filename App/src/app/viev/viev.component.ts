import { Component, OnInit, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../service/authservice';
@Component({
  selector: 'app-viev',
  templateUrl: './viev.component.html',
  styleUrls: ['./viev.component.css']
})
@Injectable()
export class VievComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private authservice: AuthService) { }
  // tslint:disable-next-line:member-ordering
  tiles = false;
  role: boolean;

  ngOnInit(): void {
    this.role = this.authservice.isAdmin();
  }

  table() {
    this.tiles = false;
  }

  tiless() {
    this.tiles = true;
  }

  getinfo(str: string) {
    document.getElementById('mess').textContent = str;
  }

  isUserAuthenticated() {
    // console.log("autoryzacja");
    const token: string = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      // console.log("true");
      return true;
    }
    else {
      return false;
    }
  }

  public logOut = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('sort');
    localStorage.removeItem('filtr');
    this.router.navigate(['']);
  }
}
