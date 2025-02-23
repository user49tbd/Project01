import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-txt-area',
  standalone:false,
  templateUrl: './input-txt-area.component.html',
  styleUrl: './input-txt-area.component.css',
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=>InputTxtAreaComponent),
      multi:true
    }
  ]
})
export class InputTxtAreaComponent implements ControlValueAccessor{
    @Input() idV!:string
    @Input() getInv!:any
    @Input() cls!:any
  
    onTouched:()=>void =()=>{};
    onDisable!:boolean;
  
    constructor(){
      //console.log("inputComponent")
    }
    WriteVal:()=>void =()=>{}
    value:any=''
    onChange:(value:any)=>void =()=>{}

  writeValue(obj: any): void {
    this.value = obj
    //throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
    //throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
    //throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    this.onDisable = isDisabled
    //throw new Error('Method not implemented.');
  }

}
