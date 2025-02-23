import { Component, forwardRef, Input, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-componenet',
  standalone:false,
  templateUrl: './input-componenet.component.html',
  styleUrl: './input-componenet.component.css',
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InputComponenetComponent),
      multi:true
    }
  ]
})
export class InputComponenetComponent implements ControlValueAccessor{

  @Input() idV!:string
  @Input() typeI!:string
  @Input() getInv!:any
  @Input() cls!:any
  @Input() nameI!:string

  onTouched:()=>void =()=>{};
  onDisable!:boolean;

  constructor(){
    console.log("inputComponent")
  }
  WriteVal:()=>void =()=>{}
  value:any=''
  onChange:(value:any)=>void =()=>{}

  writeValue(obj: any): void {
    this.value = obj
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.onDisable = isDisabled
  }

}
