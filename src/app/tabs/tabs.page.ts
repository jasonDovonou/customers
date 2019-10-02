import { Component, OnDestroy } from '@angular/core';
import { RouterPage } from '../RouterPage';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage extends RouterPage implements OnDestroy {
  constructor(private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter(): void { }
  onDestroy() { super.ngOnDestroy(); }
}
