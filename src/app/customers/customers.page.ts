import { Component, OnDestroy } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-customers',
  templateUrl: 'customers.page.html',
  styleUrls: ['customers.page.scss']
})
export class CustomersPage extends RouterPage implements OnDestroy {
  faPlusCircle = faPlusCircle;
  customers: any[] = [];
  constructor(private db: DatabaseService, private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter() {
    this.db.loadCustomers();
    this.db.getCustomers().subscribe(customers => {
      this.customers = customers;
    })
  }
  new() {
    this.router.navigate(['/detail/-1']);
  }
  onDestroy() { super.ngOnDestroy(); }

}
