import { Component, OnInit } from '@angular/core';
import ScreenRecorderProps from './screen-recorder.props';

@Component({
  selector: 'app-screen-recorder',
  templateUrl: './screen-recorder.component.html',
  styleUrls: ['./screen-recorder.component.css']
})
export class ScreenRecorderComponent extends ScreenRecorderProps implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
