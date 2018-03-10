import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataSrvService {
    constructor(public db: AngularFireDatabase) { }




    getData(banco) {

        this.db.list(banco).valueChanges()
            .map((dados) => { console.log(dados) })
    }
}
