import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogService } from './user-log.service';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthService implements CanActivate{

  auth!:any
    constructor(private serv:UserLogService ){
      this.serv.ev.subscribe((res: { vl: any; })=>{
        if(res.vl){
          this.auth = false
        }else{
          this.auth = true
        }
      })
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.auth;
    }
}
