import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  uSub!: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });


    this.route.queryParams.subscribe(function(params: Params){
      if(params['registered'])
      {
         MaterialService.toast("Теперь вы можете зайти в систему используя свои данные");
      }
      else if(params['accessDenied'])
      {
         MaterialService.toast("Сначала авторизируйтесь в системе");
      }
    });
  }



  ngOnDestroy(){
    if(this.uSub)
    {
      this.uSub.unsubscribe();
    }
  }


  onSubmit(): void {
    this.form.disable();
    
    const user = {
      email: this.form.value.email,
      password:  this.form.value.password
    }

    this.uSub = this.auth.login(user).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialService.toast(error.error.message);
        console.warn(error);
        this.form.enable();
      }
      
    )
  }

}
