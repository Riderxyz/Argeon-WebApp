import { Component, OnInit } from '@angular/core';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbMenuItem, NbThemeService } from '@nebular/theme';
import { CacheServiceService } from './../../Service/cache-service.service';
import { RouterModule, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  DataBase1: any;
  DataBase2: any;
  classe: string;
  constructor(public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase) {
    this.getNoticias1()
    this.getNoticias2()
  }

  ngOnInit() {
  }

  ativar() {

    if (this.classe != null) {
      this.classe = null
    }
    else {
      this.classe = 'angrytext'
    }
  }

  getNoticias1() {
    this.db.list('Clans').valueChanges()
      .subscribe((s) => {
        this.DataBase1 = s
      })
  }
  getNoticias2() {
    this.db.list('Reinos').valueChanges()
      .subscribe((s) => {
        this.DataBase2 = s
      })
  }

}
