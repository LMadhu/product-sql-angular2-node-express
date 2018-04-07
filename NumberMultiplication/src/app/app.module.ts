import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MultiplyDirective } from './multiply.directive';
import { DataService } from './service/data.service';


@NgModule({
  declarations: [
    AppComponent,
    MultiplyDirective
  ],
  exports: [
    AppComponent,
    MultiplyDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
