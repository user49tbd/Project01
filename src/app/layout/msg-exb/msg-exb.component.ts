import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-exb',
  standalone:false,
  templateUrl: './msg-exb.component.html',
  styleUrl: './msg-exb.component.css'
})
export class MsgExbComponent {
  @Input() msg=''
  constructor(){
    if(this.msg == ''){
      this.msg="Some error Happened"
    }
  }
}
