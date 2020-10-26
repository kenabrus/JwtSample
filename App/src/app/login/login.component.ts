import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  invalidLogin = false;
  url = 'http://localhost:5000/api/Login';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    // console.log(form);
    const credentials = JSON.stringify(form.value);
    this.http.post(this.url, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(response => {
      const token = (response as any).token;
      const role = (response as any).role;
      localStorage.setItem('jwt', token);
      localStorage.setItem('role', role);
      this.invalidLogin = false;
      localStorage.removeItem('sort');
      this.router.navigate(['/letters']);
    }, err => {
      this.invalidLogin = true;
    });
  }
}
