import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BDConnectionService } from '../../Services/bdconnection.service';
import { MsgExbComponent } from '../../layout/msg-exb/msg-exb.component';

@Component({
  selector: 'app-data-list-user',
  standalone:false,
  templateUrl: './data-list-user.component.html',
  styleUrl: './data-list-user.component.css'
})
export class DataListUserComponent {
obj!:any
  constructor(private serv:BDConnectionService
    ){

  }
  ngAfterViewInit(): void {
    this.getInf()
  }
  getInf(){
    console.log("here")
    this.serv.getObjUsr().subscribe({
      next: (res) => {
        if (res) {
          this.obj = res;
          console.log(this.obj);
          this.convertToArray();
        } else {
          console.warn('Nenhum dado foi retornado.');
        }
      },
      error: (err) => {
        console.error('Erro durante a assinatura:', err);
      },
      /*
      this.obj = res
      console.log(this.obj)
     this.convertToArray()*/
    });
  }
  removeItem(vl:any){
    console.log(vl)
    this.serv.deleteObjUsr(vl).subscribe({
      next:(res)=>{
        console.log(res)
        this.exbMsg("Dados excluidos")
        this.getInf()
      },
      error:(res)=>{
        console.log(res)
        this.exbMsg("Não foi possível excluir os dados")
      }
  })
  }
  convertToArray(){
    let arr:any=[]
    let inc=0
    this.obj.map((elmnt:any)=>{
      inc=0
      //console.log(elmnt.img)

      Array.from(elmnt.img).forEach((imgRes:any)=>{
        arr.push([inc,`data:image/jpeg;base64,${imgRes.img}`])
        inc+=1
      })
      elmnt.imgs=[...arr]
      //console.log(elmnt.imgs)
      arr=[]
    })
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
