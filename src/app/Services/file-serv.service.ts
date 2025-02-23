import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileServService {
  fileLst:any
  @Output() ev = new EventEmitter();
  constructor() { }
  changeFile(value:any){
    this.fileLst=value
    this.ev.emit({file:this.fileLst})
  }
}
