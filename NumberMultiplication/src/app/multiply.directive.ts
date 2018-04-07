import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[multiply-directive]'
})
export class MultiplyDirective {

  @Input() multiplicand: number;
  @Input() multiplier: number;
  @Output() result = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) { }

  multiplyInputs(){
    let multipliedValue = this.multiplicand * this.multiplier;
    // this.elementRef.nativeElement.value = multipliedValue; // one way to reflect multiplied value in result textbox
    this.result.emit(multipliedValue); // another way to reflect multiplied value in result textbox
  }
}
