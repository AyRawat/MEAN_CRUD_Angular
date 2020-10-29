import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { UserService } from '../apiServices/user.service';
import {Route,ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchForm: any;
  loggedInUserName:string = localStorage.getItem("userName");
  userToken:string = localStorage.getItem("userToken");
  userResults: any[];
  searchResult: any[];
  constructor(private userService:UserService,
    private route:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
    })
    this.getUsers(this.userToken);
  }
getUsers(token:string){
  this.userService.getUserProfile(token).subscribe(res=>{
    if(res.responseCode===200){
     console.log(res);
     this.userResults = [...res.result];
    }else{
      console.log(res);
    }
  },err=>{
    console.log(err);
  })
}
search(){
this.userService.searchUser(this.userToken,this.searchForm.value.name).subscribe(res=>{
  console.log(res);
  if(res.responseCode === 200){
    this.userResults = [...res.result];
  }else{
    console.log(res);
  }
},err=>{
  console.log("Failed to fetch");
})
}
onDelete(e){
  console.log(e.target.id);
  this.userService.deleteUser(this.userToken,e.target.id,).subscribe(res=>{
    if(res.responseCode === 200){
      this.getUsers(this.userToken);
      alert("Successfully Deleted");
    }else{
      alert(res.responseMessage);
    }
  },err=>{
   alert(err.error);
  })
}
onEdit(e){
  console.log(e.target.id);
  this.route.navigate(['/edit'],{queryParams:{userId:e.target.id}})
}
onLogout(){
localStorage.clear();
this.route.navigate(['/login']);
}
}
