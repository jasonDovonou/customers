import { Component, OnDestroy } from '@angular/core';
import { RouterPage } from '../RouterPage';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Customer } from './model/Customer';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html'
})
export class TabsPage extends RouterPage implements OnDestroy {
  faPlusCircle = faPlusCircle;
  display = 7;
  customers: Customer[];
  displayed: Customer[];
  visits: Customer[];
  actives: Customer[];
  inactives: Customer[];
  settings: boolean;
  title = 'A Visiter';
  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter(): void {
    if (!localStorage.getItem('display')) localStorage.setItem('display', this.display.toString());
    else this.display = Number(localStorage.getItem('display'));
    const date = Customer.addDays(new Date(), Number(this.display));
    this.db.getCustomers().subscribe(customers => {
      this.visits = [];
      this.actives = [];
      this.inactives = [];
      this.customers = customers;
      customers.forEach(customer => {
        if (customer.next && new Date(customer.next) <= date) this.visits.push(customer);
        if (customer.active) this.actives.push(customer);
        else this.inactives.push(customer);
      })
      this.title = 'A Visiter';
      this.displayed = this.visits;
    })
  }
  save() { if (this.display > 0) localStorage.setItem('display', this.display.toString()); this.db.loadCustomers(); }
  new() { this.router.navigate(['/detail/-1']); }
  switch(type) {
    switch (type) {
      case 'visit':
        this.displayed = this.visits;
        this.title = 'A Visiter';
        this.settings = false;
        break;
      case 'activ':
        this.displayed = this.actives;
        this.title = 'Actifs';
        this.settings = false;
        break;
      case 'inactiv':
        this.displayed = this.inactives;
        this.title = 'Inactifs';
        this.settings = false;
        break;
      case 'settings':
        this.title = 'Reglages';
        this.settings = true;
        break;
      default:
        break;
    }
  }
  onDestroy() { super.ngOnDestroy(); }
}
