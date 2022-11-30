import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-second-button',
  templateUrl: './second-button.component.html',
  styleUrls: ['./second-button.component.css']
})
export class SecondButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() color!: string;
  @Output() btnClickForUpdate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClickForUpdate(){
    this.btnClickForUpdate.emit();
  }

}
