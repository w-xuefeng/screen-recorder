import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScreenRecorderModule } from './screen-recorder/screen-recorder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScreenRecorderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
