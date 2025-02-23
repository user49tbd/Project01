import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-buton-c',
  standalone:false,
  templateUrl: './buton-c.component.html',
  styleUrl: './buton-c.component.css',
})
export class ButonCComponent{
  @Input() txt!:string
  @Input() stlCls!:string
}
