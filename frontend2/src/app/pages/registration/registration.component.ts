import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  username: string = "";
  password: string = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = { username:this.username, password:this.password }
    this.auth.register(user);
  }

}
