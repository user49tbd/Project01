import { Component, Renderer2,ElementRef,AfterViewInit, HostListener, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { MsgExbComponent } from '../../layout/msg-exb/msg-exb.component';

@Component({
  selector: 'app-mainlog',
  standalone:false,
  templateUrl: './mainlog.component.html',
  styleUrl: './mainlog.component.css'
})
export class MainlogComponent implements AfterViewInit {

  constructor(private render:Renderer2,private el:ElementRef){

  }


  con:any
  mainDoc:any
  slidDoc:any
  upperF:any = ''
  LowerF:any = ''
  qtd:any = 0
  fres:any = 0
  latest:any
  getData(){
    this.con = this.el.nativeElement.getElementsByClassName('Container')[0];
    this.mainDoc = this.el.nativeElement.getElementsByClassName('Scroll')[0];
    this.slidDoc = this.el.nativeElement.getElementsByClassName('SlidB')[0];
    this.upperF = this.el.nativeElement.getElementsByClassName('con')[0];
    this.LowerF = this.el.nativeElement.getElementsByClassName('con')[1];
  }
  calc(){
    this.getData()
    let MainH = this.mainDoc.getBoundingClientRect().height
    let tqtd =this.mainDoc.getBoundingClientRect().width/4;
    this.qtd = (tqtd*100)/MainH;

    let tfres = Math.abs(MainH-tqtd)
    this.fres = (tfres*100)/MainH
    //console.log(MainH+" - "+this.mainDoc.getBoundingClientRect().width)
    //console.log(this.qtd)
  }

  ngAfterViewInit(): void {
    console.log('ok');
    //this.calc()
    //this.log1('l')
    //console.log(this.qtd)
    requestAnimationFrame(() => {
      this.calc();
      this.log1('l');
      //console.log(this.qtd);
      let resizeObserver = new ResizeObserver(() => {
        this.calc();
        let vl=this.fres
        if(this.latest == "r"){
          vl=this.qtd
        }
        this.render.setStyle(this.LowerF,"height",`${vl}%`)
      });
      resizeObserver.observe(this.con);
    });

  }

  log1(pos:any) {
    this.calc()

      let arr = [["0%","100%"],["100%","0%"],["translateX(0%)","translateX(-100%)"],
    ["0%","100%"],["100%","0%"],["translateY(0%)","translateY(-100%)"],
    ["0.5s","0.5s"],[this.fres,this.qtd],["0.5s","0.5s"],["1","0"],["0.5s","0.5s"],
    ["0","1"],["0.5s","0.5s"]]
    let i =0
    this.latest="l"
    if(pos!="l"){
      i = 1
      this.latest="r"
    }
      this.render.setStyle(this.mainDoc,"left",arr[0][i])
      this.render.setStyle(this.mainDoc,"right",arr[1][i])
      this.render.setStyle(this.mainDoc,"transform",arr[2][i])

      this.render.setStyle(this.slidDoc,"top",arr[3][i])
      this.render.setStyle(this.slidDoc,"bottom",arr[4][i])
      this.render.setStyle(this.slidDoc,"transform",arr[5][i])
      this.render.setStyle(this.slidDoc,"transition",arr[6][i])

      //this.render.setStyle(this.LowerF,"height",`${arr[7][i]}px`)
      this.render.setStyle(this.LowerF,"height",`${arr[7][i]}%`)
      this.render.setStyle(this.LowerF,"transition",arr[8][i])

      let hideres = this.el.nativeElement.getElementsByClassName("ContenContnr")[0]
      this.render.setStyle(hideres,"opacity",arr[9][i])
      this.render.setStyle(hideres,"transition",arr[10][i])

      let hideres2 = this.el.nativeElement.getElementsByClassName("ContenContnr2")[0]
      this.render.setStyle(hideres2,"opacity",arr[11][i])
      this.render.setStyle(hideres2,"transition",arr[12][i])
      /*
      this.render.setStyle(this.mainDoc,"left","0%")
      this.render.setStyle(this.mainDoc,"right","100%")
      this.render.setStyle(this.mainDoc,"transform","translateX(0%)")

      this.render.setStyle(this.slidDoc,"top","0%")
      this.render.setStyle(this.slidDoc,"bottom","100%")
      this.render.setStyle(this.slidDoc,"transform","translateY(0%)")
      this.render.setStyle(this.slidDoc,"transition","0.5s")

      this.render.setStyle(this.LowerF,"height",`${this.fres}px`)
      this.render.setStyle(this.LowerF,"transition","0.5s")

      let hideres = this.el.nativeElement.getElementsByClassName("ContenContnr")[0]
      this.render.setStyle(hideres,"opacity",`1`)
      this.render.setStyle(hideres,"transition","0.5s")

      let hideres2 = this.el.nativeElement.getElementsByClassName("ContenContnr")[0]
      this.render.setStyle(hideres2,"opacity",`0`)
      this.render.setStyle(hideres2,"transition","0.5s")
      */

      //mainDoc.style.left = `0%`;
      //mainDoc.style.right = `100%`;
      //mainDoc.style.transform='translateX(0%)'

      /*
      slidDoc.style.top='0%'
      slidDoc.style.bottom='100%'
      slidDoc.style.transform='translateY(0%)'
      slidDoc.style.transition='0.5s'
      */

      /*
      LowerF.style.height=`${fres}px`
      LowerF.style.transition='0.5s'*/

      /*
      let hideres = document.getElementsByClassName("ContenContnr")[0]
      hideres.style.opacity="1"
      hideres.style.transition="0.5s"
      */

      /*
      let hideres2 = document.getElementsByClassName("ContenContnr2")[0]
      hideres2.style.opacity="0"
      hideres2.style.transition="0.5s"*/
  }

  log2() {
    /*
      console.log("sign-in");
      mainDoc.style.left = `100%`;
      mainDoc.style.right = `0%`;
      mainDoc.style.transform='translateX(-100%)'

      slidDoc.style.top='100%'
      slidDoc.style.bottom='0%'
      slidDoc.style.transform='translateY(-100%)'
      slidDoc.style.transition='0.5s'

      LowerF.style.height=`${qtd}px`
      LowerF.style.transition='0.5s'

      let hideres = document.getElementsByClassName("ContenContnr")[0]
      hideres.style.opacity="0"
      hideres.style.transition="0.5s"
      let hideres2 = document.getElementsByClassName("ContenContnr2")[0]
      hideres2.style.opacity="1"
      hideres2.style.transition="0.5s"
      */
  }
  errMsgFunc(vl:any){
    console.log(vl)
    this.exbMsg("Usuário inválido")
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
