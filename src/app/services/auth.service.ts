import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendURL = 'http://localhost:3000';

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public loggedIn: boolean = false;


  constructor(private http: HttpClient, private router: Router) { 
    const user = localStorage.getItem('user');
    this.loggedIn = this.isLoggedIn;
    
    // Important check for user value. If the user is null or undefined, then we set the userSubject to null as well
    // This is to prevent the userSubject from being set to a string value of 'undefined' and causing errors
    if (user && user !== 'undefined') {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(user!));
    this.user = this.userSubject.asObservable();
    } else {
      this.userSubject = new BehaviorSubject<User | null>(null);
      this.user = this.userSubject.asObservable();
    }
  }

  public get userValue() {
    if (this.userSubject.value === null || this.userSubject.value === undefined) {
      return null;
    }
    return this.userSubject.value;
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return (user !== null) ? true : false;
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.backendURL}/login`, {email, password});
  }

  logout(): void{
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  
}
