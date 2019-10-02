import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Customer } from '../customers/model/Customer';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;

  customers = new BehaviorSubject([]);
  init = 'CREATE TABLE IF NOT EXISTS customer(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, firstname TEXT, cp TEXT, city TEXT, number TEXT, phone TEXT, office TEXT, other TEXT, period INTEGER,last TEXT,next TEXT)';

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.sqlite.create({
      name: 'customer.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.database.executeSql(this.init, []).then(_ => {
          this.loadCustomers();
        });
      });
  }

  getCustomers(): Observable<Customer[]> {
    return this.customers.asObservable();
  }

  loadCustomers() {
    return this.database.executeSql('SELECT * FROM customer', []).then(data => {
      let customers: Customer[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          customers.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            firstname: data.rows.item(i).firstname,
            cp: data.rows.item(i).cp,
            city: data.rows.item(i).city,
            number: data.rows.item(i).number,
            phone: data.rows.item(i).phone,
            office: data.rows.item(i).office,
            period: data.rows.item(i).period,
            last: data.rows.item(i).last,
            next: data.rows.item(i).next,
            other: data.rows.item(i).other,
          });
        }
      }
      this.customers.next(customers);
    });
  }

  addCustomer(customer) {
    return this.database.executeSql('INSERT INTO customer (name,firstname,cp,city,number,phone,office,last,period,next,other) VALUES("' + customer.name + '","' + customer.firstname + '","' + customer.cp + '","' + customer.city + '","' + customer.number + '","' + customer.phone + '","' + customer.office + '","' + customer.last + '","' + customer.period + '","' + customer.next + '","' + customer.other + '")', []).then(data => {
      this.loadCustomers();
    });
  }

  getCustomer(id): Promise<Customer> {
    return this.database.executeSql('SELECT * FROM customer WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name,
        firstname: data.rows.item(0).firstname,
        cp: data.rows.item(0).cp,
        city: data.rows.item(0).city,
        number: data.rows.item(0).number,
        phone: data.rows.item(0).phone,
        office: data.rows.item(0).office,
        other: data.rows.item(0).other,
        period: data.rows.item(0).period,
        last: data.rows.item(0).last,
        next: data.rows.item(0).next,
      }
    });
  }

  deleteCustomer(id) {
    return this.database.executeSql('DELETE FROM customer WHERE id = ?', [id]).then(_ => {
      this.loadCustomers();
    });
  }

  updateCustomer(customer: Customer) {
    let data = [customer.name, customer.firstname, customer.cp, customer.city, customer.number, customer.phone, customer.office, customer.last, customer.period, customer.next, customer.other];
    return this.database.executeSql(`UPDATE customer SET name = ?,firstname = ?,cp = ?,city = ?,number = ?,phone = ?,office = ?,last = ?,period = ?,next = ?,other = ?  WHERE id = ${customer.id}`, data).then(data => {
      this.loadCustomers();
    })
  }
}