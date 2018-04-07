import { TestBed } from '@angular/core/testing';
import { inject, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MultiplyDirective } from './multiply.directive';

describe('AppComponent', () => {
  let component: AppComponent;
  let mulDirective: MultiplyDirective
  let fixture: ComponentFixture<AppComponent>;

  // register all required dependencies
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, MultiplyDirective],
      imports: [CommonModule, FormsModule],
      providers: []
    });
  });

  // instantiation through framework injection
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.mulDirective = this.mulDirective;
  });

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });

  it(' - Any value -1 or less should cause the button to be disabled ', () => {
    let multiplicandCtrlinputElement: HTMLInputElement;
    multiplicandCtrlinputElement = fixture.nativeElement.querySelector('input[name=multiplicandCtrl]');

    let multiplierCtrlinputElement: HTMLInputElement;
    multiplierCtrlinputElement = fixture.nativeElement.querySelector('input[name=multiplierCtrl]');

    multiplicandCtrlinputElement.value = "-1";
    multiplicandCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "-",
      bubbles: true,
      cancelable: true
    }));
    multiplierCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "1",
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    multiplierCtrlinputElement.value = "-1";
    multiplierCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "-",
      bubbles: true,
      cancelable: true
    }));
    multiplierCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "1",
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    expect(component.isButtonDisabled).toEqual(true);
    expect(component.isMultiplicandHasError).toEqual(true);
    expect(component.isMultiplierError).toEqual(true);
  });

  it(' - value => 0 should be considered a valid input ', () => {
    // first button will be in disabled state
    expect(component.isButtonDisabled).toEqual(true);

    let multiplicandCtrlinputElement: HTMLInputElement;
    multiplicandCtrlinputElement = fixture.nativeElement.querySelector('input[name=multiplicandCtrl]');

    let multiplierCtrlinputElement: HTMLInputElement;
    multiplierCtrlinputElement = fixture.nativeElement.querySelector('input[name=multiplierCtrl]');

    multiplicandCtrlinputElement.value = "1";
    component.multiplicand = 1;
    multiplicandCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "1",
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    multiplierCtrlinputElement.value = "1";
    component.multiplier = 1;
    multiplierCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "1",
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    // after valid values are entered in textboxes, button shall be enabled
    expect(component.isButtonDisabled).toEqual(false);
    expect(component.isMultiplicandHasError).toEqual(false);
    expect(component.isMultiplierError).toEqual(false);
  });

  it(' - Any text values should cause the button to be disabled', () => {

    let multiplicandCtrlinputElement: HTMLInputElement;
    multiplicandCtrlinputElement = fixture.nativeElement.querySelector('input[name=multiplicandCtrl]');

    let multiplierCtrlinputElement: HTMLInputElement;
    multiplierCtrlinputElement = fixture.nativeElement.querySelector('input[name=multiplierCtrl]');

    multiplicandCtrlinputElement.value = "a";
    multiplicandCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "a",
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    multiplierCtrlinputElement.value = "b";
    multiplierCtrlinputElement.dispatchEvent(new KeyboardEvent("keyup", {
      key: "b",
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    expect(component.isButtonDisabled).toEqual(true);
    expect(component.isMultiplicandHasError).toEqual(true);
    expect(component.isMultiplierError).toEqual(true);
  });

});
