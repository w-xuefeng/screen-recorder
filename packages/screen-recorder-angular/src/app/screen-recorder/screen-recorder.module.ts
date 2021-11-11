import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import DragDirective from './draggable-directive/draggable.directive';
import { ScreenRecorderComponent } from './screen-recorder.component';
import { StartContentDirective, EndContentDirective, PreviewContentDirective } from './screen-recorder.props';

@NgModule({
  declarations: [
    DragDirective,
    StartContentDirective,
    EndContentDirective,
    PreviewContentDirective,
    ScreenRecorderComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    DragDirective,
    StartContentDirective,
    EndContentDirective,
    PreviewContentDirective,
    ScreenRecorderComponent
  ]
})
export class ScreenRecorderModule { }
