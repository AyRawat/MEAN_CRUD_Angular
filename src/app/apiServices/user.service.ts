import { Injectable } from '@angular/core';
import * as constants_url from "../apiUrls/const.js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  getUserProfile(token:string):Observable<any>{
    return this.http.get(`${constants_url.BASE_API_URL}/user/users`,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        authToken: token
      })
    })
  }
  deleteUser(token:string,id:String):Observable<any>{
     return this.http.delete(`${constants_url.BASE_API_URL}/user/user/${id}`,{
       headers: new HttpHeaders({
          authToken:token
       })
     })
  }
  updateUser(token:string,data:any):Observable<any>{
    return this.http.put(`${constants_url.BASE_API_URL}/user/updateUser`,data,{
      headers: new HttpHeaders({
         authToken: token
      })
    })
  }
  searchUser(token:string,data:any):Observable<any>{
    return this.http.get(`${constants_url.BASE_API_URL}/user/getUsers?searchKey=${data}`,{
      headers: new HttpHeaders({
       "Content-Type": "application/json",
       authToken: token 
      })
    })
  }
  getProfile(token:string,data:any):Observable<any>{
    return this.http.get(`${constants_url.BASE_API_URL}/user/getUserProfile?userId=${data}`,{
      headers: new HttpHeaders({
       "Content-Type": "application/json",
       authToken: token 
      })
    })
  }
}
