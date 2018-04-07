import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiplyDirective } from './multiply.directive';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MultiplyDirective) mulDirective;
  
  multiplicand: number;
  multiplier: number;
  multipliedResult: number;

  isMultiplicandHasError: boolean = true;
  isMultiplierError: boolean = true;
  isButtonDisabled: boolean = true;
  
  appLogoPath: String = 'assets/images/math-signs.png';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    let data = this.dataService.getData().subscribe((savedData: any) => {
      this.multiplicand = savedData.multiplicand;
      this.multiplier = savedData.multiplier;
      this.multipliedResult = savedData.multipliedResult;

      this.isMultiplicandHasError = false;
      this.isMultiplierError = false;
      this.isButtonDisabled = false;
    })
  }

  checkInput(event) {
    if (isNaN(event.srcElement.value) || (parseInt(event.srcElement.value) < 0) || (event.srcElement.value === "")) {
      this.isButtonDisabled = true;
      if (event.srcElement.name === 'multiplicandCtrl') {
        this.isMultiplicandHasError = true;
      }
      if (event.srcElement.name === 'multiplierCtrl') {
        this.isMultiplierError = true;
      }
    }
    else {
      if (event.srcElement.name === 'multiplicandCtrl' && this.multiplicand != undefined) {
        this.isMultiplicandHasError = false;
      }
      if (event.srcElement.name === 'multiplierCtrl' && this.multiplier != undefined) {
        this.isMultiplierError = false;
      }
      if (this.isMultiplicandHasError === false && this.isMultiplierError === false) {
        this.isButtonDisabled = false;
      }
    }
  }

  Multiply() {
    this.mulDirective.multiplicand = this.multiplicand;
    this.mulDirective.multiplier = this.multiplier;

    this.mulDirective.result.subscribe((res) => {
      this.multipliedResult = res;
    });

    this.mulDirective.multiplyInputs();
  }

  saveData() {
    const payload: any = {};
    payload.multiplicand = this.multiplicand;
    payload.multiplier = this.multiplier;
    payload.multipliedResult = this.multipliedResult;

    this.dataService.saveData(payload).subscribe((data) => {
      console.log(data);
    });
  }

}
