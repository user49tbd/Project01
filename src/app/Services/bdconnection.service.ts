import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { imgData } from '../Entities/imgData';
import { delay, take, tap } from 'rxjs';
import { UserData } from '../Entities/user';

@Injectable({
  providedIn: 'root'
})
export class BDConnectionService {

  api = '/api/insrtUser'
  //api2 = '/api/controlImg'
  urlGet = '/api/lstImgs'

  constructor(private httpC:HttpClient) { }
  Checkuser(body:UserData){
    return this.httpC.post<UserData>('/api/checkUsr',body).pipe(
      take(1),
      tap((res)=>{
        console.log("res")
      })
    )
  }
  SignUpUser(body:UserData){
    console.log("sending data"+body.name+" - "+body.email+" - "+body.pass)
    return this.httpC.post<UserData>(this.api,body).pipe(
      take(1),
      tap((res)=>{
        console.log("res")
      })
    )
  }
  findUserName(name:string){
    return this.httpC.get<UserData>(`/api/f/${name}`).pipe(
      take(1),
      tap((res)=>{
        console.log("res")
      })
    )
  }
  sendPost(body:imgData){
    console.log("this is the body")
    console.log(body);
    const formData = new FormData();
    formData.append("title", body.title);
    formData.append("desc", body.desc);
    body.img.forEach((imgObj, index) => {
      formData.append(`files`, imgObj.img);
    });
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let userName = user.name || "";

    return this.httpC.post<imgData>(`/api/posts/${userName}`,formData).pipe(
      take(1),
      tap((res)=>{
        console.log(res)
      })
    )
  }
  getObj() {
    return this.httpC.get<imgData>(this.urlGet).pipe(
      delay(1000),
      take(1),
      tap((res) => { console.log(res) })
    )
  }
  getObjUsr() {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    let userName = user.name || "";
    return this.httpC.get<imgData>(`/api/usrImgs/${userName}`).pipe(
      delay(1000),
      take(1),
      tap((res) => { console.log(res) })
    )
  }
  deleteObjUsr(vl:any){
    return this.httpC.delete(`/api/delPost/${vl}`, { responseType: 'text' }).pipe(
      take(1),
      tap((res)=>{
        console.log(res)
      })
    )
  }
}
