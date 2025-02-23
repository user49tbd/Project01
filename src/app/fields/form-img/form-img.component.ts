import { Component, ComponentRef, ElementRef, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
/*
import { LogDataService } from '../../Services/log-data.service';
import { ConService } from '../../Services/con.service';*/
import { imgsType } from '../../Entities/imgs';
import { imgData } from '../../Entities/imgData';
import { FileServService } from '../../Services/file-serv.service';
import { MsgExbComponent } from '../../layout/msg-exb/msg-exb.component';
import { BDConnectionService } from '../../Services/bdconnection.service';
@Component({
  selector: 'app-form-img',
  standalone:false,
  templateUrl: './form-img.component.html',
  styleUrl: './form-img.component.css'
})
export class FormImgComponent{
  frmG!: FormGroup;
  imgArr!:any;
  mImgData:imgData={id:null,title:'',desc:'',img:[]};
  timg:imgsType={id:null,num:0,img:''};

  constructor(private fb: FormBuilder,private serv:FileServService,
    private elN:ElementRef,private dbServ:BDConnectionService
    //,private serv:LogDataService,private dbServ:ConService
  ) {
    this.frmG = this.fb.group({
      name: [null,[this.checkTitle(15)]],
      desc: [null,[this.checkTitle(30)]],
      imgs: this.fb.array([],this.CheckImgLen())
    },{validators:[this.CheckkAllField()]});
  }
  watchImgs(){
    let el = this.frmG.get('imgs')
    if(el?.touched && !el.valid){
      this.errMsgFunc(this.frmG.get('imgs')?.errors?.['error'],"imgs")
    }
  }

  get imgs(): FormArray {
    return this.frmG.get('imgs') as FormArray;
  }

  onFileChange(event: Event) {
    //console.log("here is the file on input")
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imgs.clear(); 
      Array.from(input.files).forEach(file => {
        this.imgs.push(this.fb.control(file));
      });
    }
    this.converter()
  }
  eraseInputF(){
    this.elN.nativeElement.getElementsByClassName("inputF")[0].value=null
  }
  converter() {
    let arr: any[] = [];
    let inc = 0;
    let arrT = Array.from(this.frmG.get("imgs")?.value);
  
    arrT.forEach((vl: any) => {
      let reader = new FileReader();
      reader.onload = () => {
        arr.push([inc, reader.result]);
        inc += 1;
        if (arr.length === arrT.length) {
          this.imgArr = [...arr];
          //this.ev.emit(this.imgArr)
          this.serv.changeFile(this.imgArr)
        }
      };
      reader.readAsDataURL(vl);
    });
  }

  subs() {
    Object.keys(this.frmG.controls).map((res)=>{
      this.frmG.get(res)?.markAsTouched()
    })
    this.watchImgs()


    this.mImgData.desc=this.frmG.get('desc')?.value
    this.mImgData.title=this.frmG.get('name')?.value
    let inc=0;
    this.mImgData.img=[]
    this.frmG.get('imgs')?.value.map((res:any)=>{
      let timg:imgsType = {id:null,num:0,img:''};
      timg.num = inc
      timg.img = res
      this.mImgData.img.push(timg);
      inc+=1;
    })
    console.log(this.mImgData)
    if(this.frmG.valid){
      console.log("valid")
      this.dbServ.sendPost(this.mImgData).subscribe({
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
    //console.log("is valid ->"+this.frmG.valid)
    //console.log("form errors "+this.frmG.errors?.['error'])
    //console.log("form imgs "+this.frmG.get('imgs')?.errors?.['error'])
    //console.log("form imgs touch"+this.frmG.get('imgs')?.touched)
    //this.dbServ.sendImg(this.mImgData)
  }
  reset(){
    this.frmG.reset()
    this.resetImg()
  }
  resetImg(){
    this.imgs.clear();
    this.serv.changeFile([])
    this.eraseInputF()
  }
  //----------------Custom Validators
  CheckImgLen():ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
      if(control){
        if(control.value.length >= 1){
          return null
        }else{
          return {error:"pelo menos 1 imagem deve ser carregada"}
        }
      }
      return null
    }
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
  checkName(fName:string){
    return {
      "invalidCK": this.frmG.get(fName)?.touched && !this.frmG.get(fName)?.valid,
      "validCK": this.frmG.get(fName)?.touched && this.frmG.get(fName)?.valid
    }
  }
  checkTitle(val:any):ValidatorFn{
    return (control:AbstractControl):ValidationErrors | null =>{
        let vl = control.value
        if(vl){
          if(vl.length > 5 && vl.length < val){
            return null
          }else{
            return {error: `valor deve ter um comprimento entre 5 - ${val}`}
          }
        }
        return {error:"Não pode ser nulo"}
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
