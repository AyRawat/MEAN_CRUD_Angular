import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { UserService } from '../apiServices/user.service';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm:FormGroup;
  userToken:string = localStorage.getItem("userToken");
  queryParamValue: any;
  inputBox:Boolean = false;
  constructor(private router:Router,
              private userService:UserService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param=>{
      this.queryParamValue = param["userId"];
      console.log(param["userId"])
      this.getUserProfile(this.userToken,this.queryParamValue);
    })
    this.editForm = new FormGroup({
      emailId: new FormControl('', [Validators.required,Validators.email]),
      name: new FormControl('',[Validators.required]),
    })
  }

  getUserProfile(token:string,id:string){
    this.userService.getProfile(token,id).subscribe(res=>{
      console.log(res);
      if(res.responseCode===200){
        this.editForm.patchValue(res.result);
      }
    },err=>{
      console.log(err);
    })
  }

  submit(){

  
  let data={
    userId:this.queryParamValue,
    emailId: this.editForm.value.emailId,
    name: this.editForm.value.name
  }
  this.userService.updateUser(this.userToken,data).subscribe(res=>{
    console.log(res);
    if(res.responseCode === 200){
      alert("Successfully Edited");
      this.editForm.reset();
      this.router.navigate(['/home'])
    }else{
      alert(res.responseMessage);
    }
  },err=>{
    alert(console.log(err.error));
  })
  }

}
