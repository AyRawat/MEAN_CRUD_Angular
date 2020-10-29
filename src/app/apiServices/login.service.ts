import { Injectable } from '@angular/core';
import * as constants_url from "../apiUrls/const.js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http:HttpClient) { }
  signUpUser(data:any):Observable<any>{
    return this.http.post(`${constants_url.BASE_API_URL}/user/userSignup`,data,{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
  }
  loginUser(data:any):Observable<any>{
    return this.http.post(`${constants_url.BASE_API_URL}/user/userLogin`,data,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    })
  }
}
