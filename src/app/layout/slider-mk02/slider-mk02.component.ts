import { Component,AfterViewInit,Renderer2,ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider-mk02',
  standalone: false,
  templateUrl: './slider-mk02.component.html',
  styleUrl: './slider-mk02.component.css'
})
export class SliderMk02Component implements AfterViewInit{

  constructor(private render: Renderer2,private el:ElementRef){

  }


  mainC:any //document.getElementsByClassName("Sl")[0]
  //--
  wdt:any //= this.el.nativeElement.getElementsByClassName("Sl")[0].children[0].getBoundingClientRect().width
  


  ballList:any //= document.getElementsByClassName('BList')[0]
  qtdItem:any //= this.mainC.children.length

  center:any = 0

  timer:any=0

  isDis:boolean = false

  ngAfterViewInit(): void {

    this.mainC = this.el.nativeElement.getElementsByClassName("Sl")[0]
    this.ballList = this.el.nativeElement.getElementsByClassName('BList')[0]
    this.qtdItem = this.mainC.children.length
    this.wdt = this.el.nativeElement.getElementsByClassName("Sl")[0].children[0].getBoundingClientRect().width



    Array.from(this.mainC.children).forEach(element => {
      let elmt = this.render.createElement('div') //document.createElement('div')
      this.render.addClass(elmt,'ball') //elmt.classList.add('ball')
      elmt.addEventListener('click',(e:any)=>{
          let el = Array.from(this.ballList.children).indexOf(e.target)
          //console.log(ballList.children[el].textContent)
          //--------
          this.advance(this.ballList.children[el].textContent)
      })
      this.render.appendChild(this.ballList,elmt) //this.ballList.appendChild(elmt)
  });
  this.center = (this.mainC.children.length-1)/2
  this.bStyle(this.center,0.5)
  }
  btnS(vl:boolean){
    /*
    Array.from(document.getElementsByClassName('btn')).map((el)=>{
        el.disabled = vl
    })
    */
   this.isDis = vl

  }
  bStyle(res:any,vel:any) {
    res = parseInt(res);
    let range = 3;
    let arr = this.ballList.children;

    let limit1 = res - range;
    let limit2 = res + range;
    let bol=false
    let fst=0
    for (let i = 0; i < this.qtdItem; i++) {
        if (i > limit1 && i < limit2) {

            arr[i].style.display = 'flex';
            arr[i].style.transition = `${vel}s`;
            if(bol==true){
                arr[i].textContent = (i-fst)+fst
            }else{
                fst=i
                arr[i].textContent = i
            }
            bol=true
            if (res == i) {
                arr[i].style.backgroundColor = 'red';
                arr[i].style.height = '100%';
            } else {
                arr[i].style.backgroundColor = 'gray'; // Correção aqui
                arr[i].style.height = (80 - (100/7) * Math.abs(i - res)) + '%';
            }
        } else {
            arr[i].style.display = 'none';
        }
    }
  }
  advance(nextPos:any){
    //btnS(true)
    let centerValue = this.mainC.children[this.center].getElementsByTagName('span')[0].textContent
    let steps=0
    steps = Math.abs(nextPos - centerValue)
    let sideV='l'
    if(nextPos < centerValue){
        sideV='r'
    }
    for (let i = 0; i < steps; i++) {
        setTimeout(() => {
            //console.log('run ' + i);
            this.funL(sideV, 0.1, 100);
        }, i * 110); 
    }


  }
  funL(side:any,vel:any,inter:any){
    this.wdt = this.el.nativeElement.getElementsByClassName("Sl")[0].children[0].getBoundingClientRect().width
    let fstEl = this.mainC.children[0]
    let shf = -1
    if(side == 'r'){
        fstEl = this.mainC.children[((this.mainC.children).length)-1]
        shf = 1
    }
    //console.log(wdt)
    this.mainC.style.transform=`translateX(${(this.wdt+20)*shf}px)`
    this.mainC.style.transitionTimingFunction = 'linear';
    this.mainC.style.transition=vel+'s'
    this.btnS(true)
    setTimeout(()=>{
        //console.log(fstEl.textContent)
        this.mainC.style.transition='0s'
        this.btnS(false)
        if(side == 'l'){

            let centerNow = this.mainC.children[this.center+1].getElementsByTagName('span')[0].textContent
            //console.log('this it the value=> '+centerNow)
            centerNow = parseInt(centerNow)


            this.render.removeChild(this.mainC,fstEl)
            this.render.appendChild(this.mainC,fstEl)
            

            //this.mainC.removeChild(fstEl);
            //this.mainC.appendChild(fstEl);

            this.bStyle((centerNow),vel)
        }else{

            let centerNow = this.mainC.children[this.center-1].getElementsByTagName('span')[0].textContent
            //console.log('this it the value=> '+centerNow)
            centerNow = parseInt(centerNow)

            this.render.removeChild(this.mainC,fstEl)
            //this.render.appendChild(this.mainC,fstEl)
            this.render.insertBefore(this.mainC,fstEl,this.mainC.children[0])

            //mainC.removeChild(fstEl);
            //mainC.insertBefore(fstEl,mainC.children[0]);

            this.bStyle((centerNow),vel)
           // bStyle((mainC.children.length-1)/2)
        }
        this.mainC.style.transform=`translateX(${0}px)`
    },inter)
}

