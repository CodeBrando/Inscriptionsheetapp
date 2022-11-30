import { Component } from '@angular/core';
import { UiService } from './services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inscription Sheet';
  showLastEnrolled!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggleLastEnrolled().subscribe((value) => (this.showLastEnrolled = value));
   }

  toggleShowLastEnrolled(){
    this.uiService.toggleLastEnrolled();
  }
}
