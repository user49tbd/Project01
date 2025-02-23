import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { HomeMainComponent } from '../../Screen/home-main/home-main.component';
import { MainlogComponent } from '../../Screen/mainlog/mainlog.component';
import { FormImgComponent } from '../../fields/form-img/form-img.component';
import { DataListComponent } from '../../Screen/data-list/data-list.component';
import { Auth1ServiceService } from '../../Services/auth1-service.service';
import { ReverseAuthService } from '../../Services/reverse-auth.service';
import { DataListUserComponent } from '../../Screen/data-list-user/data-list-user.component';
const route:Routes=[
  /*
  {path:'res',component:TestComponent},
  {path:'other',component:CompLComponent},
  {path:'form',component:FormComponent, canActivate:[CkRouteService]},
  {path:'log',component:MainlogComponent},
  {path:'carsl',component:FormImgComponent},
  {path:'lstD',component:ListDataComponent},*/
  {path:'lstU',component:DataListUserComponent,canActivate: [Auth1ServiceService]},
  {path:'lstD',component:DataListComponent,canActivate: [Auth1ServiceService]},
  {path:'imgForm',component:FormImgComponent,canActivate: [Auth1ServiceService]},
  {path:'log',component:MainlogComponent,canActivate: [ReverseAuthService]},
  {path:'home',component:HomeMainComponent},
  {path:'**', redirectTo:'/home'}
]

@NgModule({
  imports:[RouterModule.forRoot(route)],
  exports:[RouterModule]
})
export class RouteModule { }
