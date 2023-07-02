import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {

  constructor(private authService: AuthService) {}

  onClickLogout(){
    console.log('Logout button clicked');
    this.authService.logout();
    console.log('User logged out');
  }
}
