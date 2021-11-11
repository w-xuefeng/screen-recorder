# ScreenRecorder for Angular
An Angular component that can record the screen

[简体中文](./README_zh_CN.md) | English


## Install

```bash
npm install screen-recorder-angular --save
```

## Usage

- 1 . Simple use

  - in app.module.ts

  ```ts
  import { ScreenRecorderModule } from 'screen-recorder-angular';

  @NgModule({
    // ...
    imports: [
      // ...
      ScreenRecorderModule
    ]
  })
  ```
  - in app.component.html

  ```html
    <!-- your ohter content -->
    <app-screen-recorder></app-screen-recorder>
    <!-- your ohter content -->
  ```

- 2 . Enable preview and customize some information

  - in app.module.ts

  ```ts
  import { ScreenRecorderModule } from 'screen-recorder-angular';

  @NgModule({
    // ...
    imports: [
      // ...
      ScreenRecorderModule
    ]
  })
  ```
  - in app.component.ts

  ```ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    // your other content...

    videoOptions: MediaTrackConstraints = {
      width: 1920,
      height: 1080,
      frameRate: 60,
    };    
  }
  
  ```

  - in app.component.html

  ```html
    <!-- your ohter content -->
    <app-screen-recorder
      [preview]="true"
      shortKey="Alt+Shift+R"
      startBtnText="🛫 开始"
      startBtnStyle="color:#48bfa7"
      endBtnText="🛑 结束"
      endBtnStyle="color: red"
      [videoOptions]="videoOptions"
    >
    </app-screen-recorder>
    <!-- your ohter content -->
  ```


- 3 . Listening event callback

  - in app.module.ts

  ```ts
  import { ScreenRecorderModule } from 'screen-recorder-angular';

  @NgModule({
    // ...
    imports: [
      // ...
      ScreenRecorderModule
    ]
  })
  ```
  - in app.component.ts

  ```ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    // your other content...

    onStart = (event: { mediaStream: MediaStream }) => {
      /** Your logic code **/
    }

    onError = (event: { err: unknown }) => {
      /** Your logic code **/
    }

    onUnsupport = () => {
      /** Your logic code **/
    }
    
    onEnd = (event: { url: string, blob: Blob }) => {
      /** Your logic code **/
    }
  }
  
  ```

  - in app.component.html

  ```html
    <!-- your other content -->
    <app-screen-recorder
      [preview]="true"
      (onRecordingStart)="onStart($event)"
      (onRecordingEnd)="onEnd($event)"
      (onRecordingUnsupport)="onUnsupport()"
      (onRecordingError)="onError($event)"
    >
    </app-screen-recorder>
    <!-- your other content -->
  ```

- 4 . Custom view

  - in app.module.ts

  ```ts
  import { ScreenRecorderModule } from 'screen-recorder-angular';

  @NgModule({
    // ...
    imports: [
      // ...
      ScreenRecorderModule
    ]
  })
  ```
  - in app.component.ts

  ```ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    // your other content...

    recording = false

    start = (startEvent: Function) => {
      startEvent();
      this.recording = true;
    };

    customRecordingEnd = ({ url }: { url: string }) => {
      this.recording = false;
      console.log(url);
      // to do sth for url
    };  
  }
  
  ```

  - in app.component.html

  ```html
    <!-- your ohter content -->
    <app-screen-recorder
      [preview]="true"
      (onRecordingEnd)="customRecordingEnd($event)"
    >
      <ng-template startContent let-startEvent="startEvent">
        <!-- your custom view for startContent -->
        <button *ngIf="!recording" (click)="start(startEvent)">
          开始录屏
        </button>
      </ng-template>

      <ng-template endContent let-endEvent="endEvent">
        <!-- your custom view for endContent -->
        <button *ngIf="recording" (click)="endEvent()">
          结束录屏
        </button>
      </ng-template>

      <ng-template previewContent let-mediaStream="mediaStream">
        <!-- your custom view for previewContent -->
        <video
          muted
          autoplay
          width="500"
          style="display: block;"
          [srcObject]="mediaStream"
        >
        </video>
      </ng-template>

    </app-screen-recorder>
    <!-- your ohter content -->
  ```

## props

| propsName       | required | type                  | default    | desc                                                                                                   |
| --------------- | -------- | --------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| `shortKey`      | false    | string                | -          | shortcut key for starting, if you set shortcut, `ESC` will be set as the shortcut key to end recording |
| `preview`       | false    | boolean               | false      | show preview                                                                                           |
| `videoOptions`  | false    | MediaTrackConstraints | -          | video options                                                                                          |
| `startBtnText`  | false    | string                | `开始录屏` | the text for start-button                                                                              |
| `startBtnStyle` | false    | string                | -          | the style for start-button                                                                             |
| `endBtnText`    | false    | string                | `结束录屏` | the text for end-button                                                                                |
| `endBtnStyle`   | false    | string                | -          | the style for end-button                                                                               |

## events

| eventsName             | paramList                           | desc                     |
| ---------------------- | ----------------------------------- | ------------------------ |
| `onRecordingStart`     | { `mediaStream`: MediaStream }     | recorder start           |
| `onRecordingEnd`       | { `blobUrl`: string, `blob`: Blob } | recorder end             |
| `onRecordingUnsupport` |  void                                 | recorder API unsupported |
| `onRecordingError`     | { `err`: unknown }                  | recorder error           |

## projection

| projection-selector    | context-parameter-list                                                          | desc                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startContent`   | { startEvent: Function, endEvent: Function } | Customize the view that triggers the start screen recording event；<br/>`startEvent `: start screen recording,<br/> ` endEvent `: end screen recording  |
| `endContent`     | { endEvent: Function, startEvent: Function } | Customize the view that triggers the end screen recording event;<br/> ` endEvent `: end screen recording, <br/>`startEvent `: start screen recording    |
| `previewContent` | { mediaStream: MediaStream } | Customize video preview,<br/>`mediaStream`: it is the captured screen media stream, which can be assigned to the scrobject of video to preview and play |
