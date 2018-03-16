import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataSrvService {
    ReinoKl: any
    constructor(public db: AngularFireDatabase) { }




    getData(banco) {
        this.db.list(banco).valueChanges().subscribe((dados) => {
            this.ReinoKl = dados
            //console.log(this.ReinoKl)

        })
        return this.ReinoKl
        /*   var IO = this.ReinoKl
          // console.log('oooooo', IO);
          return IO
   */
    }
}
