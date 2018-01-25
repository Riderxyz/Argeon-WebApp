import { element } from 'protractor';
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
    removeOnSpill: false,
    copy: false
  }
  many: Array<string> = ['Okay'];
  many2: Array<string> = ['teste'];
  Omegateste = [];
  Grimorio: any
  Reinos: any
  Clans: any
  ImagePlayer: any
  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reino: null }
  constructor(public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    this.userId = sessionStorage.getItem('SetTokenuser')
    this.ImagePlayer = sessionStorage.getItem('SetImageuser')
    console.log(this.userId)
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getNoticias()
    setTimeout(() => {
      //this.teste()
      //this.enviar()
    }, 1500);


    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
 
  }
  ngOnInit() {
    this.dragulaService.drag.subscribe(value => {
      this.Omegateste.push(
        value[1].innerText
      )
      //console.log(this.Omegateste)
    })
    this.dragulaService.drop.subscribe(value => {
      console.log('Não existe mais', value[1].innerText)
      //console.log('Array inicial', this.many)
      //console.log('Array inicial2', this.many2)
    })
  }

  private onDrag(args) {
    let [e, el] = args;
    console.log('Drag',args)
  }
  
  private onDrop(args) {
    let [e, el] = args;
    console.log('Drop',args)
  }



  getNoticias() {
    this.db.list('Grimorio').valueChanges()
      .subscribe((s) => {
        this.Grimorio = s
        //console.log(this.Grimorio)
      })
    this.db.list('Reinos').valueChanges()
      .subscribe((s) => {
        this.Reinos = s
        //console.log(this.Reinos)
      })
    this.db.list('Clans').valueChanges()
      .subscribe((s) => {
        this.Clans = s
        //console.log(this.Clans)
      })
  }
  teste() {
    var dados: any
    this.db.object('Fichas de Usuario/' + this.userId).snapshotChanges()
      .subscribe((s) => {
        dados = s
        //console.log('dados 1', dados.payload.val())
      })
    var dados2: any
    this.db.list('Fichas de Usuario/').valueChanges()
      .subscribe((w) => {
        dados2 = w
        //console.log('dados 2', dados2)
      })

  }
  enviar() {
    console.log(this.FichasData)
    /*     this.Envio.set({
          NomePlayer: this.FichasData.NomePlayer,
          NomeChar: 'Orion teste',
          Alcunha: 'Omega Max',
          IdadePlayer: '30',
          IdadeChar: '500',
          Clan: 'Algum ae',
          Reinos: 'Thyr Zak',
          Img_Player: this.ImagePlayer,
          Img_Char: 'Asa',
          userId: this.userId,
          Magias:{Omega:'Inject', Omega2:'advice', Omega3:'in me'}
        }) */
  }
}
