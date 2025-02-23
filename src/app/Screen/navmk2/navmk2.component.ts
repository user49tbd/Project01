import { Component,OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CkRouteService } from '../../ck-route.service';
import { Subscription } from 'rxjs';
import { UserLogService } from '../../Services/user-log.service';
//import { LogDataService } from '../../Services/log-data.service';

@Component({
  selector: 'app-navmk2',
  standalone: false,
  templateUrl: './navmk2.component.html',
  styleUrl: './navmk2.component.css'
})
export class Navmk2Component implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sideNav') sideB!: ElementRef;

  //canA: boolean;
  subs: Subscription = new Subscription();
  sbBl: boolean = false;
  elmt: HTMLElement | null = null;
  logInfo!:string;
  userVal!:any

  constructor(private rot:Router,private serv:UserLogService
    //private rs: CkRouteService,private serv:LogDataService
    ) {
      this.serv.ev.subscribe((srv)=>{
        this.userVal = srv.vl
        if(this.userVal!=null){
          console.log(this.userVal.name+" - "+this.userVal.pass)
          this.slider()
        }
      })
      
    //this.canA = this.rs.bl;

    serv.ev.subscribe((res)=>{
      //console.log("this is the new vl -> "+res.vl)
      if(res.vl){
        this.logInfo=res.vl.name
      }else{
        this.logInfo=''
      }
    })
  }



  ngOnInit(): void {
    /*
    this.subs = this.rs.ev.subscribe((params) => {
      this.canA = params;
    });*/
  }

  ngAfterViewInit(): void {
    if (this.sideB) {
      this.elmt = this.sideB.nativeElement;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  slider(): void {
    if(this.userVal){
      this.sbBl = !this.sbBl;
      if (this.elmt) {
        this.elmt.style.width = this.sbBl ? '20%' : '0%';
      }
    }
  }
  goLogin(){
    this.rot.navigate(["/log"]);
  }
  logOff(){
    this.sbBl = false
    this.elmt!.style.width = this.sbBl ? '20%' : '0%';
    this.serv.logOut()
    this.rot.navigate(['/'])
  }
  handleClick() {
    if (this.userVal == null) {
      this.goLogin(); // Chama a função de login
    } else {
      this.logOff(); // Chama a função de logout
    }
  }
}
