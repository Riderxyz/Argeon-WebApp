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
  userId: string;
  Envio: any
  options: any = {
    removeOnSpill: false,
    copy: false
  }
  options2: any = {
    removeOnSpill: true,
    copy: false
  }
  MagiaGrimorio: Array<string> = [];
  MagiaPlayer: Array<string> = [];
  Omegateste = [];
  Grimorio: any
  Reinos: any
  Clans: any
  ImagePlayer: any

  themeName = 'cosmic';
  settings: Array<any>;
  themeSubscription: any;

  FichasData = { NomePlayer: null, NomeChar: null, Alcunha: null, IdadePlayer: null, IdadeChar: null, Clan: null, Reino: null };

  constructor(private themeService: NbThemeService, public dragulaService: DragulaService, public router: Router, public cacheSrv: CacheServiceService, public db: AngularFireDatabase, ) {
    this.userId = sessionStorage.getItem('SetTokenuser')
    this.ImagePlayer = sessionStorage.getItem('SetImageuser')
    console.log(this.userId)
    this.Envio = db.object('Fichas de Usuario/' + this.userId);
    this.getDados();
    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.themeName = theme.name;
      this.init(theme.variables);
    });
    setTimeout(() => {
      //this.teste()
      //this.enviar()
    }, 1500);
 }
  ngOnInit() {
    this.dragulaService.drag.subscribe(value => {
      //console.log(this.Omegateste)
    })
    this.dragulaService.drop.subscribe(value => {
      console.log('Não existe mais', value[1].innerText)
      //console.log('Array inicial', this.MagiaGrimorio)
      console.log('Array Final2', this.MagiaPlayer)
    })
  }

  getDados() {
    this.db.list('Grimorio').valueChanges()
      .subscribe((s) => {
        this.Grimorio = s
        for (let i = 0; i < this.Grimorio.length; i++) {
          const magias = this.Grimorio[i].nome;
          console.log(magias)
          this.MagiaGrimorio.push(magias)
        }
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
 init(colors: any) {
  this.settings = [{
    class: 'btn-hero-danger',
    container: 'danger-container',
    NameButton: 'Cancelar',
    Salvar: false,
    cosmic: {
      gradientLeft: `adjust-hue(${colors.primary}, 20deg)`,
      gradientRight: colors.primary,
      bevel: `shade(${colors.primary}, 14%)`,
      shadow: 'rgba (6, 7, 64, 0.5)',
      glow: `adjust-hue(${colors.primary}, 10deg)`,
    },
  }, {
    class: 'btn-hero-success',
    container: 'success-container',
    NameButton: 'Salvar',
    Salvar: true,
    cosmic: {
      gradientLeft: `adjust-hue(${colors.warning}, 10deg)`,
      gradientRight: colors.warning,
      bevel: `shade(${colors.warning}, 14%)`,
      shadow: 'rgba (33, 7, 77, 0.5)',
      glow: `adjust-hue(${colors.warning}, 5deg)`,
    },
  }]
}

  enviar(item) {
    console.log(item.Salvar)
/*     this.Envio.set({
      NomePlayer: 'this.FichasData.NomePlayer',
      NomeChar: 'Orion teste',
      Alcunha: 'Omega Max',
      IdadePlayer: '30',
      IdadeChar: '500',
      Clan: 'Algum ae',
      Reinos: 'Thyr Zak',
      Img_Player: this.ImagePlayer,
      Img_Char: 'Asa',
      userId: this.userId,
      Magias: this.MagiaPlayer 
    })*/
  }
}
