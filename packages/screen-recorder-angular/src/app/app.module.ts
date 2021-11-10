import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreenRecorderComponent } from './screen-recorder/screen-recorder.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenRecorderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
