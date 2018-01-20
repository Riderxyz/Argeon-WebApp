import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DragulaDirective } from 'ng2-dragula/components/dragula.directive';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/CacheSrv/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {
 options:any= {
   removeOnSpill:true
 }
 Database1:any
  constructor( public dragSrv:DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase,) { 
    dragSrv.setOptions('bag-task1', {
      copy:false,
      removeOnSpill:true
    })
this.getNoticias()
  }

  ngOnInit() {
  }

  getNoticias() {
    this.db.list('Grimorio').valueChanges()
      .subscribe((s) => {
        this.DataBase1 = s
      })
  }

}
