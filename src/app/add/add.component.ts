import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import {Router} from '@angular/router';
import {LoginService} from '../apiServices/login.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private router:Router,private login:LoginService) { }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      emailId: new FormControl('', [Validators.required,Validators.email]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }
  submit(){
    console.log(this.addUserForm.value);
   if(this.addUserForm.valid){
    this.login.signUpUser(this.addUserForm.value).subscribe(res=>{
      if(res.responseCode === 200){
        console.log(res);
        alert(res.responseMessage);
        this.addUserForm.reset();
        this.router.navigate(['/home']);
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
