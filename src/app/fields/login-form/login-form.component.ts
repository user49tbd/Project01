import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BDConnectionService } from '../../Services/bdconnection.service';
import { UserData } from '../../Entities/user';
import { MsgExbComponent } from '../../layout/msg-exb/msg-exb.component';
import { UserLogService } from '../../Services/user-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone:false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  formG:FormGroup
  errList:string[]=[]
  //user1:user={name:'',email:'',password:''}
  constructor(private fb:FormBuilder,
    private serv:BDConnectionService,
    private userS:UserLogService,
    private rot:Router
    //private serv:ServicePersistenceService
    ){
    this.formG = fb.group({
      name:[null,[Validators.required,this.CheckError1(12)]],
      password:[null,[this.CheckError1(12)]]
    },{validators:[this.CheckkAllField()]})
  }
  submit(){
    console.log(this.formG.value)
    //console.log(this.formG.get('name')?.errors)
    Object.keys(this.formG.controls).forEach((res)=>{
      console.log(res)
      this.formG.get(res)?.markAsTouched()
    })
    let userD:UserData={id:'',
            name:this.formG.get('name')?.value,
          email:'',
        pass:this.formG.get('password')?.value}

    if(this.formG.valid){
      this.serv.Checkuser(userD).subscribe({
        next: (res)=>{
          this.userS.logIng(res)
          this.rot.navigate(["/"])
        },
        error:(err)=>{
          this.exbMsg("Usuário ou Senha inválidos")
        }
    })
    }

    //this.user1.name=this.formG.get('name')?.value
    //this.user1.email=this.formG.get('email')?.value
    //this.user1.password=this.formG.get('password')?.value

    //this.serv.postData(this.user1)
  }
  reset(){
    this.formG.reset()
  }
  //checkFields
  CheckkAllField():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      let inc=0
      let qtdF=0
      if(control instanceof FormGroup){
        let fg = (control as FormGroup)
        Object.keys(fg.controls).forEach((res)=>{
          if(!fg.get(res)?.valid){
            inc+=1
          }
          qtdF+=1
        })
      }
      if(inc>0){
        return ({error:`${inc}|${qtdF}`})
      }
      return null
    }
  }
  CheckError1(val:any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
  
      if (!value) {
        return { error:"Não pode ser nulo"};
      }
  
      if (value.length < 5 || value.length > 25) {
        return { error: `valor deve ter um comprimento entre 5 - ${val}`};
      }
      return null;
    };
  }
  checkName(fName:string){
    return {
      "invalidCK": this.formG.get(fName)?.touched && !this.formG.get(fName)?.valid,
      "validCK": this.formG.get(fName)?.touched && this.formG.get(fName)?.valid
    }
  }
    @ViewChild("selecMsg",{read:ViewContainerRef,static:true}) exbV!:ViewContainerRef
      exbMsg(msErr:string){
        let elmt:ComponentRef<MsgExbComponent>= this.exbV.createComponent(MsgExbComponent)
        elmt.instance.msg = msErr;
        setTimeout(()=>{
          elmt.destroy()
        },3500)
      }
}
