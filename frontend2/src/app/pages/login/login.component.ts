import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = { username:this.username, password:this.password }
    this.auth.login(user);
  }

}
