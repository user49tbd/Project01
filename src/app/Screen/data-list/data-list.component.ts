import { Component } from '@angular/core';
import { BDConnectionService } from '../../Services/bdconnection.service';

@Component({
  selector: 'app-data-list',
  standalone:false,
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css'
})
export class DataListComponent {
  obj!:any
  constructor(private serv:BDConnectionService
    ){

  }
  ngAfterViewInit(): void {
    this.getInf()
  }
  getInf(){
    console.log("here")
    this.serv.getObj().subscribe({
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
}
