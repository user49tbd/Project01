import { Component, Input,AfterViewInit,ElementRef,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-logo-comp',
  standalone:false,
  templateUrl: './logo-comp.component.html',
  styleUrl: './logo-comp.component.css'
})
export class LogoCOmpComponent implements AfterViewInit {

  @Input() imgUrl:string='';
  constructor(private el:ElementRef,private render:Renderer2){

  }
  ngAfterViewInit(): void {
    if (!this.imgUrl) {
      this.imgUrl = '/assets/icons/computer.png';
    }
    requestAnimationFrame(() => {
      let elmt = this.el.nativeElement.getElementsByClassName("bkCo")[0];
      if (elmt) {
        this.render.setStyle(elmt, "-webkit-mask-image", `url("${this.imgUrl}")`);
        this.render.setStyle(elmt, "mask-image", `url("${this.imgUrl}")`);
        //this.render.setStyle(elmt, "border","2px solid red");
      } else {
        console.error("Elemento com a classe 'bkCo' não encontrado.");
      }
    });
  }

}
