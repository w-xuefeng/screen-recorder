
# ScreenRecorder for Angular
一个可以录制屏幕的 Angular 组件

简体中文 | [English](./README.md)

## 安装

```bash
npm install screen-recorder-angular --save
```

## 使用

- 1 . 简单实用

  - 在 app.module.ts 文件中

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
  - 在 app.component.html 文件中

  ```html
    <!-- 你的其他内容 -->
    <app-screen-recorder></app-screen-recorder>
    <!-- 你的其他内容 -->
  ```

- 2 . 启用预览并且自定义一些属性信息

  - 在 app.module.ts 文件中

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
  - 在 app.component.ts 文件中

  ```ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    // 你的其他内容...

    videoOptions: MediaTrackConstraints = {
      width: 1920,
      height: 1080,
      frameRate: 60,
    };    
  }
  
  ```

  - 在 app.component.html 文件中

  ```html
    <!-- 你的其他内容 -->
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
    <!-- 你的其他内容 -->
  ```


- 3 . 监听事件回调

  - 在 app.module.ts 文件中

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
  - 在 app.component.ts 文件中

  ```ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    // 你的其他内容...

    onStart = (event: { mediaStream: MediaStream }) => {
      /** 你的逻辑代码 **/
    }

    onError = (event: { err: unknown }) => {
      /** 你的逻辑代码 **/
    }

    onUnsupport = () => {
      /** 你的逻辑代码 **/
    }
    
    onEnd = (event: { url: string, blob: Blob }) => {
      /** 你的逻辑代码 **/
    }
  }
  
  ```

  - 在 app.component.html 文件中

  ```html
    <!-- 你的其他内容 -->
    <app-screen-recorder
      [preview]="true"
      (onRecordingStart)="onStart($event)"
      (onRecordingEnd)="onEnd($event)"
      (onRecordingUnsupport)="onUnsupport()"
      (onRecordingError)="onError($event)"
    >
    </app-screen-recorder>
    <!-- 你的其他内容 -->
  ```

- 4 . 自定义投影视图

  - 在 app.module.ts 文件中

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
  - 在 app.component.ts 文件中

  ```ts
  import { Component } from '@angular/core';

  @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {

    // 你的其他内容...

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

  - 在 app.component.html 文件中

  ```html
    <!-- 你的其他内容 -->
    <app-screen-recorder
      [preview]="true"
      (onRecordingEnd)="customRecordingEnd($event)"
    >
      <ng-template startContent let-startEvent="startEvent">
        <!-- 你的自定义开始视图投影 -->
        <button *ngIf="!recording" (click)="start(startEvent)">
          开始录屏
        </button>
      </ng-template>

      <ng-template endContent let-endEvent="endEvent">
        <!-- 你的自定义结束视图投影 -->
        <button *ngIf="recording" (click)="endEvent()">
          结束录屏
        </button>
      </ng-template>

      <ng-template previewContent let-mediaStream="mediaStream">
        <!-- 你的自定义预览视图投影 -->
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
    <!-- 你的其他内容 -->
  ```

## props

| props 名称 | 是否必须 | 类型 | 默认值 | 描述 |
| - | - | - | - | - |
| `shortKey` | false | string | - | 开始录屏的快捷键，如果不为空，则自动将 `ESC` 设为结束录制的快捷键 |
| `preview` | false | boolean | false | 显示预览 |
| `videoOptions` | false | MediaTrackConstraints | - | 视频选项设置 |
| `startBtnText` | false | string | `开始录屏` | 开始按钮的文案 |
| `startBtnStyle` | false | string | - | 开始按钮的样式 |
| `endBtnText` | false | string | `结束录屏` | 结束按钮的文案 |
| `endBtnStyle` | false | string | - | 结束按钮的样式 |

## events

| 事件名称 | 参数列表 | 描述 |
| - | - | - |
| `onRecordingStart` | { `mediaStream`: MediaStream } | 开始录屏 |
| `onRecordingEnd` | { `blobUrl`: string, `blob`: Blob } | 结束录屏 |
| `onRecordingUnsupport` | void | 浏览器不支持 API |
| `onRecordingError` | { `err`: unknown } | 录屏出现错误 |

## projection

| 投影选择器名称 | 上下文参数列表 | 描述 |
| - | - | - |
| `startContent` | { startEvent: Function, endEvent: Function } | 自定义触发开始录屏事件的视图; <br/>`startEvent`：开始录屏，<br/>`endEvent`：结束录屏   |
| `endContent` | { endEvent: Function, startEvent: Function } | 自定义触发结束录屏事件的视图; <br/>`endEvent`：结束录屏，<br/>`startEvent`：开始录屏 |
| `previewContent` | { mediaStream: MediaStream } | 自定义 video 预览视图; <br/>`mediaStream`: 捕获的屏幕媒体流，可赋值给 video 的 scrObject 实现播放预览 |
