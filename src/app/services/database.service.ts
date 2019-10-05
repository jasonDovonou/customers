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
  init = 'CREATE TABLE IF NOT EXISTS actives(id INTEGER PRIMARY KEY AUTOINCREMENT,start TEXT,type TEXT,sex TEXT, name TEXT, firstname TEXT,adress TEXT, cp TEXT, city TEXT, fixe TEXT, phone TEXT, office TEXT, fax TEXT, others TEXT, resident TEXT,activity TEXT,origin TEXT,age TEXT,water TEXT,machine TEXT,soft TEXT,infos TEXT,tarif TEXT,model TEXT,invoice TEXT, period INTEGER,last TEXT,next TEXT)';

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.sqlite.create({
      name: 'customer.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db; this.database.executeSql(this.init, []).then(_ => {
          /* this.http.get('assets/seed.sql', { responseType: 'text' })
            .subscribe(sql => {
              this.sqlitePorter.importSqlToDb(this.database, sql).then(_ => {
                alert("done");
                this.loadCustomers();
              })
                .catch(e => console.error(e));
            }); */
          /*           this.sqlitePorter.importSqlToDb(this.database, "INSERT INTO actives(id,start,type,sex,name,firstname,adress,cp,city,fixe,phone,office,fax,others,resident,activity,origin,age,water,machine,soft,infos,tarif,model,invoice) VALUES (115,'05/10/2018','Client',' ','Bertinelli','Sylvie','rue des anciens combattant','11420','LAFAGE',' ',' ',' ',' ',' ','0',' ',' ',' ',' ','non','non',' ','Tarif catalogue','Standard','TTC');").then(_ => {
                      alert("done");
                      this.loadCustomers();
                    }) */
        });
      });
  }

  getCustomers(): Observable<Customer[]> {
    return this.customers.asObservable();
  }

  loadCustomers() {
    return this.database.executeSql('SELECT * FROM actives', []).then(data => {
      let customers: Customer[] = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          customers.push({
            id: data.rows.item(i).id,
            start: data.rows.item(i).start,
            type: data.rows.item(i).type,
            sex: data.rows.item(i).sex,
            name: data.rows.item(i).name,
            firstname: data.rows.item(i).firstname,
            adress: data.rows.item(i).adress,
            cp: data.rows.item(i).cp,
            city: data.rows.item(i).city,
            fixe: data.rows.item(i).fixe,
            phone: data.rows.item(i).phone,
            office: data.rows.item(i).office,
            fax: data.rows.item(i).fax,
            other: data.rows.item(i).other,
            resident: data.rows.item(i).resident,
            activity: data.rows.item(i).activity,
            origin: data.rows.item(i).origin,
            age: data.rows.item(i).age,
            water: data.rows.item(i).water,
            machine: data.rows.item(i).machine,
            soft: data.rows.item(i).soft,
            infos: data.rows.item(i).infos,
            tarif: data.rows.item(i).tarif,
            model: data.rows.item(i).model,
            invoice: data.rows.item(i).invoice,
            period: data.rows.item(i).period,
            last: data.rows.item(i).last,
            next: data.rows.item(i).next,
          });
        }
      }
      this.customers.next(customers);
    });
  }

  addCustomer(customer) {
    return this.database.executeSql('INSERT INTO actives (name,firstname,cp,city,number,phone,office,last,period,next,other) VALUES("' + customer.name + '","' + customer.firstname + '","' + customer.cp + '","' + customer.city + '","' + customer.number + '","' + customer.phone + '","' + customer.office + '","' + customer.last + '","' + customer.period + '","' + customer.next + '","' + customer.other + '")', []).then(data => {
      this.loadCustomers();
    });
  }

  getCustomer(id): Promise<Customer> {
    return this.database.executeSql('SELECT * FROM actives WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        start: data.rows.item(0).start,
        type: data.rows.item(0).type,
        sex: data.rows.item(0).sex,
        name: data.rows.item(0).name,
        firstname: data.rows.item(0).firstname,
        adress: data.rows.item(0).adress,
        cp: data.rows.item(0).cp,
        city: data.rows.item(0).city,
        fixe: data.rows.item(0).fixe,
        phone: data.rows.item(0).phone,
        office: data.rows.item(0).office,
        fax: data.rows.item(0).fax,
        other: data.rows.item(0).other,
        resident: data.rows.item(0).resident,
        activity: data.rows.item(0).activity,
        origin: data.rows.item(0).origin,
        age: data.rows.item(0).age,
        water: data.rows.item(0).water,
        machine: data.rows.item(0).machine,
        soft: data.rows.item(0).soft,
        infos: data.rows.item(0).infos,
        tarif: data.rows.item(0).tarif,
        model: data.rows.item(0).model,
        invoice: data.rows.item(0).invoice,
        period: data.rows.item(0).period,
        last: data.rows.item(0).last,
        next: data.rows.item(0).next,
      }
    });
  }

  deleteCustomer(id) {
    return this.database.executeSql('DELETE FROM actives WHERE id = ?', [id]).then(_ => {
      this.loadCustomers();
    });
  }

  updateCustomer(customer: Customer) {
    let data = [customer.start, customer.type, customer.sex, customer.name, customer.firstname, customer.adress, customer.cp, customer.city, customer.fixe, customer.phone, customer.office, customer.fax, customer.other, customer.resident, customer.activity, customer.origin, customer.age, customer.water, customer.machine, customer.soft, customer.infos, customer.tarif, customer.model, customer.invoice, customer.last, customer.period, customer.next];
    return this.database.executeSql(`UPDATE actives SET start=?,type=?,sex=?,name=?,firstname=?,adress=?,cp=?,city=?,fixe=?,phone=?,office=?,fax=?,other=?,resident=?,activity=?,origin=?,age=?,water=?,machine=?,soft=?,infos=?,tarif=?,model=?,invoice=?,last=?,period=?,next=?  WHERE id = ${customer.id}`, data).then(data => {
      this.loadCustomers();
    })
  }
}