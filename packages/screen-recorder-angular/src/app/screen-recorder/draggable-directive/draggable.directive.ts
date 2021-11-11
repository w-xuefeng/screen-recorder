import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({ selector: '[draggable]' })
export default class DragDirective implements OnInit {

  constructor(public el: ElementRef) {
  }

  public isDown = false;
  public disX!: number;
  public disY!: number;
  private totalOffsetX = 0;
  private totalOffsetY = 0;


  @HostListener('mousedown', ['$event']) onMousedown(event: MouseEvent) {
    this.isDown = true;
    this.disX = event.clientX;
    this.disY = event.clientY;
  }

  @HostListener('document:mousemove', ['$event']) onMousemove(event: MouseEvent) {
    if (this.isDown) {
      this.el.nativeElement.style.left = this.totalOffsetX + event.clientX - this.disX + 'px';
      this.el.nativeElement.style.top = this.totalOffsetY + event.clientY - this.disY + 'px';
    }
  }

  @HostListener('document:mouseup', ['$event']) onMouseup(event: MouseEvent) {
    if (this.isDown) {
      this.totalOffsetX += event.clientX - this.disX;
      this.totalOffsetY += event.clientY - this.disY;
      this.isDown = false;
    }
  }

  ngOnInit() {
    this.el.nativeElement.style.position = 'fixed';
    this.totalOffsetX = parseFloat(getComputedStyle(this.el.nativeElement).left);
    this.totalOffsetY = parseFloat(getComputedStyle(this.el.nativeElement).top);
  }
}
