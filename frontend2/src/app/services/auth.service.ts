import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' })
  private isLoggedInSubject = false;

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    const url = "http://localhost:3000/api/users/";
    if (user.username != '' && user.password != '' && user.username != null && user.password != null) {
      this.http.post<any>(url, user, {headers: this.headers}).subscribe(
        (response)  => {
          console.log(response);
          if (response.success) {
            this.isLoggedInSubject = true;
            console.log("registered!!!");
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  login(user: any) {
    const url = "http://localhost:3000/api/users/login";
    if (user.username != '' && user.password != '' && user.username != null && user.password != null) {
      this.http.post<any>(url, user, {headers: this.headers}).subscribe(
        (response)  => {
          console.log(response);
          if (response.success) {
            this.isLoggedInSubject = true;
            console.log("logged in");
            this.router.navigate(['/']);
          }
        }
      );
    }
  }

  logout() {
    const url = "http://localhost:3000/api/users/logout";
    this.http.post<any>(url, {}, {headers: this.headers}).subscribe(
      (response)  => {
        console.log(response);
        if (response.success) {
          this.isLoggedInSubject = false;
          console.log("logged out");
          this.router.navigate(['/login']);
        }
      }
    );
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedInSubject;
  }
}