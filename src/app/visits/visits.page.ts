import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../customers/model/Customer';
import { DatabaseService } from '../services/database.service';
import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.page.html',
  styleUrls: ['./visits.page.scss'],
})
export class VisitsPage extends RouterPage implements OnDestroy {
  customers: any[] = [];
  display = 7;
  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter() {
    if (!localStorage.getItem('display')) localStorage.setItem('display', this.display.toString());
    else this.display = Number(localStorage.getItem('display'));
    const date = Customer.addDays(new Date(), Number(this.display));
    this.db.getCustomers().subscribe(customers => {
      this.customers = customers.filter(customer => {
        return new Date(customer.next) <= date
      })
    })
  }
  onDestroy() { super.ngOnDestroy(); }
}
