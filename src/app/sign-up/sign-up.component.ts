import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import {Router} from '@angular/router';
import {LoginService} from '../apiServices/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private router:Router,private login:LoginService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      emailId: new FormControl('', [Validators.required,Validators.email]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
submit(){
  console.log(this.signUpForm.value);
 if(this.signUpForm.valid){
  this.login.signUpUser(this.signUpForm.value).subscribe(res=>{
    if(res.responseCode === 200){
      console.log(res);
      alert(res.responseMessage);
      this.signUpForm.reset();
      this.router.navigate(['/login']);
    }else{
      alert(res.responseMessage)
    }
  },err=>{
    console.log(err.error);
    alert(err.error);
  })
 }else{
   alert("Please Enter Your Details")
 }
}
}