  /*
  window.onload=()=>{
      
      Array.from(mainC.children).forEach(element => {
          let elmt = document.createElement('div')
          elmt.classList.add('ball')
          elmt.addEventListener('click',(e)=>{
              let el = Array.from(ballList.children).indexOf(e.target)
              //console.log(ballList.children[el].textContent)
              //--------
              advance(ballList.children[el].textContent)
          })
          ballList.appendChild(elmt)
      });
      center = (mainC.children.length-1)/2
      bStyle(center,0.5)
  }
  function advance(nextPos){
      //btnS(true)
      let centerValue = mainC.children[center].getElementsByTagName('span')[0].textContent
      let steps=0
      steps = Math.abs(nextPos - centerValue)
      sideV='l'
      if(nextPos < centerValue){
          sideV='r'
      }
      for (let i = 0; i < steps; i++) {
          setTimeout(() => {
              //console.log('run ' + i);
              funL(sideV, 0.1, 100);
          }, i * 110); 
      }

  }
  function bStyle(res,vel) {
      res = parseInt(res);
      let range = 3;
      let arr = ballList.children;

      let limit1 = res - range;
      let limit2 = res + range;
      let bol=false
      let fst=0
      for (let i = 0; i < qtdItem; i++) {
          if (i > limit1 && i < limit2) {
              arr[i].style.display = 'flex';
              arr[i].style.transition = `${vel}s`;
              if(bol==true){
                  arr[i].textContent = (i-fst)+fst
              }else{
                  fst=i
                  arr[i].textContent = i
              }
              bol=true
              if (res == i) {
                  arr[i].style.backgroundColor = 'red';
                  arr[i].style.height = '100%';
              } else {
                  arr[i].style.backgroundColor = 'gray'; // Correção aqui
                  arr[i].style.height = (80 - (100/7) * Math.abs(i - res)) + '%';
              }
          } else {
              arr[i].style.display = 'none';
          }
      }
  }

  function funL(side,vel,inter){
      let fstEl = mainC.children[0]
      let shf = -1
      if(side == 'r'){
          fstEl = mainC.children[((mainC.children).length)-1]
          shf = 1
      }
      //console.log(wdt)
      mainC.style.transform=`translateX(${(wdt+20)*shf}px)`
      mainC.style.transitionTimingFunction = 'linear';
      mainC.style.transition=vel+'s'
      btnS(true)
      setTimeout(()=>{
          //console.log(fstEl.textContent)
          mainC.style.transition='0s'
          btnS(false)
          if(side == 'l'){

              let centerNow = mainC.children[center+1].getElementsByTagName('span')[0].textContent
              //console.log('this it the value=> '+centerNow)
              centerNow = parseInt(centerNow)

              mainC.removeChild(fstEl);
              mainC.appendChild(fstEl);

              bStyle((centerNow),vel)
          }else{

              let centerNow = mainC.children[center-1].getElementsByTagName('span')[0].textContent
              //console.log('this it the value=> '+centerNow)
              centerNow = parseInt(centerNow)

              mainC.removeChild(fstEl);
              mainC.insertBefore(fstEl,mainC.children[0]);

              bStyle((centerNow),vel)
             // bStyle((mainC.children.length-1)/2)
          }
          mainC.style.transform=`translateX(${0}px)`
      },inter)
  }
  function btnS(vl){
      Array.from(document.getElementsByClassName('btn')).map((el)=>{
          el.disabled = vl
      })
  }

}
  */

}