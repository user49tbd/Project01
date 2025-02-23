import { Component, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';
import { FileServService } from '../../Services/file-serv.service';
//import { LogDataService } from '../../Services/log-data.service';

@Component({
  selector: 'app-img-layout',
  standalone: false,
  templateUrl: './img-layout.component.html',
  styleUrl: './img-layout.component.css'
})
export class ImgLayoutComponent implements AfterViewInit {
  @Input() field!: string
  @Input() arrV = []
  //arr: any[] = [[1, "/assets/imgs/default-image.jpg"]]
  lst = [
    [1,"/assets/imgs/default-image.jpg"],
    //[2, "/assets/imgs/city.jpg"],
    //[3, "/assets/imgs/cityImage.jpeg"],
    //[4, "/assets/imgs/datacenterhd2.jpg"]
  ]
  arr: any[] = this.lst
  arrPos: any = [];
  arrPos1 = [["0%", "15%", "0%"], ["15%", "15%", "30%"], ["50%", "50%", "100%"],
  ["85%", "25%", "50%"], ["100%", "15%", "0%"]];
  arrPos2 = [["25%", "50%", "100%"], ["75%", "50%", "100%"],
  ["100%", "15%", "0%"], ["0%", "15%", "0%"]];
  arrPos3 = [["50%", "50%", "100%"]];
  arr2 = [...this.arr]
  mainContainer: any
  constructor(private el: ElementRef, private render: Renderer2, private serv: FileServService
    ) {
    //this.mainContainer = el.nativeElement.getElementsByClassName("Frame")[0];
    //console.log(this.mainContainer)
    //this.loadLayout();
    //this.arr = this.lst
  }
  ngAfterViewInit(): void {
    //this.arr = this.lst
    this.mainContainer = this.el.nativeElement.getElementsByClassName("Frame")[0];
    console.log(this.mainContainer)
    //this.arr = (this.arr && this.arr.length > 0) ? this.arr : this.lst
    //console.log(this.arr)
    if (this.arrV.length == 0) {
      this.serv.ev.subscribe((vl) => {
        if (vl.file && vl.file.length > 0) {
          this.arr = [];
          this.arr = [...vl.file]
        } else {
          this.arr = this.lst//[[1, "/assets/imgs/default-image.jpg"]]
        }
        this.arr2 = [...this.arr]
        //this.arr = (vl.file && vl.file.length > 0) ? [...vl.file] : [[1, "public/assets/imgs/bk_bluepolygondark.jpg"]]
        console.log("vlChanged")
        console.log("this is the length -> " + this.arr.length)
        this.removeChild();
        this.loadLayout();
      })
    }else{
      this.arr = [...this.arrV]
    }
    //here
    this.arr = [...this.arrV]
    this.loadLayout();
  }
  exec(vl: string) {
    this.moveSides(vl)
  }
  moveSides(vl: any) {
    let len = (this.arr.length)
    let inc = 0;
    let res = 0
    if (vl == "l") {
      this.moveL()
    } else {
      this.moveR()
    }

    Array.from(this.mainContainer.children).forEach((vlmt) => {
      if (len > inc) {
        res = inc
      } else {
        res = ((inc) - len)
      }
      this.animFun(vlmt, res, vl, inc)
      inc += 1
    })
  }
  animFun(elmnt: any, num: any, dir: any, i: any) {
    //elmnt.style.transition = "0.8s"
    this.render.setStyle(elmnt, 'transition', "0.8s")
    if (dir == "l") {
      this.applyProps(elmnt, i, -1)
    } else {
      this.applyProps(elmnt, i, 1)
    }
    setTimeout(() => {
      //elmnt.style.transition = "0s"
      this.render.setStyle(elmnt, 'transition', "0s")
      this.applyProps(elmnt, i, 0)
      elmnt.textContent = this.arr[num][0]
      //elmnt.style.backgroundImage = `url(${this.arr[num][1]})`
      //console.log("this is the current ")
      this.render.setStyle(elmnt, 'backgroundImage', `url(${this.arr[num][1]})`)
    }, 800)
  }
  applyProps(elmnt: any, num: any, offSet: any) {
    let arrLen = (this.arrPos.length - 1)
    if ((num + offSet) > (arrLen)) {
      this.render.setStyle(elmnt, 'left', `${this.arrPos[(num) - arrLen][0]}`)
      this.render.setStyle(elmnt, 'top', `${this.arrPos[(num) - arrLen][1]}`)
      this.render.setStyle(elmnt, 'height', `${this.arrPos[(num) - arrLen][2]}`)
      //elmnt.style.left = `${arrPos[(num) - arrLen][0]}`
      //elmnt.style.top = `${arrPos[(num) - arrLen][1]}`
      //elmnt.style.height = `${arrPos[(num) - arrLen][2]}`
    } else {
      if ((num + offSet) < 0) {
        this.render.setStyle(elmnt, 'left', `${this.arrPos[arrLen + (num)][0]}`)
        this.render.setStyle(elmnt, 'top', `${this.arrPos[arrLen + (num)][1]}`)
        this.render.setStyle(elmnt, 'height', `${this.arrPos[arrLen + (num)][2]}`)
        //elmnt.style.left = `${arrPos[arrLen + (num)][0]}`
        //elmnt.style.top = `${arrPos[arrLen + (num)][1]}`
        //elmnt.style.height = `${arrPos[arrLen + (num)][2]}`
      } else {
        this.render.setStyle(elmnt, 'left', `${this.arrPos[num + offSet][0]}`)
        this.render.setStyle(elmnt, 'top', `${this.arrPos[num + offSet][1]}`)
        this.render.setStyle(elmnt, 'height', `${this.arrPos[num + offSet][2]}`)
        //elmnt.style.left = `${arrPos[num + offSet][0]}`
        //elmnt.style.top = `${arrPos[num + offSet][1]}`
        //elmnt.style.height = `${arrPos[num + offSet][2]}`
      }
    }

  }
  moveL() {
    let arrLen = this.arr.length
    for (let i = 0; i < arrLen; i++) {
      if (i + 1 < arrLen) {
        this.arr2[i] = this.arr[i + 1]
      } else {
        this.arr2[i] = this.arr[i - (arrLen - 1)]
      }
    }
    this.arr = [...this.arr2]
  }
  moveR() {
    let arrLen = this.arr.length
    for (let i = 0; i < arrLen; i++) {
      if ((i - 1) >= 0) {
        this.arr2[i] = this.arr[i - 1]
      } else {
        this.arr2[i] = this.arr[((arrLen - 1) - i)]
      }
    }
    this.arr = [...this.arr2]
  }
  loadLayout() {
    //console.log("loaded")
    this.removeChild()
    if (this.arr.length > 2) {
      this.arrPos = [...this.arrPos1]
    } else {
      if (this.arr.length == 2) {
        this.arrPos = [...this.arrPos2]
      }
      else {
        this.arrPos = [...this.arrPos3]
      }
    }
    //console.log(arrPos.length)
    for (let i = 0; i < this.arrPos.length; i++) {
      //let element = document.createElement("label")
      //element.classList.add("Item")
      //element.textContent = "default"
      //mainContainer.appendChild(element)
      let element = this.render.createElement("label")
      this.render.addClass(element, "Item")
      this.render.setAttribute(element, 'for', this.field)
      element.textContent = "default"
      this.render.appendChild(this.mainContainer, element)
    }
    this.moveSides("l")
  }
  removeChild() {
    //console.log(this.mainContainer)
    while (this.mainContainer.lastChild) {
      //mainContainer.removeChild(mainContainer.lastChild);
      this.render.removeChild(this.mainContainer, this.mainContainer.lastChild)
    }
  }

}
