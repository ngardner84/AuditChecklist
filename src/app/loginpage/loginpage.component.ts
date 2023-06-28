import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})

export class LoginpageComponent implements OnInit{

  email: string;
  password: string;

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){
    if (this.authService.isLoggedIn) { 
      this.router.navigate(['/homepage']);
    }
    this.createLoginForm();
  }

  ngOnInit(): void {
    this.createLoginForm
  }


  createLoginForm(){
    this.loginForm! = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login(){
    this.email = this.loginForm.get('email')!.value;
    this.password = this.loginForm.get('password')!.value;
    console.log(this.email, this.password)
    this.authService.login(this.email, this.password).subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}
