import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BDConnectionService } from './bdconnection.service';
import { UserLogService } from './user-log.service';

@Injectable({
  providedIn: 'root'
})
export class Auth1ServiceService implements CanActivate{

  auth!:any
  constructor(private serv:UserLogService ){
    this.serv.ev.subscribe((res)=>{
      if(res.vl){
        this.auth = true
      }else{
        this.auth = false
      }
    })
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(this.auth)
    return this.auth;
  }
}
