import { EventEmitter, Injectable } from '@angular/core';
import { UserData } from '../Entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserLogService {

  constructor() {}

  ev = new EventEmitter();

  logIng(u:any){
    localStorage.setItem("user",JSON.stringify(u))
    let res = JSON.parse(localStorage.getItem("user") || '{}');
    console.log("this is user "+res.name)
    this.ev.emit({vl: res})
  }
  logOut(){
    localStorage.clear()
    this.ev.emit({vl:null})
  }
}
