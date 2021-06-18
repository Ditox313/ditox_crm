import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService){}

  ngOnInit(){
    const potentialToken = localStorage.getItem('auth-token');
    if(potentialToken !== null)
    {
      this.auth.setToken(potentialToken);
    }
  }
}
