import { Component,OnInit, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-slider-mk01',
  standalone:false,
  templateUrl: './slider-mk01.component.html',
  styleUrl: './slider-mk01.component.css'
})
export class SliderMk01Component implements AfterViewInit{
    isDis:boolean = false;
    timer: any;
    step: number = 0;
    mainDoc1:any
    imgLst1:any
    bList:any
    imglen:any

    constructor(private elRef:ElementRef,private render:Renderer2){

    }
    ngAfterViewInit(): void {
        this.mainDoc1 = this.elRef.nativeElement.getElementsByClassName('sliLayer2')[0];
        this.imgLst1 = this.mainDoc1.querySelectorAll('.item');
        this.bList = this.elRef.nativeElement.getElementsByClassName('ballList')[0];
        this.imglen = this.imgLst1.length;


        //this.step = this.imgLst1[0].getBoundingClientRect().width;
        //console.log('this is the res ')
        //let resF = this.elRef.nativeElement.getElementsByClassName('sliLayer1')[0].offsetWidth
        //console.log(resF/2)
        //console.log(this.imgLst1[0].getBoundingClientRect().width)
        //console.log(this.el.nativeElement.getElementsByClassName('item')[0]);

        if (this.bList) {
            this.imgLst1.forEach(() => {
                let elmt = this.render.createElement('div')
                this.render.addClass(elmt,'ball');
                this.render.appendChild(this.bList,elmt)
                console.log('adding');
            });
        } else {
            console.error('ballList não encontrado!');
        }
        //this.stepF('l')
        this.timer = setInterval(() => {
            // A função stepF não está definida, seria interessante implementá-la ou remover a chamada
            this.stepF('l')
        }, 3500);
    }
    btnBreak(bol:boolean){
        this.isDis = bol
    }
    //--------------------------------
    markB(res:any){
        //console.log('value of the markb function --> '+res)
        res = parseInt(res)
        let exb = 3
        let len = this.bList.children.length
        for(let i=0;i<len;i++){
            if(i>res-exb && i<res+exb){
                this.bList.children[i].style.opacity='1'
                this.bList.children[i].style.display='flex'
                if(i == res){
                    //console.log('here')
                    //console.log(res)
                    this.bList.children[i].style.backgroundColor='red'
                    this.bList.children[i].style.height='100%'
                }
                else{
                    this.bList.children[i].style.backgroundColor='white'
                    let dif = Math.abs(i-res)
                    this.bList.children[i].style.height=`${100-dif*20}%`
                }
            }
            else{
              this.bList.children[i].style.opacity='0'
              this.bList.children[i].style.height='0%'
              this.bList.children[i].style.display='none'
            }
        }
    }
    //---------------------------
    stepF(side:string){
        this.step = this.imgLst1[0].getBoundingClientRect().width;
        clearInterval(this.timer)
        this.btnBreak(true)

        this.mainDoc1 = this.elRef.nativeElement.getElementsByClassName('sliLayer2')[0];
        this.imgLst1 = this.mainDoc1.querySelectorAll('.item');
        if(side=='l'){

            let vlRes = this.imgLst1[(this.imgLst1.length-1)]

            this.mainDoc1.style.setProperty('--res',this.step+'px')

            this.render.addClass(this.mainDoc1,'goL')

            let pos = ((this.imgLst1.length-1)/2)

            this.render.removeClass(this.imgLst1[pos].children[1],'contentA')

            setTimeout(()=>{

                this.render.addClass(this.imgLst1[pos-1].children[1],'contentA')

                this.mainDoc1.prepend(vlRes)

                this.render.removeClass(this.mainDoc1,'goL')

                this.markB(this.imgLst1[pos-1].children[2].textContent)
                this.btnBreak(false)
            },1000)
    
        }
        else{
            let vlRes = this.imgLst1[0]

            this.mainDoc1.style.setProperty('--res','-'+this.step+'px')

            this.render.addClass(this.mainDoc1,'goL')

            let pos = ((this.imgLst1.length-1)/2)

            this.render.removeClass(this.imgLst1[pos].children[1],'contentA')

            setTimeout(()=>{

                this.render.addClass(this.imgLst1[pos+1].children[1],'contentA')

                this.mainDoc1.append(vlRes)

                this.render.removeClass(this.mainDoc1,'goL')

                this.markB(this.imgLst1[pos+1].children[2].textContent)
                this.btnBreak(false)
            },1000)
        }
        this.timer = setInterval(() => {
            this.stepF('l')
        }, 3500);
    

    }

}