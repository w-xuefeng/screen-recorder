import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import DragDirective from './draggable-directive/draggable.directive';
import { ScreenRecorderComponent } from './screen-recorder.component';

@NgModule({
  declarations: [
    DragDirective,
    ScreenRecorderComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    DragDirective,
    ScreenRecorderComponent
  ]
})
export class ScreenRecorderModule { }
