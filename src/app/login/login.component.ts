import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { LoginService } from '../apiServices/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;

  constructor(private loginService:LoginService,
    private router:Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }
submit(){
  console.log(this.loginForm.value);
  this.loginService.loginUser(this.loginForm.value).subscribe(res=>{
    console.log(res);
    if(res.responseCode === 200){
      localStorage.setItem('userToken',res.result.userToken);
      localStorage.setItem("userName", res.result.userData.userData.name)
      this.loginForm.reset();
      this.router.navigate(['/home'])
    }else{
      alert(res.responseMessage);
    }
  },err=>{
    console.log(err);
    alert(err.error);
  })
}
}
