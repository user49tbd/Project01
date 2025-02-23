import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { SliderMk01Component } from './layout/slider-mk01/slider-mk01.component';
import { SliderMk02Component } from './layout/slider-mk02/slider-mk02.component';
import { Card1Component } from './layout/card1/card1.component';
import { Navmk2Component } from './Screen/navmk2/navmk2.component';
import { RouteModule } from './route/route/route.module';
import { RouterModule } from '@angular/router';
import { PolyGComponent } from './layout/poly-g/poly-g.component';
import { HomeMainComponent } from './Screen/home-main/home-main.component';
import { RadarComponent } from './layout/radar/radar.component';
import { LogoCOmpComponent } from './layout/logo-comp/logo-comp.component';
import { SimpCardComponent } from './layout/simp-card/simp-card.component';
import { MsgExbComponent } from './layout/msg-exb/msg-exb.component';
import { MainlogComponent } from './Screen/mainlog/mainlog.component';
import { ButonCComponent } from './layout/buton-c/buton-c.component';
import { InputComponenetComponent } from './fields/input-componenet/input-componenet.component';
import { LoginFormComponent } from './fields/login-form/login-form.component';
import { SignUpFormComponent } from './fields/sign-up-form/sign-up-form.component';
import { LoadMk01Component } from './layout/load-mk01/load-mk01.component';
import { ImgLayoutComponent } from './layout/img-layout/img-layout.component';
import { FormImgComponent } from './fields/form-img/form-img.component';
import { InputTxtAreaComponent } from './fields/input-txt-area/input-txt-area.component';
import { DataListComponent } from './Screen/data-list/data-list.component';
import { DataListUserComponent } from './Screen/data-list-user/data-list-user.component';
@NgModule({
  declarations: [
    AppComponent,
    SliderMk01Component,
    SliderMk02Component,
    Card1Component,
    Navmk2Component,
    PolyGComponent,
    HomeMainComponent,
    RadarComponent,
    LogoCOmpComponent,
    SimpCardComponent,
    MsgExbComponent,
    MainlogComponent,
    ButonCComponent,InputComponenetComponent,LoginFormComponent,SignUpFormComponent,
    LoadMk01Component,ImgLayoutComponent,FormImgComponent,InputTxtAreaComponent,
    DataListComponent,DataListUserComponent
  ],
  imports: [
    HttpClientModule,ReactiveFormsModule,FormsModule,BrowserModule,RouteModule,RouterModule
  ],
  providers:[],
  bootstrap:[AppComponent]
})
export class AppModule { }
