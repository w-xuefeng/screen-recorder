import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "screen-recorder-angular"

  recording = false

  videoOptions: MediaTrackConstraints = {
    width: 1920,
    height: 1080,
    frameRate: 60,
  };

  start = (startEvent: Function) => {
    startEvent();
    this.recording = true;
  };

  recordingEnd = ({ url }: { url: string }) => {
    console.log(url);
    // to do sth for url
  };

  customRecordingEnd = ({ url }: { url: string }) => {
    this.recording = false;
    console.log(url);
    // to do sth for url
  };
}
