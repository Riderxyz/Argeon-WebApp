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
  many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];
  many2: Array<string> = ['Explore', 'them'];
  Omegateste = [];

  Database1: any
  ImagePlayer: any
  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reinos: null }
  constructor(public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    dragulaService.setOptions('another-bag', {
      copy: true,
      removeOnSpill: false
    })



    this.userId = sessionStorage.getItem('SetTokenuser')
    this.ImagePlayer = sessionStorage.getItem('SetImageuser')
    console.log(this.userId)
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getNoticias()
    setTimeout(() => {
      this.teste()
      this.enviar()
    }, 1500);

  }


  ngOnInit() {
    this.dragulaService.drag.subscribe(value => {
      //console.log('inda existe', value[1].innerText)
      //console.log('Array inicial', this.many)
      // console.log('Array inicial2', this.many2)
      this.Omegateste.push(
        value[1].innerText
      )
      console.log(this.Omegateste)
    })
    this.dragulaService.drop.subscribe(value => {
      console.log('Não existe mais', value[1].innerText)
      console.log('Array inicial', this.many)
      console.log('Array inicial2', this.many2)
    })
  }
  getNoticias() {
    this.db.list('Fichas de Usuario', ref => ref.orderByKey()).valueChanges()
      .subscribe((s) => {
        this.Database1 = s

      })
  }
  teste() {
    var dados: any
    this.db.object('Fichas de Usuario/' + this.userId).snapshotChanges()
      .subscribe((s) => {
        dados = s
        console.log('dados 1', dados.payload.val())
      })
    var dados2: any
    this.db.list('Fichas de Usuario/').valueChanges()
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
      Img_Player: this.ImagePlayer,
      Img_Char: 'Asa',
      userId: this.userId
    })
  }
}
