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
  //items: FirebaseListObservable<Item[]> = null;
  userId: string;
  Envio: any
  options: any = {
    removeOnSpill: true
  }
  Database1: any
  constructor(public dragSrv: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    dragSrv.setOptions('bag-task1', {
      copy: false,
      removeOnSpill: true
    })
    this.userId = sessionStorage.getItem('SetTokenuser')
    console.log(this.userId)
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getNoticias()
    setTimeout(() => {
      this.teste()
      this.enviar()
    }, 1500);


  }

  ngOnInit() {
  }
  getNoticias() {
    this.db.list('Fichas de Usuario', ref => ref.orderByKey()).valueChanges()
      .subscribe((s) => {
        this.Database1 = s

      })
  }

  teste() {
    console.log('OMEGA', this.Database1)


    var dados: any
    this.db.object('Fichas de Usuario').valueChanges()
      .subscribe((s) => {
        dados = s
        console.log('dados 1', dados)
      })
    var dados2: any
    this.db.list('Fichas de Usuario', ref => ref.orderByKey()).valueChanges()
      .subscribe((w) => {
        dados2 = w
        console.log('dados 2', dados2)
      })

  }
  enviar() {
    this.Envio.set({
      NomePlayer: 'Teste',
      NomeChar: 'Orion teste',
      Alcunha: 'Omega Max',
      IdadePlayer: '30',
      IdadeChar: '500',
      Clan: 'Algum ae',
      Reinos: 'Thyr Zak',
      userId: this.userId
    })
  }
}