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
  search: boolean;
  pattern: string;
  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter(): void {
    if (!localStorage.getItem('display')) localStorage.setItem('display', this.display.toString());
    else this.display = Number(localStorage.getItem('display'));
    this.db.getCustomers().subscribe(customers => {
      const date = Customer.addDays(new Date(), Number(this.display));
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
  save() {
    if (this.display > 0) {
      localStorage.setItem('display', this.display.toString());
      this.db.loadCustomers();
    }
  }
  new() { this.router.navigate(['/detail/-1']); }
  switch(type) {
    switch (type) {
      case 'visit':
        this.handler(this.visits, 'A Visiter', false, false);
        break;
      case 'activ':
        this.handler(this.actives, 'Actifs', false, false);
        break;
      case 'inactiv':
        this.handler(this.inactives, 'Inactifs', false, false);
        break;
      case 'settings':
        this.handler(this.visits, 'A Visiter', true, false);
        break;
      case 'search':
        this.handler(this.customers, 'Recherche', false, true);
        break;
      default:
        break;
    }
  }
  handler(displayed: Customer[], title: string, settings: boolean, search: boolean) {
    this.displayed = displayed;
    this.title = title;
    this.settings = settings;
    this.search = search;
  }
  searching() {
    this.displayed = this.customers.filter(customer => {
      return customer.name.toLocaleUpperCase().includes(this.pattern.toLocaleUpperCase()) || customer.firstname.toLocaleUpperCase().includes(this.pattern.toLocaleUpperCase());
    })
  }
  onDestroy() { super.ngOnDestroy(); }
}
