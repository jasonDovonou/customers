import { Component, OnDestroy } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../customers/model/Customer';
import { AlertController } from '@ionic/angular';
import { RouterPage } from '../RouterPage';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage extends RouterPage implements OnDestroy {
  id: string;
  customer = new Customer();
  changed: boolean;
  changedd: boolean;
  constructor(public alertController: AlertController, private db: DatabaseService, private router: Router, private route: ActivatedRoute) { super(router, route) }
  onEnter() {
    this.id = this.router.url.split(/[//]/)[2];
    if (this.id !== '-1')
      this.db.getCustomer(this.id).then(cus => {
        this.customer = cus;
      });
  }
  async  add(add: boolean) {
    if (this.customer.period < 1) {
      const popup = await this.alertController.create({
        header: 'Sauvegarde',
        message: 'Attention la périodicité est nulle, voulez-vous quand même sauvegarder ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => { }
          }, {
            text: 'Oui',
            handler: () => {
              this.save(add);
            }
          }
        ]
      });
      await popup.present();
    } else this.save(add);
  }
  async  delete() {
    const popup = await this.alertController.create({
      header: 'Suppression',
      message: 'Etes-vous sur de vouloir supprimer les données ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => { }
        }, {
          text: 'Oui',
          handler: () => {
            this.db.deleteCustomer(this.customer.id);
            this.back();
          }
        }
      ]
    });
    await popup.present();
  }
  calc() {
    if (!this.changedd) {
      this.changed = true;
      let last = new Date(this.customer.last);
      let date = new Date(last.setDate(last.getDate() + (this.customer.period * 7)));
      this.customer.next = Customer.convertDate(date);
    } else this.changedd = false;
  }
  calculate() {
    if (!this.changed) {
      this.changedd = true;
      let next = new Date(this.customer.next);
      let last = new Date(this.customer.last);
      this.customer.period = this.weeksBetween(next, last);
    } else this.changed = false;
  }
  save(add: boolean) {
    if (add) this.db.addCustomer(this.customer);
    else this.db.updateCustomer(this.customer);
    this.back();
  }
  weeksBetween(d1, d2) { return Math.round((d1 - d2) / (7 * 24 * 60 * 60 * 1000)); }
  back() { this.router.navigate(['/']); }
  onDestroy() { super.ngOnDestroy(); }
}


