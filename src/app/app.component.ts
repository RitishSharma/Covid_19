import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CovidDashboard';
  activeTab: number = 0;

  onTabChange(event) {
    this.activeTab = event.index;
  }
  
}
