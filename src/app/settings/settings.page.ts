import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterPage } from '../RouterPage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage extends RouterPage implements OnDestroy {
  display: Number;
  constructor(private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter() { this.display = Number(localStorage.getItem('display')); }
  save() { if (this.display > 0) localStorage.setItem('display', this.display.toString()); }
  onDestroy() { super.ngOnDestroy(); }
}
