import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BDConnectionService } from '../../Services/bdconnection.service';
import { map, Observable, of } from 'rxjs';
import { UserData } from '../../Entities/user';
import { MsgExbComponent } from '../../layout/msg-exb/msg-exb.component';

@Component({
  selector: 'app-sign-up-form',
  standalone:false,
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.css'
})
export class SignUpFormComponent {
formG:FormGroup
  errList:string[]=[]
  //user1:user={name:'',email:'',password:''}
  constructor(private fb:FormBuilder,private serv:BDConnectionService
    //private serv:ServicePersistenceService
    ){
    this.formG = fb.group({
      name:[null,[Validators.required,this.CheckError1(12)],[this.checkUserName()]],
      email:[null,[this.CheckError1(12),this.CheckEmailVl()]],
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
    if(this.formG.valid){
      console.log("valid")
      let userD:UserData={id:'',
        name:this.formG.get('name')?.value,
      email:this.formG.get('email')?.value,
    pass:this.formG.get('password')?.value}
      this.serv.SignUpUser(userD).subscribe({
        next: (res) => {
          if (res) {
            this.exbMsg('Inserido com sucesso')
            this.reset()
          }
        },
        error: (err) => {
          this.exbMsg('Erro durante a assinatura')
          //console.error('Erro durante a assinatura:', err);
        },
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
  checkUserName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
  
      return this.serv.findUserName(control.value).pipe(
        map((res: any) => {
          return res ? { error: "nome já cadastrado" } : null;
        })
      );
    };
  }
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
  CheckEmailVl():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      let value = control.value
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if(value){
        if(emailPattern.test(value)){
          return null
        }
        return {error:"invalid E-mail format "};
      }
      return null
    }
  }
  checkName(fName:string){
    return {
      "invalidCK": this.formG.get(fName)?.touched && !this.formG.get(fName)?.valid,
      "validCK": this.formG.get(fName)?.touched && this.formG.get(fName)?.valid
    }
  }
  errMsgFunc(vl:any,elmt:any){
      console.log(vl)
      this.exbMsg(vl)
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
