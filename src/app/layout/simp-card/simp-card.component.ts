import { Component, Input,AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-simp-card',
  standalone:false,
  templateUrl: './simp-card.component.html',
  styleUrl: './simp-card.component.css'
})
export class SimpCardComponent implements AfterViewInit{
  @Input() iconI:string='' 
  @Input() imgI:string=''
  @Input() titleI:string=''
  @Input() descI:string=''

  constructor(private rend:Renderer2,private el:ElementRef){

  }
  ngAfterViewInit(): void {
    let bk = this.el.nativeElement.getElementsByClassName("bk")[0];
    if (bk) {
        this.rend.setStyle(bk, "background-image", `url("${this.imgI}")`);
    }

    /*
    let card = this.el.nativeElement.getElementsByClassName("card")[0];
    if (card && card.children.length > 0) {
        let cImg = card.children[0];
        console.log(cImg)
        this.rend.setAttribute(cImg, "imgUrl", this.iconI);
    }*/
}

}
